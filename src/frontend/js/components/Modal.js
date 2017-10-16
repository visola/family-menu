import PropTypes from 'prop-types';
import React from 'react';

class Modal extends React.Component {
  render() {
    const display = this.props.visible === true ? 'block' : 'none';
    return <div className="modal" style={{ display }} >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{this.props.title}</h5>
            <button
                type="button"
                onClick={this.props.onClose}
                className="close"
                data-dismiss="modal"
                aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {this.props.children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={this.props.onAccept}>
              {this.props.primaryActionText || 'Save'}
            </button>
            <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.props.onCancel}>
              {this.props.cancelActionText || 'Cancel'}
            </button>
          </div>
        </div>
      </div>
    </div>;
  }
}

Modal.propTypes = {
  cancelActionText: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  primaryActionText: PropTypes.string,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Modal;
