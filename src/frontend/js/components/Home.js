import React from 'react';

import DateNavigator from './DateNavigator';
import Meals from './Meals';
import People from './People';
import PortionCounter from './PortionCounter';

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
