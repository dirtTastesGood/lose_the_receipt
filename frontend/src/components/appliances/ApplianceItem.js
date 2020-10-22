import React from 'react';

const ApplianceItem = ({appliance}) => {
  return (
    <div className="col col-12 col-lg-6">
      {appliance.brand} {appliance.appliance_type}
    </div>
  );
};

export default ApplianceItem;
