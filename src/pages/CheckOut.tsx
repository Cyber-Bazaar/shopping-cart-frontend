import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { getCartItemsService } from "../services/getCartItemsService";
import { checkOutService } from "../services/checkOutService";
import { useAuth0 } from "@auth0/auth0-react";
import { setAuthToken } from "../config/axiosConfig";

type Item = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export const CheckOut: React.FC = () => {
  const { cartItems } = useShoppingCart();
  const [cartItemsInfo, setCartItemsInfo] = useState<Item[]>([]);
  const { getAccessTokenSilently } = useAuth0();
  const { clearCart } = useShoppingCart();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [address1Error, setAddress1Error] = useState("");
  const [address2Error, setAddress2Error] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");
  const [shippingMethodError, setShippingMethodError] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const ids = cartItems.map((item) => item.id);
      if (ids.length === 0) {
        setCartItemsInfo([]);
        return;
      }
      const items = await getCartItemsService(ids);

      const itemsWithQuantity = items.map((item) => {
        const cartItem = cartItems.find((ci) => ci.id === item.id);
        const quantity = cartItem ? cartItem.quantity : 0;
        return { ...item, quantity };
      });
      setCartItemsInfo(itemsWithQuantity);
    };

    fetchItems();
  }, [cartItems]);

  const checkout = async (orderData: any) => {
    const accessToken = await getAccessTokenSilently();
    await setAuthToken(accessToken);
    const message = await checkOutService(orderData, accessToken);

    if (message === "successfully inserted") {
      clearCart();
      alert("Order placed successfully");
      window.location.href = "/store";
    } else {
      alert("Failed to place order");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firstName.trim()) {
      setFirstNameError("Please enter your first name");
      return;
    } else {
      setFirstNameError("");
    }
    if (!lastName.trim()) {
      setLastNameError("Please enter your last name");
      return;
    } else {
      setLastNameError("");
    }
    if (!address1.trim()) {
      setAddress1Error("Please enter your address");
      return;
    } else {
      setAddress1Error("");
    }
    if (!zipCode.trim()) {
      setZipCodeError("Please enter your zip code");
      return;
    } else {
      setZipCodeError("");
    }
    if (!/^\d+$/.test(zipCode)) {
      setZipCodeError("Please enter a valid zip code");
      return;
    } else {
      setZipCodeError("");
    }
    if (!shippingMethod.trim()) {
      setShippingMethodError("Please select your shipping method");
      return;
    } else {
      setShippingMethodError("");
    }

    const orderData = {
      first_name: firstName,
      last_name: lastName,
      address_line1: address1,
      address_line2: address2,
      zip_code: Number(zipCode),
      shipping_method: shippingMethod,
      orderInfo: cartItemsInfo.map((item) => ({
        productId: item.id,
        unitPrice: item.price,
        quantity: item.quantity,
      })),
    };
    // console.log(JSON.stringify(orderData))
    checkout(orderData);
  };

  return (
    <div>
      <h1>CheckOut</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {firstNameError && (
            <div className="text-danger">{firstNameError}</div>
          )}
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {lastNameError && <div className="text-danger">{lastNameError}</div>}
        </Form.Group>

        <Form.Group controlId="address1">
          <Form.Label>Address Line 1</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address line 1"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
          />
          {address1Error && <div className="text-danger">{address1Error}</div>}
        </Form.Group>

        <Form.Group controlId="address2">
          <Form.Label>Address Line 2</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address line 2"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
          {address2Error && <div className="text-danger">{address2Error}</div>}
        </Form.Group>

        <Form.Group controlId="zipCode">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter zip code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
          {zipCodeError && <div className="text-danger">{zipCodeError}</div>}
        </Form.Group>

        <Form.Group controlId="shippingMethod">
          <Form.Label>Shipping Method</Form.Label>
          <Form.Control
            as="select"
            value={shippingMethod}
            onChange={(e) => setShippingMethod(e.target.value)}
          >
            <option value="">Select a shipping method</option>
            <option>Standard</option>
            <option>Express</option>
          </Form.Control>
          {shippingMethodError && (
            <div className="text-danger">{shippingMethodError}</div>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
