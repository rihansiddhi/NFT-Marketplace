import React from "react";
import "../../styles/helperComponents/loader.css";
import loader from '../../assets/img/bm-logo.png';

const Loader = () => {
  return (
    <div className="loading-dialog">
      <div className="container d-flex justify-content-center">
            <img src={loader} alt="Soundac Loading" className="spinner mx-auto img-fluid" />
      </div>
    </div>
  );
};

export default Loader;