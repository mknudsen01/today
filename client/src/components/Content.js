import React, { Component, PropTypes } from 'react';

class Content extends Component {

  render() {
    return (
      <div className="holy-grail--content">
        {this.props.children}
      </div>
    );
  }
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Content;
