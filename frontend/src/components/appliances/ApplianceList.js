import React, { Fragment, useContext, useState } from "react";

import ApplianceItem from "./ApplianceItem";
import ApplianceForm from "./ApplianceForm";
import Spinner from "../layout/Spinner";

import ApplianceContext from "../../context/appliances/applianceContext";

const ApplianceList = ({ appliances }) => {
  const applianceContext = useContext(ApplianceContext);

  const { loading } = applianceContext;
  
  const [state,setState] = useState({
    showForm: false
  })

  const toggleForm = () => setState({showForm:!state.showForm})

  return (
    <div className="container-fluid text-center">
      {loading ? (
        <div className="justify-self-center">
          <Spinner />
        </div>
      ) : appliances && appliances.length > 0 ? (
        <Fragment>
          <h1 className="text-center text-lg-left">
            <button
              className="btn btn-sm bg-warning mx-3"
              data-toggle="tooltip"
              data-toggle="collapse"
              data-target="#form-collapse"
              data-placement="right"
              title="add appliance"
              onClick={toggleForm}
            >
              <span
                className="text-bold"
                aria-label="add appliance"
                alt="add appliance"
              >
                {state.showForm ? "- close" : "+ new"}
              </span>
            </button>
          </h1>

          <div className="collapse py-5" id="form-collapse">
            <ApplianceForm/>
          </div>

          <div className="row">
            {appliances.map((appliance, i) => (
              <ApplianceItem appliance={appliance} key={i} />
            ))}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h3 className="text-center text-lg-left">No appliances found</h3>
          <h5 className="text-center text-lg-left">
            Add an appliance to get started
          </h5>
        </Fragment>
      )}
    </div>
  );
};

export default ApplianceList;
