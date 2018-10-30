import React from "react";

const Menu = ({ children, link, active,icon }) => (
  <a className={`menu ${active && "active"}`} href={link}>
    <i className="material-icons md-light">{icon}</i>
    {children}
  </a>
);

export default Menu;
