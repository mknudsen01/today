import React, { Component } from 'react';
import moment from 'moment';
// import CSSTransitionGroup from 'react-addons-css-transition-group';
import hashObject from 'hash-object';

import '../css/styles.css';

// import Activity from './Activity';
// import AddActivityForm from './AddActivityForm';
// import EditActivityForm from './EditActivityForm';
import Header from './Header';
import Footer from './Footer'
import Content from './Content'
import base from '../base';
import Login from './Login';
import Home from './Home';
import PrivateRoute from './PrivateRoute';
import PropRoute from './PropRoute';

import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'


import ApiService from '../ApiService';


class App extends Component {

  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.choosePreviousDay = this.choosePreviousDay.bind(this);
    this.chooseNextDay = this.chooseNextDay.bind(this);
    this.deleteActivity = this.deleteActivity.bind(this);
    this.addActivity = this.addActivity.bind(this);
    this.editActivity = this.editActivity.bind(this);
    this.updateActivity = this.updateActivity.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.createUser = this.createUser.bind(this);
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

  componentDidMount() {
    window.addEventListener('keypress', this.shortcutListeners.bind(this))
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
    if (hashObject(this.state.activitiesByTimestamp) !== hashObject(nextState.activitiesByTimestamp)) {
      this.setState({
        activityTimestamps: Object.keys(nextState.activitiesByTimestamp)
      })
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
    window.removeEventListener('keypress', this.shortcutListeners);
  }

  shortcutListeners(e) {
    if (e.key === 'n' && !!e.ctrlKey) { // Ctrl + n
      this.chooseNextDay();
    }
    if (e.key === 'p' && !!e.ctrlKey) { // Ctrl + p
      this.choosePreviousDay();
    }
    if (e.key === 't' && !!e.ctrlKey) { // Ctrl + t
      this.chooseDay(moment());
    }
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

  loginUser({username, password}) {
    const path = encodeURI(`/login?username=${username}&password=${password}`)
    ApiService.post(path)
      .then(res => console.log('res: ', res));
  }

  createUser({email, password}) {
    this.createUserWithPassword({email, password});
  }

  createUserWithPassword({email, password}) {
    base.createUser({email, password}, this.authHandler);
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

  chooseDay(dayMoment) {
    this.setState({
      currentDay: dayMoment.startOf('day')
    })
  }

  choosePreviousDay() {
    const { currentDay } = this.state;
    const isEarliestDay = +currentDay.startOf('day') === +moment().subtract(1, 'years').startOf('day');

    if (isEarliestDay) return;

    this.setState({
      currentDay: this.state.currentDay.subtract(1, 'day')
    })
  }

  chooseNextDay() {
    const { currentDay } = this.state;
    const isToday = +currentDay.startOf('day') === +moment().startOf('day');

    if (isToday) return;

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
    const { activitiesByTimestamp, currentDay } = this.state;

    const isToday = +currentDay.startOf('day') === +moment().startOf('day');
    const isYesterday = +currentDay.startOf('day') === +moment().subtract(1, 'days').startOf('day');
    const isEarliestDay = +currentDay.startOf('day') === +moment().subtract(1, 'years').startOf('day');

    const isLoggedIn = !!(this.state.user && this.state.user.id);

    return (
      <Router>
        <section className="holy-grail--container">
          <Header
            isLoggedIn={isLoggedIn}
            logout={this.logoutUser}
          />
          <Content>
            <Switch>
              <PropRoute
                path="/login"
                component={Login}
                loginUser={this.loginUser}
                createUser={this.createUser}
                isLoggedIn={isLoggedIn}
              />
              <PrivateRoute
                path="/dashboard"
                component={Home}
                isLoggedIn={isLoggedIn}
                activitiesByTimestamp={activitiesByTimestamp}
                currentDay={currentDay}
                isToday={isToday}
                isYesterday={isYesterday}
                isEarliestDay={isEarliestDay}
                choosePreviousDay={this.choosePreviousDay}
                chooseNextDay={this.chooseNextDay}
                addActivity={this.addActivity}
                activityTimestamps={this.state.activityTimestamps}
                editingActivityTimestamp={this.state.editingActivityTimestamp}
                deleteActivity={this.deleteActivity}
                editActivity={this.editActivity}
                cancelEdit={this.cancelEdit}
                deleteTag={this.deleteTag}
                addTag={this.addTag}
                updateActivity={this.updateActivity}
                currentDayTimestamps={this.getCurrentDayTimestamps()}

              />
            </Switch>
          </Content>
          <Footer />
        </section>
      </Router>
    );
  }
}

export default App;
