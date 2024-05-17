import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { getStoreItemsService } from "../services/getStoreItemsService";
import { PaginationBar } from "../components/PaginationBar";

interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
}

export const Store: React.FC = () => {
  const [itemList, setItemList] = useState<Item[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [last_page, setLastPage] = useState<number>(1);

  const getStoreItems = async () => {
    try {
      const data = await getStoreItemsService(pageNo);
      setItemList(data.data);
      setPageNo(data.page);
      setLastPage(data.last_page);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStoreItems();
  }, [pageNo]);

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
      <PaginationBar totalPages={last_page} currentPage={pageNo} onPageChange={setPageNo}  /> {/* Add the PaginationBar component */}
    </>
  );
};