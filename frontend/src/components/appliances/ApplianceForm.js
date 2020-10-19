import React, { useContext, useState } from "react";

import ApplianceContext from "../../context/appliances/applianceContext";

const ApplianceForm = () => {
  const [appliance, setAppliance] = useState({
    brand: "",
    name: "",
    model: "",
    serial: "",
    datePurchased: "",
    lastServiced: "",
    // manualUrl:'',
  });

  const applianceContext = useContext(ApplianceContext);
  const { addAppliance } = applianceContext;

  const onChange = (e) =>
    setAppliance({ ...appliance, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    addAppliance(appliance);

    // setAppliance({
    //   brand: "",
    //   name: "",
    //   model: "",
    //   serial: "",
    //   datePurchased: "",
    //   lastServiced: "",
    //   // manualUrl:'',
    // })
  };
  return (
    <div>
      <button onClick={onSubmit}></button>
    </div>
  );
};

export default ApplianceForm;
