import React from 'react';

const withClass = (WrappedComponent, className) => {
  return props => (
    <div className = {className}>
    <WrappedComponent {...props} />
    {props.children}
    </div>
  )

}

export default withClass;
