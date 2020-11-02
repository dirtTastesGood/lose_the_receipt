import React, { Fragment, useContext } from "react";
import "./scss/generalSection.scss";
import ApplianceContext from "../../../context/appliances/applianceContext";

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
    <div className="container-fluid p-0" id="general-content-container">
      <div className="row">
        <div
          className="col col-12 col-lg-4 offset-lg-1 text-center py-2"
          id="left-column"
        >
          <h1 className="font2 text-bold mb-0">{brand}</h1>
          <h3 className="mb-4">{appliance_type}</h3>
        </div>

        <div className="col col-12 col-lg-6" id="right-column">
        <div className="row mb-1">
            <div className="col col-12 col-lg-12 detail-text text-center text-lg-left p-2">
              {description}
            </div>
          </div>
          <div className="row">
            <div className="col col-5 col-lg-3 detail-label text-center text-lg-right pt-1">Location</div>
            <div className="col col-7 col-lg-9 detail-text text-center text-lg-left p-2">{location}</div>
          </div>
          <div className="row">
            <div className="col col-5 col-lg-3 detail-label text-center text-lg-right pt-1">Purchased</div>
            <div className="col col-7 col-lg-9 detail-text text-center text-lg-left p-2">
              {purchase_date}
            </div>
          </div>

          <div className="row">
            <div className="col col-5 col-lg-3 detail-label text-center text-lg-right pt-1">Model</div>
            <div className="col col-7 col-lg-9 detail-text text-center text-lg-left p-2">
              {model_number}
            </div>
          </div>
          <div className="row mb-1">
            <div className="col col-5 col-lg-3 detail-label text-center text-lg-right pt-1">Serial</div>
            <div className="col col-7 col-lg-9 detail-text text-center text-lg-left p-2">
              {serial_number}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GeneralSection;
