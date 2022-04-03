import React, { ReactElement } from 'react';
import Logo from '../../assets/Images/logo.png';

function Loader(): ReactElement {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ maxHeight: '100px' }}
    >
      <img className="p-4" src={Logo} style={{ maxWidth: '8rem' }}></img>
      <div className="spinner-border text-warning" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
}

export default React.memo(Loader);
