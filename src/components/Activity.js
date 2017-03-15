import React, { Component, PropTypes } from 'react';
import moment from 'moment';

class Activity extends Component {

  render() {
    const { timestamp, activity, deleteActivity, editActivity } = this.props;

    return (
      <div className="row row--middle row--start">
        <div className="col flex align-items--center">
          <div className="flex">
            {activity.description}
          </div>
          <span
            className="flex cursor--pointer font--12 ml p- color--blue"
            onClick={() => editActivity(timestamp)}
          >
            edit
          </span>
          <span
            className="flex cursor--pointer ml-- p- color-red"
            onClick={() => deleteActivity(timestamp)}
          >
            &times;
          </span>
        </div>
      </div>
    );
  }
}

Activity.propTypes = {
  timestamp: PropTypes.string.isRequired,
  activity: PropTypes.object.isRequired,
  deleteActivity: PropTypes.func.isRequired,
  editActivity: PropTypes.func.isRequired,
}

export default Activity;
