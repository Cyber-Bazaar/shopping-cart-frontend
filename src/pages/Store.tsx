import React from "react";
import storeItem from "../data/items.json"
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
// import { PageLayout } from "../components/page-layout";

export const Store: React.FC = () => {
  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">{storeItem.map(item=>( <Col key={item.id}>
            <StoreItem {...item} />
          </Col>))}
      </Row>
    </>
  )
};