import React, {useContext} from "react";

import { Link } from "react-router-dom";

import "./scss/applianceItem.scss";

import truncateText from "../../utils/truncateText";

import ApplianceContext from '../../context/appliances/applianceContext';

const ApplianceItem = (props) => {
  const { appliance, index } = props;
  
  const applianceContext = useContext(ApplianceContext);

  const {setCurrent} = applianceContext;

  return (
    <Link to="/appliances/detail/">
      <div className="appliance-item" onClick={()=>setCurrent(appliance)}>
        <header className="p-2">
          {appliance.brand} <span>{appliance.appliance_type}</span>
        </header>

        <div className="item-body p-2">
          <div className="row p-1">
            <div className="col-6 text-right font-weight-bold">
              Purchase Date
            </div>
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
            <div className="col-6 text-left">
              {truncateText(appliance.serial_number)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ApplianceItem;
