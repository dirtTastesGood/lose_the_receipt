import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './scss/generalSection.scss';
import { BsPencilSquare } from 'react-icons/bs';
import ApplianceContext from '../../../context/appliances/applianceContext';

import Accessories from '../accessories/Accessories';

const GeneralSection = () => {
  const applianceContext = useContext(ApplianceContext);

  const { current } = applianceContext;
  const {
    brand,
    appliance_type,
    location,
    purchase_date,
    model_number,
    serial_number,
    description,
    slug,
  } = current;

  return (
    <div className='container-fluid py-3 px-2' id='general-content-container'>
      <div className='row no-gutters'>
        <div
          className='col col-12 col-lg-4 offset-lg-1 px-2 text-center'
          id='left-column'
        >
          <div
            className='p-2 d-flex flex-column align-items-center'
            id='header'
          >
            <Link to={`/appliances/${slug}/edit`} id='edit-icon'>
              <BsPencilSquare />
            </Link>

            <h1 className='font2 text-bold mb-0'>{brand}</h1>
            <h3 className='mb-4'>{appliance_type}</h3>
          </div>

          <div className='row no-gutters mb-1'>
            <div className='col col-12 col-lg-12 detail-text text-center text-lg-left'>
              {description}
            </div>
          </div>
          <div className='row no-gutters'>
            <div className='col col-5 col-lg-3 detail-label text-center text-lg-right pt-1'>
              Location
            </div>
            <div className='col col-7 col-lg-9 detail-text text-center text-lg-left'>
              {location}
            </div>
          </div>
          <div className='row no-gutters'>
            <div className='col col-5 col-lg-3 detail-label text-center text-lg-right pt-1'>
              Purchased
            </div>
            <div className='col col-7 col-lg-9 detail-text text-center text-lg-left'>
              {purchase_date}
            </div>
          </div>

          <div className='row no-gutters'>
            <div className='col col-5 col-lg-3 detail-label text-center text-lg-right pt-1'>
              Model
            </div>
            <div className='col col-7 col-lg-9 detail-text text-center text-lg-left'>
              {model_number}
            </div>
          </div>
          <div className='row no-gutters mb-1'>
            <div className='col col-5 col-lg-3 detail-label text-center text-lg-right pt-1'>
              Serial
            </div>
            <div className='col col-7 col-lg-9 detail-text text-center text-lg-left'>
              {serial_number}
            </div>
          </div>
        </div>

        <div className='col col-12 col-lg-5 offset-lg-1' id='right-column'>
          <div id='photos'>Photos</div>
          <Accessories />
        </div>
      </div>
    </div>
  );
};

export default GeneralSection;
