import React from 'react';
import PropTypes from 'prop-types';

class PersonList extends React.Component {
  render() {
    return <ul className="person-list">{this.renderPeople()}</ul>;
  }

  renderPeople() {
    return this.props.people.map((person) => <li key={person.id}>{person.name}</li>);
  }
}

PersonList.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.required,
    name: PropTypes.string.required,
  })).isRequired,
};

export default PersonList;
