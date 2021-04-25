import React from 'react';

interface Props {
  children: React.ReactNode
}

const ResponsiveLayout: React.FC<Props> = ({
  children
}) => (
  <div className='responsive-layout'>
    {children}
  </div>
);


export default ResponsiveLayout;
