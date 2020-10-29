import React, { useContext, useEffect, useState } from 'react';
import './scss/applianceDetail.scss';
import ApplianceContext from '../../context/appliances/applianceContext';

import {
  GET_APPLIANCE_DETAIL_SUCCESS,
  GET_APPLIANCE_DETAIL_FAIL,
  SET_CURRENT_APPLIANCE,
} from '../../context/types';

const ApplianceDetail = props => {
  const applianceContext = useContext(ApplianceContext);

  const { getAppliance } = applianceContext;

  const [activeTab, setActiveTab] = useState('general');

  const changeTab = e => setActiveTab(e.target.id);

  useEffect(() => {
    const { slug } = props.match.params;
    getAppliance(slug);
  }, []);

  return (
    <div className='container-fluid' id='appliance-detail'>
      <ul className='appliance-tabs d-flex justify-content-center p-0'>
        <li
          className={
            'appliance-tab align-items-center px-3 ' +
            (activeTab === 'general' ? 'active' : '')
          }
          id='general'
          onClick={changeTab}
        >
          General
        </li>
        <li
          className={
            'appliance-tab align-items-center px-3 ' +
            (activeTab === 'accessories' ? 'active' : '')
          }
          id='accessories'
          onClick={changeTab}
        >
          Accessories
        </li>
        <li
          className={
            'appliance-tab align-items-center px-3 ' +
            (activeTab === 'service' ? 'active' : '')
          }
          id='service'
          onClick={changeTab}
        >
          Service
        </li>
      </ul>
    </div>
  );
};

export default ApplianceDetail;
