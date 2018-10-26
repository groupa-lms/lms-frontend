import React from 'react';

const Checkbox = ({
    children,
  }) => (
    <div className="remember-me">
      <input className="checkbox" type="checkbox" />
      <span>{children}</span>
    </div>
  );

export default Checkbox;