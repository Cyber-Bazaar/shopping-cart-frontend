import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { getStoreItemsService } from "../services/getStoreItems";

interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
}

export const Store: React.FC = () => {
  const [itemList, setItemList] = useState<Item[]>([]);

  const getStoreItems = async () => {
    try {
      const data = await getStoreItemsService();
      setItemList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStoreItems();
  }, []);

  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {itemList.map((item:Item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
};