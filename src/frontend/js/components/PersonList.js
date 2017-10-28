import React from 'react';
import PropTypes from 'prop-types';

class PersonList extends React.Component {
  render() {
    return <ul>{this.renderPeople()}</ul>;
  }

  renderPeople() {
    return this.props.people.map((person) => <li key={person.id}>{person.name}</li>);
  }
}

PersonList.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default PersonList;
