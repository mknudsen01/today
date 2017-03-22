import React, { Component, PropTypes } from 'react';

import classnames from 'classnames';

class Tag extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHover: false,
    }
  }

  toggleIsHover(value) {
    this.setState({
      isHover: value,
    })
  }

  render() {
    const { value, deleteTag } = this.props;

    const deleteClx = classnames({
      'ph-- transition--1-10': true,
      'text--amethyst': !this.state.isHover,
      'text--white': this.state.isHover,
    })
    return (
      <div className="col">
        <div
          className="bg--amethyst bg--wisteria--hover pv-- pl- pr-- text--white font--10 bo-rad--3 pointer transition--3-10"
          onClick={deleteTag}
          onMouseOver={() => this.toggleIsHover(true)}
          onMouseLeave={() => this.toggleIsHover(false)}
        >
          {value}
          <span
            className={deleteClx}
          >
            &times;
          </span>
        </div>
      </div>
    );
  }
}

Tag.propTypes = {
  value: PropTypes.string.isRequired,
  deleteTag: PropTypes.func.isRequired,
}

export default Tag;
