import React from 'react';
import { Pagination } from 'react-bootstrap';

const UIPagination = ({ pagesTotal, page }) => {
  return (
    <Pagination>
      {[...Array(pagesTotal)].map((elementInArray, index) => (
        <Pagination.Item active={page === index + 1}>{index + 1}</Pagination.Item>
      ))}
    </Pagination>
  );
};

export default UIPagination;
