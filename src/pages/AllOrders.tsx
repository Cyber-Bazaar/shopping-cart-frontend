import React, { useEffect, useState } from "react";
import { Container, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { setAuthToken } from "../config/axiosConfig";
import { getAllOrdersService } from "../services/getAllOrdersService";

export const AllOrders: React.FC = () => {
//   const { getAccessTokenSilently } = useAuth0();
//   const [orderList, setOrderList] = useState<any>([]);

//   const getAllOrderHistory= async () => {
//     const accessToken = await getAccessTokenSilently();
//     await setAuthToken(accessToken);
//     const response = await getAllOrdersService(accessToken);
//     setOrderList(response.data.data);
  
//   }


//   useEffect(() => {
//     getAllOrderHistory();
//   }, []);
// console.log(orderList);
  const response = {
    "message": "success",
  "data": {
    "message": "success",
    "data": [
      {
        "id": 67,
        "sub": "auth0|65f9a317a9f6e269742059db",
        "createdAt": "2024-05-06T16:22:06.000Z",
        "first_name": "Rumindu",
        "last_name": "De Silva",
        "address_line1": "No 25, School lane,",
        "address_line2": "Colombo 03",
        "zip_code": "8080",
        "shipping_method": "Standard",
        "orderInfo": [
          {
            "productId": 2,
            "name": "Computer",
            "quantity": 1,
            "price": "30000.00",
            "image": "/imgs/computer.jpg"
          },
          {
            "productId": 3,
            "name": "Banana",
            "quantity": 1,
            "price": "200.00",
            "image": "/imgs/banana.jpg"
          }
        ]
      },
      {
        "id": 68,
        "sub": "auth0|65f9a317a9f6e269742059db",
        "createdAt": "2024-05-06T16:53:43.000Z",
        "first_name": "Kavishka",
        "last_name": "Wijeratrhna",
        "address_line1": "No23,",
        "address_line2": "Main street, Ambalangoda",
        "zip_code": "8083",
        "shipping_method": "Standard",
        "orderInfo": [
          {
            "productId": 1,
            "name": "Book",
            "quantity": 3,
            "price": "100.00",
            "image": "/imgs/book.jpg"
          },
          {
            "productId": 2,
            "name": "Computer",
            "quantity": 1,
            "price": "30000.00",
            "image": "/imgs/computer.jpg"
          },
          {
            "productId": 3,
            "name": "Banana",
            "quantity": 1,
            "price": "200.00",
            "image": "/imgs/banana.jpg"
          }
        ]
      }
    ]
  }
}

  const orders = response.data.data;

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
