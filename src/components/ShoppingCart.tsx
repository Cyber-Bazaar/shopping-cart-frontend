import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import { useEffect, useState } from "react";
import { getCartItemsService } from "../services/getCartItems";

type ShoppingCartProps = {
  cartOpen: boolean;
};

type Item = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export function ShoppingCart({cartOpen}: ShoppingCartProps) {
  
  const {closeCart, cartItems} = useShoppingCart();
  const [cartItemsInfo, setCartItemsInfo] =useState<Item[]>([]);

  useEffect(() => {
    
    const fetchItems = async () => {
      const ids = cartItems.map(item => item.id);
      if (ids.length === 0) {
        setCartItemsInfo([]);
        return;
      }
      const items = await getCartItemsService(ids); 
      
      const itemsWithQuantity = items.map(item => {
        const cartItem = cartItems.find(ci => ci.id === item.id);
        const quantity = cartItem ? cartItem.quantity : 0;
        return { ...item, quantity };
      });
    setCartItemsInfo(itemsWithQuantity);
    };

    fetchItems();
  }, [cartItems]);

  return (
    <Offcanvas show={cartOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      {/* cart's body */}
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItemsInfo.length > 0 && cartItemsInfo.map(item => (
            <CartItem key={item.id} {...item} />))}
            {cartItemsInfo.length === 0 && <div>Your cart is empty</div>}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = cartItemsInfo.find(i => i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)
            )}

          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
