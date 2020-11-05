import React, { Fragment, useContext, useState } from "react";

import ApplianceContext from "../../context/appliances/applianceContext";
import AlertContext from "../../context/alerts/alertContext";

import "./scss/applianceForm.scss";

const ApplianceForm = (props) => {
  const [appliance, setAppliance] = useState({
    brand: "",
    appliance_type: "",
    model_number: "",
    serial_number: "",
    purchase_date: "",
    location: "",
  });

  const {
    brand,
    appliance_type,
    model_number,
    serial_number,
    purchase_date,
    location,
  } = appliance;

  const applianceContext = useContext(ApplianceContext);
  const { addAppliance, toggleForm, setCurrent, getAppliances } = applianceContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const onChange = (e) =>
    setAppliance({ ...appliance, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (brand === "" || appliance_type === "" || location === "") {
      setAlert("Please enter all fields.", "danger");
    } else {
      addAppliance(appliance)
        .then((response) => {
          setCurrent(response.data);

          setAppliance({
            brand: "",
            appliance_type: "",
            model_number: "",
            serial_number: "",
            purchase_date: "",
            location: "",
            // manualUrl:'',
          });
          setAlert('Appliance added successfully!', 'success')

          // update appliance list
          getAppliances();
        })
        .catch((error) => {
          Object.keys(error.response.data).map(key=>{
            setAlert(error.response.data[key], 'danger')
          });
          
        });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
          <form onSubmit={onSubmit}>
            <div className="form-row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="brand">Brand</label>
                  <input
                    className="form-control"
                    type="text"
                    name="brand"
                    id="brand"
                    value={brand}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="appliance-type">Type</label>
                  <input
                    className="form-control"
                    type="text"
                    name="appliance_type"
                    id="appliance-type"
                    value={appliance_type}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="model-number">Model Number</label>
                  <input
                    className="form-control"
                    type="text"
                    name="model_number"
                    id="model-number"
                    value={model_number}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="serial-number">Serial Number</label>
                  <input
                    className="form-control"
                    type="text"
                    name="serial_number"
                    id="serial-number"
                    value={serial_number}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    className="form-control"
                    type="text"
                    name="location"
                    id="location"
                    value={location}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="purchase-date">Purchase Date</label>
                  <input
                    className="form-control"
                    type="date"
                    id="purchase-date"
                    name="purchase_date"
                    value={purchase_date}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>

            <input
              className="btn btn-lg btn-primary"
              type="submit"
              value="Add"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplianceForm;
