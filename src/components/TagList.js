import React, { Component, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import Tag from './Tag';

class TagList extends Component {

  constructor(props) {
    super(props);

    this.addTag = this.addTag.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);

    this.state = {
      isAdding: false,
    }
  }

  toggleIsAdding(value) {
    this.setState({
      isAdding: value,
    });
  }

  addTag(e) {
    e.preventDefault();

    this.props.addTag(this.tag.value);

    this.toggleIsAdding(false);

  }

  cancelEdit() {
    this.addTagForm.reset();
    this.toggleIsAdding(false);
  }

  render() {
    return (
      <CSSTransitionGroup
        component="div"
        className="row row--baseline"
        transitionName="tags"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        {
          this.state.isAdding && (
            <div key={'add-tag-form'} className="col--12 pv--">
              <form onSubmit={this.addTag} ref={(node) => this.addTagForm = node} className="row row--middle font--12">
                <div className="col--8">
                  <input
                    type="text"
                    ref={(node) => this.tag = node }
                    placeholder="exercise"
                    className="pv-- ph- flex col--11"
                    autoFocus
                  />
                </div>
                <div className="col">
                  <div
                    onClick={(e) => this.addTag(e)}
                    className="pv-- ph- bg--peter-river bg--belize-hole--hover text--white transition--3-10 pointer flex align-items--center justify-content--center"
                  >
                    Add
                  </div>
                </div>
                <div className="col">
                  <div
                    onClick={this.cancelEdit}
                    className="pv-- ph- bg--alizarin bg--pomegranate--hover text--white transition--3-10 pointer flex align-items--center justify-content--center"
                  >
                    Cancel
                  </div>
                </div>

              </form>
            </div>
          )
        }
        {
          !this.state.isAdding && (
            this.props.tags.map((tag, idx) => {
              return (
                <Tag
                  key={tag}
                  value={tag}
                  deleteTag={() => this.props.deleteTag(tag)}
                />
              )
            })
          )
        }
        {
          !this.state.isAdding && (
            <span
              key='add-tag'
              onClick={() => this.toggleIsAdding(true)}
              className={'col pointer font--12'}
            >
              + add tag
            </span>
          )
        }
      </CSSTransitionGroup>
    );
  }
}

export default TagList;
