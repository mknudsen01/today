import React, { Component } from 'react';
import moment from 'moment';

import '../css/styles.css';

import sampleActivities from '../sampleActivities';

class App extends Component {

  constructor(props) {
    super(props);

    this.loadSampleActivities = this.loadSampleActivities.bind(this);
    this.choosePreviousDay = this.choosePreviousDay.bind(this);
    this.chooseNextDay = this.chooseNextDay.bind(this);
  }

  state = {
    activitiesByTimestamp: {},
    activityTimestamps: [],
    currentDay: moment().startOf('day')
  };

  renderActivity(timestamp,activity) {
    return (
      <div key={timestamp} className="row">
        <p>{moment(+timestamp).format('MMMM DD, YYYY')}</p>
        <p>{activity.description}</p>
      </div>
    )
  }

  loadSampleActivities() {
    this.setState({
      activityTimestamps: Object.keys(sampleActivities),
      activitiesByTimestamp: sampleActivities,
    })
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

  createActivity(e) {
    e.preventDefault();
    const activity = {
       description: this.description.value,
    }

    this.addActivity(activity);
    this.activityForm.reset();
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
      <div className="container">
        <div className="row row--center">
          <div className="col">
            Today daily tracker
          </div>
        </div>
        <div className="row row--center">
          <div
            className="col--2"
            onClick={this.choosePreviousDay}
          >
            <span className="underline pointer">Previous day</span>
          </div>
          <div className="col--2">
            {currentDay.format('MMMM DD, YYYY')}
          </div>
          <div
            className="col--2"
            onClick={this.chooseNextDay}
          >
            <span className="underline pointer">Next day</span>
          </div>
        </div>
        <div className="row row--center">
          <form
            onSubmit={(e) => this.createActivity(e)}
            ref={(input) => this.activityForm = input}
          >
            <input type="text" ref={(node) => this.description = node} placeholder="went to the park" />
            <button type="submit">Add activity</button>
          </form>
        </div>
        <div className="row row--center">
          <div className="col--3">
            <button onClick={this.loadSampleActivities}>Load sample activities</button>
          </div>
        </div>
        {
          this.getCurrentDayTimestamps()
            .sort()
            .reverse()
            .map(timestamp => this.renderActivity(timestamp, activitiesByTimestamp[timestamp]))
        }
      </div>
    );
  }
}

export default App;