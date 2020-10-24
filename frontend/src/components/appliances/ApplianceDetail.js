import React, { useContext } from "react";

import ApplianceContext from "../../context/appliances/applianceContext";

const ApplianceDetail = () => {
  const applianceContext = useContext(ApplianceContext);

  const { current } = applianceContext;
  const {
    brand,
    appliance_type,
    model_number,
    serial_number,
    purchase_date,
  } = current;

  return <div className='container-fluid'>
    {brand} {appliance_type}
  </div>;
};

export default ApplianceDetail;
