import React from 'react';

const Menu = ({
    children,
    link,
    active
  }) => (
    <a className={`menu ${active && 'active'}`} href={link}>{children}</a>
  );

  export default Menu;