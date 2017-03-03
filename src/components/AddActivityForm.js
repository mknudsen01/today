import React, { Component, PropTypes } from 'react';

class AddActivityForm extends Component {

  createActivity(e) {
    e.preventDefault();
    const activity = {
       description: this.description.value,
    }

    this.props.addActivity(activity);
    this.activityForm.reset();
  }

  render() {
    const { addActivity } = this.props;

    return (
      <form
        onSubmit={(e) => this.createActivity(e)}
        ref={(input) => this.activityForm = input}
      >
        <input type="text" ref={(node) => this.description = node} placeholder="went to the park" />
        <button type="submit">Add activity</button>
      </form>
    );
  }
}

AddActivityForm.propTypes = {
  addActivity: PropTypes.func.isRequired,
};

export default AddActivityForm;
