import React from 'react';
import './scss/accessoriesItem.scss';
import truncateText from '../../../utils/truncateText';

const AccessoriesItem = ({ accessory }) => {
  return (
    <div className='accessories-item p-2'>
      {accessory.name[0].toUpperCase() +
        accessory.name.substr(1, accessory.name.length)}
    </div>
  );
};

export default AccessoriesItem;
