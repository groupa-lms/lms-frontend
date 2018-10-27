import React from 'react';

const Section = ({
    title,
    children,
  }) => (
    <div>
      <h2>{title}</h2>
      <React.Fragment>{children}</React.Fragment>
    </div>
  );

export default Section;