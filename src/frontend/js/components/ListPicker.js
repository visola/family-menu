import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import PropTypes from 'prop-types';
import React from 'react';

import { Checkmark, Close } from 'react-bytesize-icons';

const ICON_SIZE=16;

class ListPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestion: '',
      value: props.value || ''
    };
  }

  handleInputMount(input) {
    if (input && this.state.suggestion) {
      input.selectionStart = this.state.value.length;
      input.selectionEnd = this.state.suggestion.name.length;
    }
  }

  handleOnCancel(e) {
    this.props.onCancel();
  }

  handleOnChange(e) {
    const newValue = e.target.value;
    let suggestion = '';

    const match = _.find(
      this.props.values,
      (v) => v.name.toLowerCase().startsWith(this.state.value.toLowerCase())
    );

    if (match && newValue.length >= 2) {
      suggestion = match;
    } else {
      suggestion = null;
    }

    this.setState({
      suggestion: suggestion,
      value: newValue,
    });
  }

  handleOnKeyDown(e) {
    switch(e.key) {
      case 'Enter':
        this.handleOnSelect(e);
        break;
      case 'Escape':
        this.handleOnCancel(e);
        break;
      case 'Backspace':
        this.setState({suggestion:null});
        break;
    }
  }

  handleOnSelect(e) {
    this.props.onSelect(this.state.suggestion);
  }

  render() {
    const value = this.state.suggestion ? this.state.suggestion.name : this.state.value;
    return <div>
      <input
        ref={this.handleInputMount.bind(this)}
        type="text"
        onChange={this.handleOnChange.bind(this)}
        onKeyDown={this.handleOnKeyDown.bind(this)}
        value={value}
      />
      <Button className="icon-button" onClick={this.handleOnSelect.bind(this)}>
        <Checkmark height={ICON_SIZE} width={ICON_SIZE} />
      </Button>
      <Button className="icon-button" onClick={this.handleOnCancel.bind(this)}>
        <Close height={ICON_SIZE} width={ICON_SIZE} />
      </Button>
    </div>;
  }
}

ListPicker.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.required,
    name: PropTypes.string.required,
  })).isRequired
};

export default ListPicker;
