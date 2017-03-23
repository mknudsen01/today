import React, { Component } from 'react';
import moment from 'moment';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import hash from 'object-hash';

import '../css/styles.css';

import Activity from './Activity';
import AddActivityForm from './AddActivityForm';
import EditActivityForm from './EditActivityForm';
import Header from './Header';
import Footer from './Footer'
import Content from './Content'
import base from '../base';


class App extends Component {

  constructor(props) {
    super(props);

    this.choosePreviousDay = this.choosePreviousDay.bind(this);
    this.chooseNextDay = this.chooseNextDay.bind(this);
    this.deleteActivity = this.deleteActivity.bind(this);
    this.addActivity = this.addActivity.bind(this);
    this.editActivity = this.editActivity.bind(this);
    this.updateActivity = this.updateActivity.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.addTag = this.addTag.bind(this);
  }

  state = {
    activitiesByTimestamp: {},
    activityTimestamps: [],
    currentDay: moment().startOf('day'),
    editingActivityTimestamp: null,
    uid: null,
  };

  connectDatabase(uid) {
    if (!uid) { return; }
    this.ref = base.syncState(`${uid}/activitiesByTimestamp`, {
      context: this,
      state: 'activitiesByTimestamp',
    });

    this.setState({
      activityTimestamps: Object.keys(this.state.activitiesByTimestamp)
    })
  }

  logout() {
    base.unauth();
    if (this.ref) {
      base.removeBinding(this.ref);
    }

    localStorage.setItem('user', null);

    this.setState({
      uid: null,
      activitiesByTimestamp: {},
      activityTimestamps: [],
    });


  }

  componentWillMount() {
    const localStorageUser = JSON.parse(localStorage.getItem('user')) || {};

    const expiration = localStorageUser.expiration;

    if (!expiration || +moment() > +expiration) {
      this.logout();
      return;
    }

    if (localStorageUser.uid) {
      this.connectDatabase(localStorageUser.uid);
      this.setState({
        uid: localStorageUser.uid,
        email: localStorageUser.email,
      })
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (hash(this.state.activitiesByTimestamp) !== hash(nextState.activitiesByTimestamp)) {
      this.setState({
        activityTimestamps: Object.keys(nextState.activitiesByTimestamp)
      })
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  authHandler(err, authData) {
    console.log('authData: ', authData);
    if (err) {
      console.log('err: ', err);
      return;
    }

    this.setState({
      uid: authData.uid,
    });

    localStorage.setItem('user', JSON.stringify({
      uid: authData.uid,
      email: authData.email,
      expiration: +moment().add(1, 'day'),
    }));

    this.connectDatabase(authData.uid);
  }

  authenticateWithPassword({email, password}) {
    base.authWithPassword({email, password}, this.authHandler)
  }

  loginUser(e) {
    e.preventDefault();
    const email = this.loginEmail.value;
    const password = this.loginPassword.value;

    this.authenticateWithPassword({email, password});
  }

  createUser(e) {
    e.preventDefault();
    const email = this.createUserEmail.value;
    const password = this.createUserPassword.value;

    this.createUserWithPassword({email, password});
    this.createUserForm.reset();
  }

  createUserWithPassword({email, password}) {
    base.createUser({email, password}, this.authHandler);
  }

  renderActivity(timestamp,activity) {
    const { editingActivityTimestamp } = this.state;
    const activityElement = (
      <Activity
        key={`activity-display-${timestamp}`}
        timestamp={timestamp}
        activity={activity}
        deleteActivity={this.deleteActivity}
        editActivity={this.editActivity}
        isEditing={editingActivityTimestamp === timestamp}
        cancelEdit={this.cancelEdit}
        deleteTag={this.deleteTag}
        addTag={this.addTag}
      />
    );

    return (
      <div key={`activity-${timestamp}`}>
        <CSSTransitionGroup
          component="div"
          transitionName="activity-edit-form"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {activityElement}
          {
            editingActivityTimestamp === timestamp && (
              <EditActivityForm
                key={`edit-activity-${timestamp}`}
                activity={activity}
                timestamp={timestamp}
                cancelEdit={this.cancelEdit}
                updateActivity={this.updateActivity}
              />
            )
          }

        </CSSTransitionGroup>
      </div>
    )
  }

  getUnusedTimestamp() {
    const currentDayTimestamps = this.getCurrentDayTimestamps();
    const latestTimestamp = +currentDayTimestamps.slice(-1) || +this.state.currentDay.startOf('day');
    return `${latestTimestamp + 1}`;
  }

  addActivity(activity) {
    const timestamp = this.getUnusedTimestamp();

    const activityWithTimestamp = {...activity, timestamp}
    this.setState({
      activitiesByTimestamp: {
        ...this.state.activitiesByTimestamp,
        [timestamp]: activityWithTimestamp,
      },
      activityTimestamps: [...this.state.activityTimestamps, timestamp]
    })
  }

  deleteTag(timestamp, tagToDelete) {
    const activitiesByTimestamp = {...this.state.activitiesByTimestamp};
    const activityToEdit = Object.assign({}, activitiesByTimestamp[timestamp]);

    activityToEdit.tags = activityToEdit.tags.filter(tag => tag !== tagToDelete);

    this.setState({
      activitiesByTimestamp: {
        ...activitiesByTimestamp,
        [timestamp]: activityToEdit,
      }
    })
  }

  addTag(timestamp, tagToAdd) {
    const activitiesByTimestamp = {...this.state.activitiesByTimestamp};
    const activityToEdit = Object.assign({}, activitiesByTimestamp[timestamp]);

    const trimmedTag = tagToAdd.trim();

    if (!activityToEdit.tags) {
      activityToEdit.tags = [trimmedTag];
    } else if (!activityToEdit.tags.includes(trimmedTag)) {
      activityToEdit.tags.push(trimmedTag);
    }

    this.setState({
      activitiesByTimestamp: {
        ...activitiesByTimestamp,
        [timestamp]: activityToEdit,
      }
    })
  }

  updateActivity(activity) {
    const { timestamp } = activity;
    this.setState({
      activitiesByTimestamp: {
        ...this.state.activitiesByTimestamp,
        [timestamp]: activity,
      },
    })
  }

  cancelEdit() {
    this.setState({
      editingActivityTimestamp: null,
    })
  }

  deleteActivity(timestamp) {
    const activitiesByTimestamp = {...this.state.activitiesByTimestamp};
    activitiesByTimestamp[timestamp] = null;

    this.setState({
      activitiesByTimestamp,
      activityTimestamps: this.state.activityTimestamps.filter(stamp => timestamp !== stamp)
    })
  }

  editActivity(timestamp) {
    this.setState({
      editingActivityTimestamp: timestamp
    })
  }

  choosePreviousDay() {
    this.setState({
      currentDay: this.state.currentDay.subtract(1, 'day')
    })
  }

  chooseNextDay() {
    this.setState({
      currentDay: this.state.currentDay.add(1, 'day')
    })
  }

  getCurrentDayTimestamps() {
    const { currentDay, activityTimestamps, activitiesByTimestamp } = this.state;
    const start = +currentDay.startOf('day');
    const end = +currentDay.endOf('day');

    const stamps = activityTimestamps.length ?
      activityTimestamps :
      Object.keys(activitiesByTimestamp) || [];

    return stamps
      .filter( timestamp => start <= +timestamp && timestamp <= end)
  }

  render() {
    const { activitiesByTimestamp, currentDay, uid } = this.state;

    if (!uid) {
      return (
        <section className="holy-grail--container">
          <Header
            isLoggedIn={!!uid}
            logout={this.logout}
          />
          <Content>
            <div className="container--full">
              <div className="container">
                <div className="row row--center">
                  <form
                    onSubmit={(e) => this.createUser(e)}
                    ref={(node) => this.createUserForm = node}
                  >
                    <input
                      type="email"
                      required
                      ref={(node) => this.createUserEmail = node}
                      placeholder="email"
                      className="pv- ph-"
                    />
                    <input
                      type="password"
                      required
                      ref={(node) => this.createUserPassword = node}
                      placeholder="password"
                      className="pv- ph-"
                    />
                    <button type="submit">Create User</button>
                  </form>
                </div>
                <div className="row row--center mt+">
                  <form
                    onSubmit={(e) => this.loginUser(e)}
                    ref={(node) => this.loginForm = node}
                  >
                    <input
                      type="email"
                      required
                      ref={(node) => this.loginEmail = node}
                      placeholder="email"
                      className="pv- ph-"
                    />
                    <input
                      type="password"
                      required
                      ref={(node) => this.loginPassword = node}
                      placeholder="password"
                      className="pv- ph-"
                    />
                    <button type="submit">Log in</button>
                  </form>
                </div>
              </div>
            </div>
          </Content>
          <Footer />
        </section>
      )
    }

    return (
      <section className="holy-grail--container">
        <Header
          isLoggedIn={!!uid}
          logout={this.logout}
        />
        <Content>
          <div className="container--full bg--wet-asphalt">
            <div className="container">
              <div className="row row--center">
                <div className="col--6">
                  <div className="bg--clouds mt++ overflow-x--hidden box-shadow--5">
                    <div className="row mt+ pv">
                      <div
                        className="col--4"
                        onClick={this.choosePreviousDay}
                      >
                        <a className="underline pointer">Previous day</a>
                      </div>
                      <div className="col--4">
                        {currentDay.format('MMMM DD, YYYY')}
                      </div>
                      <div
                        className="col--4"
                        onClick={this.chooseNextDay}
                      >
                        <a className="underline pointer">Next day</a>
                      </div>
                    </div>
                    <div className="row row--center pv ph++">
                      <div className="col--12">
                        <AddActivityForm
                          addActivity={this.addActivity}
                        />
                      </div>
                    </div>
                    <div className="pt pb++ ph++">
                      {
                        <CSSTransitionGroup
                          component="div"
                          transitionName="activity"
                          transitionEnterTimeout={500}
                          transitionLeaveTimeout={500}
                        >
                          {
                            this.getCurrentDayTimestamps()
                              .sort()
                              .reverse()
                              .map(timestamp => this.renderActivity(timestamp, activitiesByTimestamp[timestamp]))
                          }
                        </CSSTransitionGroup>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>
        <Footer />
      </section>
    );
  }
}

export default App;
