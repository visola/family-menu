import React from 'react';

import DateNavigator from '../containers/DateNavigator';
import Meals from '../containers/Meals';
import People from '../containers/People';

class Home extends React.Component {
  render() {
    return <div>
      <People />
      <DateNavigator />
      <Meals />
    </div>;
  }
}

export default Home;
