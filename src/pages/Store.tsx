import React, { useEffect, useState } from "react";
import storeItem from "../data/items.json"
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { getStoreItems } from "../services/getStoreItems";
// import { PageLayout } from "../components/page-layout";

export const Store: React.FC = () => {
  const [todoList, setTodoList] = useState();
  const getTodoList = async () => {
    try {
      const data = await getStoreItems();
      setTodoList(data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTodoList();
  }, []);
  console.log(todoList)
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