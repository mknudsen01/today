import React, { Component, PropTypes } from 'react';

import TagList from './TagList';
import Row from './layout/Row';
import Column from './layout/Column';

class Activity extends Component {

  render() {
    const { timestamp, activity, editActivity, isEditing, cancelEdit } = this.props;
    const { description, tags = [] } = activity;

    return (
      <div>
        <Row middle start>
          <Column
            span={12}
            className="cursor--pointer p- bg--clouds"
            onClick={isEditing ?
              () => cancelEdit() :
              () => editActivity(timestamp)
            }
          >
            {description}
          </Column>
        </Row>
        <TagList
          tags={tags}
        />
      </div>
    );
  }
}

Activity.propTypes = {
  timestamp: PropTypes.string.isRequired,
  activity: PropTypes.object.isRequired,
  editActivity: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  cancelEdit: PropTypes.func.isRequired,
}

export default Activity;
