import React from 'react';
import classnames from 'classnames';

export const CubingIcon = ({ eventId, ...props }) => (
  <span
    style={{ fontSize: 24 }}
    className={`cubing-icon event-${eventId}`}
    {...props}
  />
);

export const CubingIconUnofficial = ({ eventId, className, ...props }) => (
  <span
    style={{ fontSize: 24 }}
    className={classnames('cubing-icon', `unofficial-${eventId}`, className)}
    {...props}
  />
);
