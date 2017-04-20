import React, { Component, PropTypes } from 'react';
import { getDescriptionAndTags, buildDescriptionAndTags } from '../helpers';

import Row from './layout/Row';
import Column from './layout/Column';

class EditActivityForm extends Component {
  componentDidMount() {
    this.description.focus();
  }

  updateActivity(e) {
    e.preventDefault();

    const { description, tags } = getDescriptionAndTags(this.description.value);

    const activity = {
       description,
       tags,
       timestamp: this.props.timestamp,
    }

    this.props.updateActivity(activity);
    this.props.cancelEdit();
  }

  render() {
    const { activity } = this.props;
    const { description, tags } = activity;

    return (
      <form
        onSubmit={(e) => this.updateActivity(e)}
        ref={(input) => this.activityForm = input}
      >
        <Row className="ph-">
          <input
            type="text"
            className="flex flex-grow--1 p-"
            ref={(node) => this.description = node}
            defaultValue={buildDescriptionAndTags(description, tags)}
            placeholder="went to the park"
          />
        </Row>
        <Row middle>
          <Column span={4} center className="pv-">
            <div onClick={this.updateActivity}>save</div>
          </Column>
          <Column span={4} center className="pv-">
            <div onClick={this.props.cancelEdit}>cancel</div>
          </Column>
          <Column span={4} center className="pv-">
            <div onClick={() => this.props.deleteActivity(activity.timestamp)}>delete</div>
          </Column>
        </Row>
      </form>
    );
  }
}

EditActivityForm.propTypes = {
  updateActivity: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  deleteActivity: PropTypes.func.isRequired,
  activity: PropTypes.object.isRequired,
};

export default EditActivityForm;
