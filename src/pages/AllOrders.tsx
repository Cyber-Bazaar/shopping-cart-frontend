import React, { useEffect, useState } from "react";
import { Container, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { setAuthToken } from "../config/axiosConfig";
import { getAllOrdersService } from "../services/getAllOrdersService";

type Product = {
  productId: number;
  name: string;
  quantity: number;
  price: string;
  image: string;
};

type Order = {
  id: number;
  sub: string;
  createdAt: string;
  first_name: string;
  last_name: string;
  address_line1: string;
  address_line2: string;
  zip_code: string;
  shipping_method: string;
  orderInfo: Product[];
};

type Orders = Order[];

export const AllOrders: React.FC = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [orders, setOrders] = useState<Orders>([]);

  const getAllOrderHistory = async () => {
    const accessToken = await getAccessTokenSilently();
    await setAuthToken(accessToken);
    const response = await getAllOrdersService(accessToken);
    setOrders(response.data);
  };
  useEffect(() => {
    getAllOrderHistory();
  }, []);

  return (
    <Container>
      <h1 className="my-4">All Orders</h1>
      {orders.map((order) => (
        <Card className="mb-4" key={order.id}>
          <Card.Header as="h5">
            {order.first_name} {order.last_name}
          </Card.Header>
          <Card.Body>
            <Card.Title>
              Placed on: {new Date(order.createdAt).toLocaleDateString()}
            </Card.Title>
            <Card.Text>
              {order.address_line1}, {order.address_line2}, {order.zip_code}
            </Card.Text>
            <ListGroup className="mb-3">
              {order.orderInfo.map((product) => (
                <ListGroupItem key={product.productId}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "50px" }}
                  />
                  <p>{product.name}</p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Unit Price: {product.price}</p>
                </ListGroupItem>
              ))}
            </ListGroup>
            <Card.Text>
              Total:{" "}
              {order.orderInfo
                .reduce(
                  (total, product) =>
                    total + product.quantity * parseFloat(product.price),
                  0
                )
                .toFixed(2)}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};
