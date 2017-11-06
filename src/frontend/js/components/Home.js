import React from 'react';

import DateNavigator from '../containers/DateNavigator';
import Meals from '../containers/Meals';
import People from '../containers/People';
import PortionCounter from '../containers/PortionCounter';

class Home extends React.Component {
  render() {
    return <div>
      <People />
      <DateNavigator />
      <PortionCounter />
      <Meals />
    </div>;
  }
}

export default Home;
