import React from "react";
import reactDom from "react-dom";

const ModalPortal = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const el = document.getElementById("modal");
  if (!el)
    return reactDom.createPortal(children, document.createElement("div"));

  return reactDom.createPortal(children, el);
};

export default ModalPortal;
