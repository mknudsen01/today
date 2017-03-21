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
    return (
      <form
        onSubmit={(e) => this.createActivity(e)}
        ref={(input) => this.activityForm = input}
        className="row row--middle stretch"
      >

        <input
          type="text"
          ref={(node) => this.description = node}
          placeholder="went to the park"
          className="pv- ph- col--9"
        />
        <div
          onClick={(e) => this.createActivity(e)}
          className="pv-- ph- bg--peter-river bg--belize-hole--hover text--white transition--3-10 pointer col--3 flex align-items--center justify-content--center"
        >
          Add activity
        </div>

      </form>
    );
  }
}

AddActivityForm.propTypes = {
  addActivity: PropTypes.func.isRequired,
};

export default AddActivityForm;
