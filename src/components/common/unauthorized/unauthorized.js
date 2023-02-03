import React from 'react';
import "./unauthorized.scss";

const Unauthorized = () => {
    return (
        <div className="unauthorized">
          <h2>Unauthorized Access</h2>
          <p>Your account does not have access to this page</p>
          <p>Please switch or login your account</p>
        </div>
      );
}

export default Unauthorized