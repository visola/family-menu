import Button from 'react-bootstrap/lib/Button';
import { Checkmark, Close } from 'react-bytesize-icons';
import classnames from 'classnames';
import Fuse from 'fuse.js';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';

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

@inject('dishes')
@observer
export default class DishPicker extends React.Component {
  static propTypes = {
    dishes: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedSuggestion: -1,
      value: '',
    };
  }

  checkSuggestions() {
    const { value } = this.state;
    if (value.length < 2) {
      return [];
    }

    const { dishes } = this.props;
    const suggestions = new Fuse(dishes.collection, FUSE_OPTIONS).search(value);
    return suggestions;
  }

  handleClickDish(index, e) {
    e.preventDefault();
    const suggestions = this.checkSuggestions();
    this.props.onSelect(suggestions[index].item);
  }

  handleCreate() {
    this.props.dishes.saveOne({ name: this.state.value });
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

    this.setState({
      value: newValue,
    });
  }

  handleOnKeyDown(e) {
    let { selectedSuggestion } = this.state;
    const suggestions = this.checkSuggestions();

    switch (e.key) {
      case 'Enter':
        this.handleOnSelect(e);
        break;
      case 'Escape':
        this.handleOnCancel(e);
        break;
      case 'ArrowDown':
        e.preventDefault();
        selectedSuggestion += 1;
        if (selectedSuggestion > suggestions.length) {
          selectedSuggestion = suggestions.length;
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
    const suggestions = this.checkSuggestions();

    if (selectedSuggestion >= 0 && selectedSuggestion < suggestions.length) {
      this.props.onSelect(suggestions[selectedSuggestion].item);
    } else if (selectedSuggestion === suggestions.length) {
      this.handleCreate();
    }
  }

  render() {
    const { value } = this.state;
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

  renderCreateNew(suggestions) {
    const smallestScore = suggestions.length > 0 ? suggestions[0].score : 1;
    if (smallestScore > 0) {
      const classes = classnames({
        extra: true,
        selected: this.state.selectedSuggestion === suggestions.length,
      });
      return <li className={classes}>
        <Button bsStyle="link" onClick={this.handleCreate.bind(this)}>
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
    const suggestions = this.checkSuggestions();

    if (this.state.value.length < 2) {
      return null;
    }

    return <ul>
      {suggestions.map((match, index) => this.renderMatch(match, index))}
      {this.renderCreateNew(suggestions)}
    </ul>;
  }
}
