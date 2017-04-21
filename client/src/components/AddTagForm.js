import React, { Component, PropTypes } from 'react';

class AddTagForm extends Component {

  constructor(props) {
    super(props);

    this.addTag = this.addTag.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  cancelEdit() {
    this.addTagForm.reset();
    this.props.cancelEdit();
  }

  addTag(e) {
    e.preventDefault();
    if (!this.tag.value) return
    this.props.addTag(this.tag.value);
  }

  escapeListener(e) {
    if (e.keyCode === 27) {
      this.cancelEdit();
    }
  }

  componentDidMount() {
    this.tag.addEventListener('keydown', this.escapeListener.bind(this))
  }

  componentWillUnmount() {
    this.tag.removeEventListener('keydown', this.escapeListener);
  }

  render() {
    return (
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
            className="pv-- ph- bg--peter-river bg--belize-hole--hover text--white transition--5-10 pointer"
          >
            Add
          </div>
        </div>
        <div className="col">
          <div
            onClick={this.cancelEdit}
            className="pv-- ph- bg--alizarin bg--pomegranate--hover text--white transition--5-10 pointer"
          >
            Cancel
          </div>
        </div>
      </form>
    );
  }
}

AddTagForm.propTypes = {
  cancelEdit: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
}

export default AddTagForm;
