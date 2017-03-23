import React, { Component, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import Tag from './Tag';
import AddTagForm from './AddTagForm';

class TagList extends Component {

  constructor(props) {
    super(props);

    this.addTag = this.addTag.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.toggleIsAdding = this.toggleIsAdding.bind(this);

    this.state = {
      isAdding: false,
    }
  }

  toggleIsAdding(value) {
    this.setState({
      isAdding: value,
    });
  }

  addTag(value) {
    // e.preventDefault();

    this.props.addTag(value);

    this.toggleIsAdding(false);

  }

  cancelEdit() {
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
              <AddTagForm
                addTag={this.addTag}
                cancelEdit={this.cancelEdit}
              />
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
