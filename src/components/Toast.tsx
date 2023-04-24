import React from "react";
import "./Toast.css";

const Toast = ({ show, message }: any) => {
  return <div className={`toast ${show ? "show" : ""}`}>{message}</div>;
};

export default Toast;
