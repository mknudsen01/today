import React, { Component, PropTypes } from 'react';

class Tag extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { value } = this.props;

    return (
      <div className="flex mr-">
        <div
          className="bg--amethyst bg--wisteria--hover pv-- ph- mb- text--white font--10 bo-rad--3 pointer transition--3-10"
        >
          {value}
        </div>
      </div>
    );
  }
}

Tag.propTypes = {
  value: PropTypes.string.isRequired,
}

export default Tag;
