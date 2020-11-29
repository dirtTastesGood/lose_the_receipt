import React, { useContext } from 'react';
import ApplianceContext from '../../../context/appliances/applianceContext';

import AccessoriesItem from './AccessoriesItem';

const AccessoriesList = () => {
  const applianceContext = useContext(ApplianceContext);

  const { accessories } = applianceContext;

  return (
    <div className='row my-2' id='accessories-list'>
      {accessories.map(accessory => (
        <div className='col col-12' id='accessories-item' key={accessory.id}>
          <AccessoriesItem accessory={accessory} />
        </div>
      ))}
    </div>
  );
};

export default AccessoriesList;
