import React, { Component } from 'react';
import moment from 'moment';

import './css/styles.css';

import sampleActivities from './sampleActivities';

class App extends Component {

  constructor(props) {
    super(props);

    this.loadSampleActivities = this.loadSampleActivities.bind(this);
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
        <p>{activity.text}</p>
      </div>
    )
  }

  loadSampleActivities() {
    this.setState({
      activityTimestamps: Object.keys(sampleActivities),
      activitiesByTimestamp: sampleActivities,
    })
  }

  addActivity(text) {
    const now = moment().format('x');
    this.setState({
      activitiesByTimestamp: {
        ...this.state.activitiesByTimestamp,
        [now]: { text },
      },
      activityTimestamps: [...this.state.activityTimestamps, now]
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
      <div className="container">
        <div className="row row--center">
          <div className="col">
            Today daily tracker
          </div>
        </div>
        <div className="row row--center">
          current day: {currentDay.format('MMMM DD, YYYY')}
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
