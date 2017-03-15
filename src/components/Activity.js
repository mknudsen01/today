import React, { Component, PropTypes } from 'react';
import moment from 'moment';

class Activity extends Component {

  render() {
    const { timestamp, activity, deleteActivity } = this.props;

    return (
      <div className="row row--middle">
        <div className="col--4 col--start">
          <div className="pv-">
            {activity.description}
            <span
              className="cursor--pointer ml p- color-red--hover"
              onClick={() => deleteActivity(timestamp)}
            >
              &times;
            </span>
          </div>
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
