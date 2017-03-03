import React, { Component, PropTypes } from 'react';
import moment from 'moment';

class Activity extends Component {

  render() {
    const { timestamp, activity, deleteActivity } = this.props;

    return (
      <div className="row row--middle">
        <div className="col--2">
          <p>{moment(+timestamp).format('MMMM DD, YYYY')}</p>
        </div>
        <div className="col--4">
          <span>{activity.description}</span>
          <span className="pl" onClick={() => deleteActivity(timestamp)}>Delete</span>
        </div>
      </div>
    );
  }
}

Activity.propTypes = {
  timestamp: PropTypes.string.isRequired,
  activity: PropTypes.object.isRequired,
  deleteActivity: PropTypes.func.isRequired,
}

export default Activity;
