import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { getStoreItemsService } from "../services/getStoreItemsService";
import { PaginationBar } from "../components/PaginationBar";
import { getCategoriesService } from "../services/getCategoriesService";
import { CategoryBar } from "../components/CategoryBar";
import { getStoreItemsByCategoryService } from "../services/getStoreItemsByCategoryService";

interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface Category {
  id: number;
  name: string;
}

export const Store: React.FC = () => {
  const [itemList, setItemList] = useState<Item[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [last_page, setLastPage] = useState<number>(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  useEffect(() => {
    const getStoreItems = async () => {
      try {
        if (selectedCategory === 0) {
          const data = await getStoreItemsService(pageNo);
          setItemList(data.data);
          setPageNo(data.page);
          setLastPage(data.last_page);
        } else {
          const data = await getStoreItemsByCategoryService(selectedCategory);
          setItemList(data);
          setPageNo(1);
          setLastPage(1);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getCategories = async () => {
      try {
        const data = await getCategoriesService();
        const categories = data.map((item) => ({
          id: item.id,
          name: item.name,
        }));
        setCategories(categories);
      } catch (error) {
        console.log(error);
      }
    };
    getStoreItems();
    getCategories();
  }, [pageNo, selectedCategory]);

  return (
    <>
      <h1>Store</h1>
      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Row md={2} xs={1} lg={3} className="g-3">
        {itemList.map((item: Item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
      <PaginationBar
        totalPages={last_page}
        currentPage={pageNo}
        onPageChange={setPageNo}
      />
    </>
  );
};
