import React from 'react';
import './scss/accessoriesItem.scss';
import truncateText from '../../../utils/truncateText';

const AccessoriesItem = ({ accessory }) => {
  return (
    <div className='d-flex'>
      <div className='accessory-label p-2'>
        {accessory.name[0].toUpperCase() +
          accessory.name.substr(1, accessory.name.length)}
      </div>
    </div>
  );
};

export default AccessoriesItem;
