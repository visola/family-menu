import React from 'react';

import Meals from '../containers/Meals';
import People from '../containers/People';

class Home extends React.Component {
  render() {
    return <div>
      <People />
      <Meals />
    </div>;
  }
}

export default Home;
