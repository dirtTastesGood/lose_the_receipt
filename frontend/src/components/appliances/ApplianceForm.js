import React, { useEffect, useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ApplianceContext from '../../context/appliances/applianceContext';
import AlertContext from '../../context/alerts/alertContext';

import './scss/applianceForm.scss';

const ApplianceForm = props => {
  const applianceContext = useContext(ApplianceContext);
  const {
    addAppliance,
    updateAppliance,
    current,
    setCurrent,
    getAppliance,
    getAppliances,
  } = applianceContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [appliance, setAppliance] = useState({
    brand: '',
    appliance_type: '',
    model_number: '',
    serial_number: '',
    purchase_date: '',
    location: '',
  });

  const [formMode, setFormMode] = useState('add');

  let history = useHistory();
  const { slug } = useParams();

  useEffect(() => {
    async function fetchAppliance() {
      console.log('slug', slug);
      await getAppliance(slug);
    }
    fetchAppliance();

    if (current) {
      const {
        brand,
        appliance_type,
        model_number,
        serial_number,
        purchase_date,
        location,
      } = current;
      setAppliance({
        brand,
        appliance_type,
        model_number,
        serial_number,
        purchase_date,
        location,
      });
    } else {
      // history.push('/appliances');
    }
    // eslint-disable-next-line
  }, [current]);

  const {
    brand,
    appliance_type,
    model_number,
    serial_number,
    purchase_date,
    location,
  } = appliance;

  // redirect when appliance successfully added or updated
  useEffect(() => {
    if (current && props.match) {
      const { url, history } = props.match;
      const mode = url.split('/')[url.split('/').length - 1];
      if (mode === 'add') {
        if (current && history) {
          history.push(`/appliances/${current.slug}`);
        }
      }
      setFormMode(mode);
    }
    // eslint-disable-next-line
  }, [current, setFormMode, props.match]);

  const onChange = e =>
    setAppliance({ ...appliance, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    if (brand === '' || appliance_type === '' || location === '') {
      setAlert('Please enter all fields.', 'danger');
    } else {
      if (formMode === 'add') {
        addAppliance(appliance).then(response => {
          setCurrent(response.data.appliance);

          setAppliance({
            brand: '',
            appliance_type: '',
            model_number: '',
            serial_number: '',
            purchase_date: '',
            location: '',
            // manualUrl:'',
          });
          setAlert('Appliance added successfully!', 'success');

          // update appliance list
          getAppliances();
          history.push(`/appliances/${response.data.appliance.slug}`);
        });
      } else {
        // formMode === 'edit
        updateAppliance(appliance, current.slug)
          .then(response => {
            console.log('update response', response.data);

            setCurrent(response.data.appliance);

            setAppliance({
              brand: '',
              appliance_type: '',
              model_number: '',
              serial_number: '',
              purchase_date: '',
              location: '',
              // manualUrl:'',
            });
            setAlert('Appliance updated successfully!', 'success');

            // update appliance list
            getAppliances();
            history.push(`/appliances/${current.slug}`);
          })
          .catch(error => {
            Object.keys(error.response.data.msg).map(key => {
              setAlert(error.response.data.msg[key], 'danger');
            });
          });
      }
    }
  };

  return (
    <div className='container-fluid mt-5' id='appliance-form'>
      {!current && formMode === 'edit' ? (
        <div>Redirect</div>
      ) : (
        <div className='row'>
          <div className='col col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2'>
            <form onSubmit={onSubmit} className='p-3'>
              <div className='form-row'>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label htmlFor='brand'>Brand</label>
                    <input
                      className='form-control'
                      type='text'
                      name='brand'
                      id='brand'
                      value={brand}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label htmlFor='appliance-type'>Type</label>
                    <input
                      className='form-control'
                      type='text'
                      name='appliance_type'
                      id='appliance-type'
                      value={appliance_type}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
              <div className='form-row'>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label htmlFor='model-number'>Model Number</label>
                    <input
                      className='form-control'
                      type='text'
                      name='model_number'
                      id='model-number'
                      value={model_number}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label htmlFor='serial-number'>Serial Number</label>
                    <input
                      className='form-control'
                      type='text'
                      name='serial_number'
                      id='serial-number'
                      value={serial_number}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>

              <div className='form-row'>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label htmlFor='location'>Location</label>
                    <input
                      className='form-control'
                      type='text'
                      name='location'
                      id='location'
                      value={location}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label htmlFor='purchase-date'>Purchase Date</label>
                    <input
                      className='form-control'
                      type='date'
                      id='purchase-date'
                      name='purchase_date'
                      value={purchase_date}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>

              <input
                className='btn btn-lg btn-primary'
                type='submit'
                value={formMode === 'add' ? 'Add' : 'Update'}
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplianceForm;
