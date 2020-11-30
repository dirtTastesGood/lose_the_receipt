import React, { useContext } from 'react';
import ApplianceContext from '../../../context/appliances/applianceContext';

import AccessoriesItem from './AccessoriesItem';

const AccessoriesList = () => {
  const applianceContext = useContext(ApplianceContext);

  const { accessories } = applianceContext;

  return (
    <div className='row my-2' id='accessories-list'>
      <div className='col col-12 d-flex'>
        {accessories.map(accessory => (
          <AccessoriesItem accessory={accessory} key={accessory.id} />
        ))}
      </div>
    </div>
  );
};

export default AccessoriesList;
