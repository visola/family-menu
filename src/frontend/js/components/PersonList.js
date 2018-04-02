import React from 'react';
import PropTypes from 'prop-types';

export default class PersonList extends React.Component {
  static propTypes = {
    people: PropTypes.object.isRequired,
  }

  render() {
    return <ul>{this.renderPeople()}</ul>;
  }

  renderPeople() {
    return this.props.people.map((person) => <li key={person.id}>{person.name}</li>);
  }
}
