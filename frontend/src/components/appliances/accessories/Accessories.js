import React from 'react';
import './scss/accessories.scss';
import AccessoriesList from './AccessoriesList';

const Accessories = () => {
  return (
    <div className='container-fluid mt-3' id='accessories-container'>
      <div className='row p-2' id='header'>
        <h3 className='mb-2'>Accessories</h3>
      </div>
      <AccessoriesList />
    </div>
  );
};

export default Accessories;
