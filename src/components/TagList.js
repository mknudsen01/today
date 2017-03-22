import React, { Component, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import Tag from './Tag';

class TagList extends Component {

  render() {
    return (
      <CSSTransitionGroup
        component="div"
        className="row row--middle"
        transitionName="tags"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {
          this.props.tags.map(tag => {
            return (
              <Tag
                key={tag}
                value={tag}
                deleteTag={() => this.props.deleteTag(tag)}
              />
            )
          })
        }
      </CSSTransitionGroup>
    );
  }
}

export default TagList;
