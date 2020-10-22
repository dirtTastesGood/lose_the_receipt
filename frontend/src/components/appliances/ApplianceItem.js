import React, { Fragment } from "react";

import "./scss/applianceItem.scss";

import truncateText from "../../utils/truncateText";

const ApplianceItem = props => {
  const {appliance} = props;

  return (
    <div className="appliance-item">
      <header className="p-2">
        {appliance.brand} <span>{appliance.appliance_type}</span>
      </header>
      {props.key}
      <div className="item-body">
        <div className="row p-1">
          <div className="col-6 text-right font-weight-bold">Purchase Date</div>
          <div className="col-6 text-left">{appliance.purchase_date}</div>
        </div>
        <div className="row p-1">
          <div className="col-6 text-right font-weight-bold">Model</div>
          <div className="col-6 text-left">
            {truncateText(appliance.model_number)}
          </div>
        </div>
        <div className="row p-1">
          <div className="col-6 text-right font-weight-bold">Serial</div>
          <div className="col-6 text-left">{appliance.serial_number}</div>
        </div>
      </div>
    </div>
  );
};

export default ApplianceItem;
