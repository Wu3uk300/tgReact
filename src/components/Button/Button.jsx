import React from "react";
import "../Button/Button.css";
const Button = (props) => {
  return <button className={`button` + props.className} {...props} />;
};

export default Button;
