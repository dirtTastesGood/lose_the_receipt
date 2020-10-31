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
    slug,
  } = current;

  return (
    <div className="container-fluid" id="general-content-container">
      <div className="row py-3">
        <div
          className="col col-12 col-lg-4 offset-lg-1 text-center"
          id="left-column"
        >
          <h1 className="font2 text-bold mb-0">{brand}</h1>
          <h3 className="mb-4">{appliance_type}</h3>
        </div>

        <div className="col col-12 col-lg-6" id="right-column">
          <div className="row">
            <div className="col col-4 col-lg-2 detail-label">Location</div>
            <div className="col col-8 col-lg-10 detail-text">{location}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSection;
