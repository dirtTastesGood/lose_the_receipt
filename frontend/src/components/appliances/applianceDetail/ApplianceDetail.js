import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import './scss/applianceDetail.scss';

import ApplianceContext from '../../../context/appliances/applianceContext';

import Spinner from '../../layout/Spinner';

import GeneralSection from './GeneralSection';
import AccessoriesSection from './AccessoriesSection';
import ServiceSection from './ServiceSection';

const ApplianceDetail = ({ match }) => {
  const applianceContext = useContext(ApplianceContext);

  const { getAppliance, current } = applianceContext;

  const [activeTab, setActiveTab] = useState('general');
  const tabTitles = ['general', 'accessories', 'service'];

  const changeTab = e => setActiveTab(e.target.id);

  useEffect(() => {
    async function fetchAppliance() {
      const { slug } = match.params;

      if (slug) {
        console.log('SLUG', slug);
        await getAppliance(slug);
      }
    }
    fetchAppliance();
    // eslint-disable-next-line
  }, []);

  let { url } = useRouteMatch();

  return (
    <div className='container-fluid' id='appliance-detail'>
      {!current ? (
        <div className='row no-gutters mt-5'>
          <div className='col col-6 offset-3 text-center'>
            <Spinner />
          </div>
        </div>
      ) : (
        <Fragment>
          {/* Appliance Section Tabs */}
          <ul className='appliance-tabs d-flex justify-content-center p-0 mb-5'>
            {tabTitles.map((tabTitle, key) => (
              <Link to={`${url}/${tabTitle}`}>
                <li
                  className={
                    'appliance-tab align-items-center px-3 ' +
                    (activeTab === tabTitle ? 'active' : '')
                  }
                  id={tabTitle}
                  key={key}
                  onClick={changeTab}
                >
                  {tabTitle[0].toUpperCase() + tabTitle.substr(1)}
                </li>
              </Link>
            ))}
          </ul>
          <div className='row no-gutters mb-2'>
            <div
              className='col col-12 d-flex justify-content-between'
              id='appliance-controls'
            >
              <button
                className='btn btn-sm btn-secondary text-light'
                id='prev-button'
              >
                <Link className='text-light' to='/appliances'>
                  Back
                </Link>
              </button>
            </div>
          </div>

          <Switch>
            <Route exact path={`${url}/accessories`}>
              <AccessoriesSection />
              ACCESSORIES
            </Route>
            <Route exact path={`${url}/service`}>
              <ServiceSection />
              SERVICE
            </Route>
            <Route path={`${url}`}>
              <GeneralSection />
            </Route>
          </Switch>
        </Fragment>
      )}
    </div>
  );
};

export default ApplianceDetail;
