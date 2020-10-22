import React, { Fragment, useContext, useState } from "react";

import ApplianceContext from "../../context/appliances/applianceContext";

import "./scss/applianceForm.scss";

const ApplianceForm = (props) => {
  const [appliance, setAppliance] = useState({
    brand: "",
    appliance_type: "",
    model_number: "",
    serial_number: "",
    purchase_date: "",
  });

  const applianceContext = useContext(ApplianceContext);
  const { addAppliance } = applianceContext;

  const onChange = (e) =>
    setAppliance({ ...appliance, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    props.toggleForm();

    addAppliance(appliance);

    // setAppliance({
    //   brand: "",
    //   appliance_type: "",
    //   model_number: "",
    //   serial_number: "",
    //   purchase_date: "",
    //   // manualUrl:'',
    // });
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
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="purchase-date">Purchase Date</label>
                <input
                  className="form-control"
                  type="date"
                  id="purchase-date"
                  name="purchase_date"
                  onChange={onChange}
                />
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
