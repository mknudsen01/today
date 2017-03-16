import React, { Component } from 'react';
import moment from 'moment';

import '../css/styles.css';

import Activity from './Activity';
import AddActivityForm from './AddActivityForm';
import EditActivityForm from './EditActivityForm';
import Header from './Header';
import Footer from './Footer'
import Content from './Content'

import CSSTransitionGroup from 'react-addons-css-transition-group';

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
  }

  state = {
    activitiesByTimestamp: {},
    activityTimestamps: [],
    currentDay: moment().startOf('day'),
    editingActivityTimestamp: null,
  };

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
    this.setState({
      activitiesByTimestamp: {
        ...this.state.activitiesByTimestamp,
        [timestamp]: activity,
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
    const { currentDay, activityTimestamps } = this.state;
    const start = +currentDay.startOf('day');
    const end = +currentDay.endOf('day');

    return activityTimestamps
      .filter( timestamp => start <= +timestamp && timestamp <= end)
  }

  render() {
    const { activitiesByTimestamp, currentDay } = this.state;
    return (
      <section className="holy-grail--container">
        <Header />
        <Content>
          <div className="container--full">
            <div className="container">
              <div className="row row--center">
                <div className="col--6">
                  <div className="row pv">
                    <div
                      className="col--4"
                      onClick={this.choosePreviousDay}
                    >
                      <span className="underline pointer">Previous day</span>
                    </div>
                    <div className="col--4">
                      {currentDay.format('MMMM DD, YYYY')}
                    </div>
                    <div
                      className="col--4"
                      onClick={this.chooseNextDay}
                    >
                      <span className="underline pointer">Next day</span>
                    </div>
                  </div>
                  <div className="row row--center pv">
                    <AddActivityForm
                      addActivity={this.addActivity}
                    />
                  </div>
                  <div className="mt">
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
        </Content>
        <Footer />
      </section>
    );
  }
}

export default App;
