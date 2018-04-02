import Button from 'react-bootstrap/lib/Button';
import { CaretBottom, CaretTop } from 'react-bytesize-icons';
import FormControl from 'react-bootstrap/lib/FormControl';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';

import Modal from './Modal';
import PersonList from './PersonList';

@inject('people')
@observer
export default class People extends React.Component {
  static propTypes = {
    people: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      personEmail: '',
      personName: '',
      showAddModal: false,
      showList: false,
    };

    this.handleAddPersonClick = this.handleAddPersonClick.bind(this);
    this.handleAddPersonSave = this.handleAddPersonSave.bind(this);
    this.handleCancelOrCloseAddPerson = this.handleCancelOrCloseAddPerson.bind(this);
    this.handlePersonChange = this.handlePersonChange.bind(this);
    this.handleToggleOpenClick = this.handleToggleOpenClick.bind(this);
  }

  componentWillMount() {
    this.props.people.fetch();
  }

  handleAddPersonClick(e) {
    e.preventDefault();
    this.setState({ showAddModal: true });
  }

  handleAddPersonSave(e) {
    e.preventDefault();
    this.setState({ showAddModal: false });
    this.props.people.saveOne({
      email: this.state.personEmail,
      name: this.state.personName,
    });
    this.setState({
      personEmail: '',
      personName: '',
      showList: false,
    });
  }

  handleCancelOrCloseAddPerson() {
    this.setState({ showAddModal: false });
  }

  handlePersonChange(field, e) {
    this.setState({ [`person${field}`]: e.target.value });
  }

  handleToggleOpenClick(e) {
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
    return <span onClick={this.handleToggleOpenClick}>
      {
        this.state.showList ?
        <CaretBottom width={size} height={size} /> :
        <CaretTop width={size} height={size} />
      }
    </span>;
  }

  renderModal() {
    return <Modal
             onAccept={this.handleAddPersonSave}
             onCancel={this.handleCancelOrCloseAddPerson}
             onClose={this.handleCancelOrCloseAddPerson}
             title="Add person"
             visible={this.state.showAddModal}>
       <form onSubmit={this.handleAddPersonSave}>
         <FormControl
           type="text"
           onChange={(e) => this.handlePersonChange('Name', e)}
           placeholder="Person Name"
           value={this.state.personName} />
         <FormControl
           onChange={(e) => this.handlePersonChange('Email', e)}
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
        <Button onClick={this.handleAddPersonClick}>Add Person</Button>
      </div>;
    }
    return null;
  }
}
