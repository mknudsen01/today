import React, { Component } from 'react';
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
  };

  renderActivity(timestamp,activity) {
    return (
      <div key={timestamp} className="row">
        <p>{timestamp}</p>
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

  render() {
    const { activitiesByTimestamp } = this.state;
    return (
      <div className="container">
        <div className="row row--center">
          <div className="col">
            Today daily tracker
          </div>
        </div>
        <div className="row row--center">
          <div className="col--3">
            <button onClick={this.loadSampleActivities}>Load sample activities</button>
          </div>
        </div>
        {
          Object
            .keys(activitiesByTimestamp)
            .map(timestamp => this.renderActivity(timestamp, activitiesByTimestamp[timestamp]))
        }
      </div>
    );
  }
}

export default App;
