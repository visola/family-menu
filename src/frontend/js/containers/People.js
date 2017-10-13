import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadPeople } from '../actions/People';
import PersonList from '../components/PersonList';

class People extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showList: false };
  }

  componentDidMount() {
    this.props.loadPeople();
  }

  onClick(e) {
    e.preventDefault();
    this.setState({ showList: !this.state.showList });
  }

  render() {
    return <div className="people" onClick={this.onClick.bind(this)}>
      <p>You have {this.props.people.length} people in your family.</p>
      {this.renderPeople()}
    </div>;
  }

  renderPeople() {
    if (this.state.showList === true) {
      return <PersonList people={this.props.people} />;
    }
    return null;
  }
}

People.propTypes = {
  loadPeople: PropTypes.func.isRequired,
  people: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.required,
    name: PropTypes.string.required,
  })).isRequired,
};

const mapStateToProps = (state) => {
  return {
    people: state.people.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPeople: () => dispatch(loadPeople()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(People);
