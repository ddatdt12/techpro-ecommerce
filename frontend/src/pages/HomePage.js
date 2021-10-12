import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/products/Product';
// import products from '../products';

import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/UI/Loader';
import Message from '../components/UI/Message';
import SearchBox from '../components/SearchBox';
import UIPagination from '../components/UIPagination';

const HomeScreen = ({ location }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  useEffect(() => {
    dispatch(listProducts(location.search));
  }, [dispatch, location?.search]);
  let body;
  if (loading) body = <Loader />;
  else if (error) {
    body = <Message variant='danger' text={error} />;
  } else {
    body = (
      <>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <UIPagination page={1} pagesTotal={1} />
      </>
    );
  }
  return (
    <>
      <h1>Latest Products </h1>
      <SearchBox />
      {body}
    </>
  );
};

export default HomeScreen;
