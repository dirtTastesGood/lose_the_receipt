import React from "react";

const ApplianceDetailTabs = () => {
  return (
    <nav>
      <div className="nav nav-tabs justify-content-center" id="appliance-nav-tabs" role="tablist">
        <a
          href="#nav-general"
          className="nav-link active"
          id="nav-general-tab"
          data-toggle="appliance-tab"
          aria-selected="true"
        >
          General
        </a>
        <a
          href="#nav-accessories"
          className="nav-link active"
          id="nav-accessories-tab"
          data-toggle="appliance-tab"
          aria-selected="true"
        >
          Accessories
        </a>
        <a
          href="#nav-service"
          className="nav-link active"
          id="nav-service-tab"
          data-toggle="appliance-tab"
          aria-selected="true"
        >
          Service
        </a>
      </div>
    </nav>
  );
};

export default ApplianceDetailTabs;
