import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetailsService } from "../services/getProductDetailsService";import { formatCurrency } from "../utilities/formatCurrency";
import { Row, Col, Image, Card,Button } from 'react-bootstrap';
import { useShoppingCart } from "../context/ShoppingCartContext";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export const Product: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const {productId} = useParams();
  const productIdNumber = Number(productId);
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(productIdNumber)

useEffect(() => {
  const fetchProductDetails = async () => {
    const response = await getProductDetailsService(productIdNumber);
    setProduct(response);
  };

  fetchProductDetails();
}, []);

console.log(product);
return (
  <Row>
    <Col xs={6}>
      <Image src={product?.image} alt={product?.name} fluid />
    </Col>
    <Col xs={6}>
      <Card>
        <Card.Body>
          <Card.Title>{product?.name}</Card.Title>
          <Card.Text>
            Price: {product?.price}
          </Card.Text>
          <div className="mt-auto">
            {quantity === 0 ? (
              <Button
                variant="primary"
                className="w-100"
                onClick={() => {
                  increaseCartQuantity(productIdNumber);
                }}
              >
                + Add to Cart
              </Button>
            ) : (
              <div
                className="d-flex align-items-center flex-column"
                style={{ gap: ".5rem" }}
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ gap: ".5rem" }}
                >
                  <Button variant="outline-secondary" onClick={() => decreaseCartQuantity(productIdNumber)}>-</Button>
                  <div className="d-flex align-items-center">
                    <span className="fs-3">{quantity}</span>
                    <span className="ms-2">in cart</span>
                  </div>
                  <Button variant="outline-secondary" onClick={() => increaseCartQuantity(productIdNumber)}>
                    +
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  </Row>
);
}




//Price: {formatCurrency(product?.price ?? 0)}