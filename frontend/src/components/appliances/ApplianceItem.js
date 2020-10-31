import React, { useContext } from "react";

import { Link } from "react-router-dom";

import "./scss/applianceItem.scss";

import truncateText from "../../utils/truncateText";

import ApplianceContext from "../../context/appliances/applianceContext";

const ApplianceItem = (props) => {
  const { appliance, index } = props;
  const {
    brand,
    appliance_type,
    location,
    purchase_date,
    model_number,
    serial_number,
    slug
  } = appliance;
  const applianceContext = useContext(ApplianceContext);

  const { setCurrent } = applianceContext;

  return (
    <Link to={`/appliances/${slug}`}>
      <div className="appliance-item" onClick={() => setCurrent(appliance)}>
        <header className="pb-2">
          {brand} <span id="appliance-type">{appliance_type}</span>
        </header>

        <div className="item-body p-2">
        <div className="row pb-1">
            <div className="col-6 text-right font-weight-bold">Location</div>
            <div className="col-6 text-left">
              {truncateText(location)}
            </div>
          </div>
          <div className="row pb-1">
            <div className="col-6 text-right font-weight-bold">
              Purchase Date
            </div>
            <div className="col-6 text-left">{purchase_date}</div>
          </div>
          <div className="row pb-1">
            <div className="col-6 text-right font-weight-bold">Model</div>
            <div className="col-6 text-left">
              {truncateText(model_number)}
            </div>
          </div>
          <div className="row pb-1">
            <div className="col-6 text-right font-weight-bold">Serial</div>
            <div className="col-6 text-left">
              {truncateText(serial_number)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ApplianceItem;
