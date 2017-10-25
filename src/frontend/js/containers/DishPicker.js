import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Fuse from 'fuse.js';
import PropTypes from 'prop-types';
import React from 'react';

import { createDish } from '../actions/Dishes';
import { Checkmark, Close } from 'react-bytesize-icons';

const ICON_SIZE=16;

const FUSE_OPTIONS = {
  distance: 100,
  includeMatches: true,
  includeScore: true,
  keys: ["name"],
  location: 0,
  maxPatternLength: 32,
  minMatchCharLength: 2,
  shouldSort: true,
  threshold: 0.6,
};

class DishPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSuggestion: -1,
      suggestions: [],
      value: props.value || ''
    };
  }

  componentWillReceiveProps(nextProps) {
    const suggestions = new Fuse(nextProps.dishes, FUSE_OPTIONS)
      .search(this.state.value);
    this.setState({ suggestions, selectedSuggestion: -1 });
  }

  handleClickCreate(e) {
    e.preventDefault();
    this.props.createDish(this.state.value);
  }

  handleOnCancel(e) {
    this.props.onCancel();
  }

  handleOnChange(e) {
    const newValue = e.target.value;
    const suggestions = new Fuse(this.props.dishes, FUSE_OPTIONS).search(newValue);

    this.setState({
      suggestions,
      value: newValue,
    });
  }

  handleOnKeyDown(e) {
    let selectedSuggestion = this.state.selectedSuggestion;
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
      case 'ArrowDown':
        e.preventDefault();
        selectedSuggestion += 1;
        if (selectedSuggestion > this.state.suggestions.length) {
          selectedSuggestion = this.state.suggestions.length;
        }
        this.setState({selectedSuggestion: selectedSuggestion});
        break;
      case 'ArrowUp':
        e.preventDefault();
        selectedSuggestion -= 1;
        if (selectedSuggestion < -1) {
          selectedSuggestion = -1;
        }
        this.setState({selectedSuggestion: selectedSuggestion});
        break;
    }
  }

  handleOnSelect(e) {
    this.props.onSelect(this.state.suggestion);
  }

  render() {
    const value = this.state.suggestion ? this.state.suggestion.name : this.state.value;
    return <div className="dish-picker">
      <input
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
      {this.renderSuggestions()}
    </div>;
  }

  renderCreateNew() {
    const classes = classnames({
      extra: true,
      selected: this.state.selectedSuggestion == this.state.suggestions.length,
    });
    return <li className={classes} onClick={this.handleClickCreate.bind(this)}>
      Create '{this.state.value}'
    </li>;
  }

  renderMatch(match, index) {
    const dish = match.item;
    const classes = classnames({
      selected: index == this.state.selectedSuggestion,
    });
    return <li key={dish.id} className={classes}>
      {dish.name}
    </li>;
  }

  renderSuggestions() {
    if (this.state.value.length >= 2) {
      let suggestions = null;

      if (this.state.suggestions.length > 0) {
        suggestions = this.state.suggestions.map((match, index) => this.renderMatch(match, index));
      }

      return <ul>
        {suggestions}
        {this.renderCreateNew()}
      </ul>;
    }
    return null;
  }
}

DishPicker.propTypes = {
  createDish: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  dishes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.required,
    name: PropTypes.string.required,
  })).isRequired
};

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createDish: (name) => dispatch(createDish(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DishPicker);
