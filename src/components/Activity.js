import React, { Component, PropTypes } from 'react';
import moment from 'moment';

class Activity extends Component {

  render() {
    const { timestamp, activity, deleteActivity } = this.props;

    return (
      <div className="row row--middle">
        <div className="col--4">
          <p>
            {activity.description}
            <span className="pl" onClick={() => deleteActivity(timestamp)}>Delete</span>
          </p>
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
