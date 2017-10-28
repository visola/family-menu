import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { CaretBottom, CaretTop } from 'react-bytesize-icons';

import { createPerson } from '../actions/People';
import Modal from '../components/Modal';
import PersonList from '../components/PersonList';

class People extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personEmail: '',
      personName: '',
      showAddModal: false,
      showList: false,
    };
  }

  onAddPersonClick(e) {
    e.preventDefault();
    this.setState({ showAddModal: true });
  }

  onAddPersonSave(e) {
    e.preventDefault();
    this.setState({ showAddModal: false });
    this.props.createPerson({
      email: this.state.personEmail,
      name: this.state.personName,
    });
    this.setState({
      personEmail: '',
      personName: '',
      showList: false,
    });
  }

  onCancelOrCloseAddPerson(e) {
    e.preventDefault();
    this.setState({ showAddModal: false });
  }

  onPersonChange(field, e) {
    this.setState({ [`person${field}`]: e.target.value });
  }

  onToggleOpenClick(e) {
    e.preventDefault();
    this.setState({ showList: !this.state.showList });
  }

  render() {
    const subject = this.props.people.length === 1 ? 'person' : 'people';
    return <div className="people">
      {this.renderModal()}
      <p className="status">
        You have {this.props.people.length} {subject} in your family.
        {this.renderIcon()}
      </p>
      {this.renderPeople()}
    </div>;
  }

  renderIcon() {
    const size = 16;
    return <span onClick={this.onToggleOpenClick.bind(this)}>
      {
        this.state.showList ?
        <CaretBottom width={size} height={size} /> :
        <CaretTop width={size} height={size} />
      }
    </span>;
  }

  renderModal() {
    return <Modal
            onAccept={this.onAddPersonSave.bind(this)}
            onCancel={this.onCancelOrCloseAddPerson.bind(this)}
            onClose={this.onCancelOrCloseAddPerson.bind(this)}
            title="Add person"
            visible={this.state.showAddModal}>
      <form onSubmit={this.onAddPersonSave.bind(this)}>
        <FormControl
          type="text"
          onChange={this.onPersonChange.bind(this, 'Name')}
          placeholder="Person Name"
          value={this.state.personName} />
        <FormControl
          onChange={this.onPersonChange.bind(this, 'Email')}
          placeholder="E-Mail"
          type="text"
          value={this.state.personEmail}
        />
      </form>
    </Modal>;
  }

  renderPeople() {
    if (this.state.showList === true) {
      return <div className="people-list">
        <PersonList people={this.props.people} />
        <Button onClick={this.onAddPersonClick.bind(this)}>Add Person</Button>
      </div>;
    }
    return null;
  }
}

People.propTypes = {
  createPerson: PropTypes.func.isRequired,
  people: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => {
  return {
    people: state.people.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPerson: (person) => dispatch(createPerson(person)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(People);
