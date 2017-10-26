import Button from 'react-bootstrap/lib/Button';
import { Checkmark, Close } from 'react-bytesize-icons';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Fuse from 'fuse.js';
import PropTypes from 'prop-types';
import React from 'react';

import { createDish } from '../actions/Dishes';

const ICON_SIZE = 16;

const FUSE_OPTIONS = {
  distance: 100,
  includeMatches: true,
  includeScore: true,
  keys: ['name'],
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
      value: '',
    };
  }

  checkSuggestions(dishes, value) {
    let selectedSuggestion = -1;
    const suggestions = new Fuse(dishes, FUSE_OPTIONS).search(value);

    if (suggestions.length > 0 && suggestions[0].score === 0) {
      selectedSuggestion = 0;
    }

    this.setState({ selectedSuggestion, suggestions });
  }

  componentWillReceiveProps(nextProps) {
    this.checkSuggestions(nextProps.dishes, this.state.value);
  }

  handleClickCreate(e) {
    e.preventDefault();
    this.props.createDish(this.state.value);
  }

  handleClickDish(index, e) {
    e.preventDefault();
    this.props.onSelect(this.state.suggestions[index].item);
  }

  handleMountInput(input) {
    if (input) {
      input.focus();
    }
  }

  handleOnCancel() {
    this.props.onCancel();
  }

  handleOnChange(e) {
    const newValue = e.target.value;

    this.checkSuggestions(this.props.dishes, newValue);
    this.setState({
      value: newValue,
    });
  }

  handleOnKeyDown(e) {
    let { selectedSuggestion } = this.state;
    switch (e.key) {
      case 'Enter':
        this.handleOnSelect(e);
        break;
      case 'Escape':
        this.handleOnCancel(e);
        break;
      case 'Backspace':
        this.setState({ suggestion: null });
        break;
      case 'ArrowDown':
        e.preventDefault();
        selectedSuggestion += 1;
        if (selectedSuggestion > this.state.suggestions.length) {
          selectedSuggestion = this.state.suggestions.length;
        }
        this.setState({ selectedSuggestion });
        break;
      case 'ArrowUp':
        e.preventDefault();
        selectedSuggestion -= 1;
        if (selectedSuggestion < -1) {
          selectedSuggestion = -1;
        }
        this.setState({ selectedSuggestion });
        break;
      default:
        // Nothing to do here
    }
  }

  handleOnSelect() {
    const { selectedSuggestion } = this.state;
    if (selectedSuggestion >= 0 && selectedSuggestion < this.state.suggestions.length) {
      this.props.onSelect(this.state.suggestions[selectedSuggestion].item);
    }
  }

  render() {
    const value = this.state.suggestion ? this.state.suggestion.name : this.state.value;
    return <div className="dish-picker">
      <input
        ref={this.handleMountInput.bind(this)}
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
    const smallestScore = this.state.suggestions.length > 0 ? this.state.suggestions[0].score : 1;
    if (smallestScore > 0) {
      const classes = classnames({
        extra: true,
        selected: this.state.selectedSuggestion === this.state.suggestions.length,
      });
      return <li className={classes}>
        <Button bsStyle="link" onClick={this.handleClickCreate.bind(this)}>
          Create &apos;{this.state.value}&apos;
        </Button>
      </li>;
    }
    return null;
  }

  renderMatch(match, index) {
    const dish = match.item;
    const classes = classnames({
      selected: index === this.state.selectedSuggestion,
    });
    return <li key={dish.id} className={classes}>
      <Button bsStyle="link" onClick={this.handleClickDish.bind(this, index)}>
        {dish.name}
      </Button>
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
  })).isRequired,
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
