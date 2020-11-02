import React, { Fragment, useContext, useEffect, useState } from "react";
import "../scss/applianceDetail.scss";

import ApplianceContext from "../../../context/appliances/applianceContext";

import Spinner from "../../layout/Spinner";

import GeneralSection from "./GeneralSection";
import AccessoriesSection from "./AccessoriesSection";
import ServiceSection from "./ServiceSection";

import {
  GET_APPLIANCE_DETAIL_SUCCESS,
  GET_APPLIANCE_DETAIL_FAIL,
  SET_CURRENT_APPLIANCE,
} from "../../../context/types";

const ApplianceDetail = ({ match }) => {
  const applianceContext = useContext(ApplianceContext);

  const { getAppliance, current } = applianceContext;

  const [activeTab, setActiveTab] = useState("general");
  const tabTitles = ["general", "accessories", "service"];

  const changeTab = (e) => setActiveTab(e.target.id);

  useEffect(() => {
    const { slug } = match.params;
    getAppliance(slug);
  }, []);

  const getActiveSection = () => {
    switch (activeTab) {
      default:
      case "general":
        return <GeneralSection />;
      case "accessories":
        return <AccessoriesSection />;
      case "service":
        return <ServiceSection />;
    }
  };

  return (
    <div className="container-fluid" id="appliance-detail">
      {!current ? (
        <div className="row mt-5">
          <div className="col col-6 offset-3 text-center">
            <Spinner />
          </div>
        </div>
      ) : (
        <Fragment>
          {/* Appliance Section Tabs */}
          <ul className="appliance-tabs d-flex justify-content-center p-0 mb-5">
            {tabTitles.map((tabTitle, key) => (
              <li
                className={
                  "appliance-tab align-items-center px-3 " +
                  (activeTab === tabTitle ? "active" : "")
                }
                id={tabTitle}
                key={key}
                onClick={changeTab}
              >
                {tabTitle[0].toUpperCase() + tabTitle.substr(1)}
              </li>
            ))}
          </ul>
          {getActiveSection()}
        </Fragment>
      )}
    </div>
  );
};

export default ApplianceDetail;
