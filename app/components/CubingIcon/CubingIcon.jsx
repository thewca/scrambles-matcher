import React from 'react';
import classnames from 'classnames';
import styled from '@emotion/styled';
import { unstable_styleFunctionSx } from '@mui/system';

const Span = styled('span')(unstable_styleFunctionSx);

export const CubingIcon = ({ eventId, ...props }) => (
  <Span
    style={{ fontSize: 24 }}
    className={`cubing-icon event-${eventId}`}
    {...props}
  />
);

export const CubingIconUnofficial = ({ eventId, className, ...props }) => (
  <Span
    style={{ fontSize: 24 }}
    className={classnames('cubing-icon', `unofficial-${eventId}`, className)}
    {...props}
  />
);
