import React, { useContext, useEffect } from "react";

import ApplianceContext from "../../context/appliances/applianceContext";

import ApplianceDetailTabs from "./ApplianceDetailTabs";

import {
  GET_APPLIANCE_DETAIL_SUCCESS,
  GET_APPLIANCE_DETAIL_FAIL,
  SET_CURRENT_APPLIANCE,
} from "../../context/types";

const ApplianceDetail = (props) => {
  const applianceContext = useContext(ApplianceContext);

  const { getAppliance } = applianceContext;

  // const {
  //   brand,
  //   appliance_type,
  //   model_number,
  //   serial_number,
  //   purchase_date,
  // } = current;

  useEffect(() => {
    const {slug} = props.match.params
    getAppliance(slug)
  }, [props.match.params, getAppliance]);

  return (
    <div className="container-fluid">
      <ApplianceDetailTabs />
    </div>
  );
};

export default ApplianceDetail;
