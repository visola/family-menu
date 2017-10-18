import React from 'react';

import MealsTable from '../containers/MealsTable';
import People from '../containers/People';

class Home extends React.Component {
  render() {
    return <div>
      <People />
      <MealsTable />
    </div>;
  }
}

export default Home;
