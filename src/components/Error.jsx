import React from "react";

function errorLogin({ message }) {
  return (<div className="alert alert-danger">{ message }</div>);
}

export default errorLogin;
