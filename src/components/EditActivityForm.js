import React, { Component, PropTypes } from 'react';
import { getDescriptionAndTags, buildDescriptionAndTags } from '../helpers';

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
      <div className="row row--middle row--start">
        <form
          className="col--12"
          onSubmit={(e) => this.updateActivity(e)}
          ref={(input) => this.activityForm = input}
        >
          <div className="row row--middle">
            <div className="col--6">
              <input
                type="text"
                className="w--100 pv- ph-"
                ref={(node) => this.description = node}
                defaultValue={buildDescriptionAndTags(description, tags)}
                placeholder="went to the park"
              />
            </div>
            <div className="col--2">
              <button type="submit">Update</button>
            </div>
            <div className="col--2">
              <div onClick={this.props.cancelEdit}>cancel</div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

EditActivityForm.propTypes = {
  updateActivity: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  activity: PropTypes.object.isRequired,
};

export default EditActivityForm;
