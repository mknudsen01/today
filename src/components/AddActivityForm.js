import React, { Component, PropTypes } from 'react';

import { getDescriptionAndTags } from '../helpers';

class AddActivityForm extends Component {

  componentDidMount() {
    this.description.addEventListener('keydown', this.escapeListener.bind(this));
  }

  componentWillUnmount() {
    this.description.removeEventListener('keydown', this.escapeListener)
  }

  escapeListener(e) {
    if (e.keyCode === 27) {
      this.description.blur();
    }
  }

  createActivity(e) {
    e.preventDefault();
    const { description, tags } = getDescriptionAndTags(this.description.value);

    const activity = {
       description,
       tags,
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
          autoFocus
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
