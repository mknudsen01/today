import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import TagList from './TagList';

class Activity extends Component {

  constructor(props) {
    super(props);

    this.deleteTag = this.deleteTag.bind(this);
    this.addTag = this.addTag.bind(this);
  }

  deleteTag(tag) {
    this.props.deleteTag(this.props.timestamp, tag);
  }

  addTag(tag) {
    this.props.addTag(this.props.timestamp, tag);
  }

  render() {
    const { timestamp, activity, deleteActivity, editActivity, isEditing, cancelEdit } = this.props;
    const { description, tags = [] } = activity;

    return (
      <div className="pb">
        <div className="row row--middle row--start">
          <div className="col--auto flex align-items--center">
            <div
              className="flex cursor--pointer"
              onClick={isEditing ?
                () => cancelEdit() :
                () => editActivity(timestamp)
              }
            >
              {description}
            </div>
            {
              isEditing && (
                <span
                  className="flex cursor--pointer font--12 ml p- color--blue"
                  onClick={() => cancelEdit()}
                >
                  cancel
                </span>
              )
            }
            {
              !isEditing && (
                <span
                  className="flex cursor--pointer font--12 ml p- color--blue"
                  onClick={() => editActivity(timestamp)}
                >
                  edit
                </span>
              )
            }
            <span
              className="flex cursor--pointer ml-- p- color-red"
              onClick={() => deleteActivity(timestamp)}
            >
              &times;
            </span>
          </div>
        </div>
        <TagList
          tags={tags}
          deleteTag={this.deleteTag}
          addTag={this.addTag}
        />
      </div>
    );
  }
}

Activity.propTypes = {
  timestamp: PropTypes.string.isRequired,
  activity: PropTypes.object.isRequired,
  deleteActivity: PropTypes.func.isRequired,
  editActivity: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
}

export default Activity;
