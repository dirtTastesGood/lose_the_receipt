import React, { useContext } from 'react';
import ApplianceContext from '../../../context/appliances/applianceContext';

import AccessoriesItem from './AccessoriesItem';

const AccessoriesList = () => {
  const applianceContext = useContext(ApplianceContext);

  const { accessories } = applianceContext;

  return (
    <div className='row no-gutters' id='accessories-list'>
      <div className='col col-12 d-flex p-2'>
        {accessories && accessories.length == 0 ? (
          <div>No accessories yet for this appliance</div>
        ) : (
          accessories.map(accessory => (
            <AccessoriesItem accessory={accessory} key={accessory.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default AccessoriesList;
