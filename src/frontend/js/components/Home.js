import React from 'react';

import DateNavigator from './DateNavigator';
import People from './People';

class Home extends React.Component {
  render() {
    return <div>
      <People />
      <DateNavigator />
    </div>;
  }
}

export default Home;
