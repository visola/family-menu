import Button from 'react-bootstrap/lib/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Minus, Plus } from 'react-bytesize-icons';

class PlannedMeal extends React.Component {
  render() {
    return <div className="meal">
      {this.props.person.name} <Button><Plus height="16" width="16" /></Button>
      <ul>
        <li>Rice<Button><Minus height="16" width="16" /></Button></li>
        <li>Bean<Button><Minus height="16" width="16" /></Button></li>
        <li>Grilled chicken<Button><Minus height="16" width="16" /></Button></li>
      </ul>
    </div>;
  }
}

PlannedMeal.propTypes = {
  day: PropTypes.object.isRequired,
  dishes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.required,
    name: PropTypes.string.required,
  })).isRequired,
  meal: PropTypes.shape({
    id: PropTypes.number.required,
    name: PropTypes.string.required,
  }).isRequired,
  person: PropTypes.shape({
    id: PropTypes.number.required,
    name: PropTypes.string.required,
  }).isRequired,
};

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes.list,
  };
};

export default connect(mapStateToProps)(PlannedMeal);
