import React, { Component, PropTypes } from 'react';

import Tag from './Tag';

class TagList extends Component {
  render() {
    const { tags = [] } = this.props;

    return (
      <div className="row row--baseline ph-">
      {
        tags.map(tag => {
          return (
            <Tag
              key={tag}
              value={tag}
            />
          )
        })
      }
      </div>
    );
  }
}

TagList.propTypes = {
  tags: PropTypes.array,
}

export default TagList;
