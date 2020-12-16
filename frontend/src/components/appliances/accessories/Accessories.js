import React from 'react';
import './scss/accessories.scss';
import AccessoriesList from './AccessoriesList';
import { BsPlusCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
const Accessories = () => {
  return (
    <div className='contanier-fluid mt-3' id='accessories-container'>
      <div className='row no-gutters' id='header'>
        <div className='col col-12 p-2 d-flex'>
          <h3 className='mb-2'>Accessories</h3>
          <div
            className='ml-auto align-self-center mr-2'
            id='add-accessory-icon'
          >
            <BsPlusCircle />
          </div>
        </div>
      </div>
      <AccessoriesList />
    </div>
  );
};

export default Accessories;
