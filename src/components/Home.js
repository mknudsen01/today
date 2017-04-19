import React, { Component, PropTypes } from 'react';

import CSSTransitionGroup from 'react-addons-css-transition-group';

import Activity from './Activity';
import AddActivityForm from './AddActivityForm';
import EditActivityForm from './EditActivityForm';

import Row from './layout/Row';
import Column from './layout/Column';

class Home extends Component {

  renderActivity(timestamp,activity) {
    const { editingActivityTimestamp } = this.props;
    const activityElement = (
      <Activity
        key={`activity-display-${timestamp}`}
        timestamp={timestamp}
        activity={activity}
        deleteActivity={this.props.deleteActivity}
        editActivity={this.props.editActivity}
        isEditing={editingActivityTimestamp === timestamp}
        cancelEdit={this.props.cancelEdit}
        deleteTag={this.props.deleteTag}
        addTag={this.props.addTag}
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
                cancelEdit={this.props.cancelEdit}
                updateActivity={this.props.updateActivity}
              />
            )
          }

        </CSSTransitionGroup>
      </div>
    )
  }

  render() {

    const {
      activitiesByTimestamp,
      currentDay,
      isToday,
      isYesterday,
      isEarliestDay,
      choosePreviousDay,
      chooseNextDay,
      addActivity,
      currentDayTimestamps,
    } = this.props;

    return (

      <div className="container--full bg--wet-asphalt">
        <div className="container">
          <Row center className="mt+">
            <Column className="bg--clouds overflow-x--hidden box-shadow--5">
              <Row className="mt+ p">
                <Column
                  span={4}
                  onClick={isEarliestDay ? null: choosePreviousDay}
                >
                  <a className={`transition--3-10 ${isEarliestDay ? 'text--silver' : 'underline pointer'}`}>{isToday ? 'Yesterday' : 'Previous day'}</a>
                </Column>
                <Column
                  center
                >
                  {isToday ? 'Today' : isYesterday ? 'Yesterday' : currentDay.format('MMMM DD, YYYY')}
                </Column>
                <Column
                  right
                  onClick={isToday ? null : chooseNextDay}
                >
                  <a className={`transition--3-10 ${isToday ? 'text--silver' : 'underline pointer'}`}>{isYesterday ? 'Today' : 'Next day'}</a>
                </Column>
              </Row>
              <Row center className="pv">
                <Column span={11}>
                  <AddActivityForm
                    addActivity={addActivity}
                  />
                </Column>
              </Row>
              <div className="pt pb++ ph++">
                {
                  <CSSTransitionGroup
                    component="div"
                    transitionName="activity"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                  >
                    {
                      currentDayTimestamps
                        .sort()
                        .reverse()
                        .map(timestamp => this.renderActivity(timestamp, activitiesByTimestamp[timestamp]))
                    }
                  </CSSTransitionGroup>
                }
              </div>
            </Column>
          </Row>
        </div>
      </div>
    );
  }
}


Home.propTypes = {
  activitiesByTimestamp: PropTypes.object.isRequired,
  currentDay: PropTypes.object.isRequired,
  isToday: PropTypes.bool.isRequired,
  isYesterday: PropTypes.bool.isRequired,
  isEarliestDay: PropTypes.bool.isRequired,
  choosePreviousDay: PropTypes.func.isRequired,
  chooseNextDay: PropTypes.func.isRequired,
  addActivity: PropTypes.func.isRequired,
  activityTimestamps: PropTypes.array.isRequired,
  editingActivityTimestamp: PropTypes.func,
  deleteActivity: PropTypes.func.isRequired,
  editActivity: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired,
  currentDayTimestamps: PropTypes.array.isRequired,
}

export default Home;
