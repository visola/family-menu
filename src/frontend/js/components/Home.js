import React from 'react';

import DateNavigator from './DateNavigator';
import People from './People';
import PortionCounter from './PortionCounter';

class Home extends React.Component {
  render() {
    return <div>
      <People />
      <DateNavigator />
      <PortionCounter />
    </div>;
  }
}

export default Home;
