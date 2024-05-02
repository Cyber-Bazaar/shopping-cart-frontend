// Displaying items of the cart
import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};
export const CartItem:React.FC<CartItemProps> =({ id,name,price,image,quantity })=> {
  const { removeFromCart } = useShoppingCart();
  
  return (
    <Stack direction="horizontal" gap={2}>
      <img
        src={image}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        {/* Name and quantity section */}
        <div>
          {name}{" "}
          {/* If quantity is > 1 only display "x"*/}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        {/* Price of single item*/}
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(price)}
        </div>
      </div>
      {/* Price of item x quantity */}
      <div> {formatCurrency(price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(id)}
      >
        &times;
        {/* "&times" is an HTML entity used to display the multiplication sign*/}
      </Button>
    </Stack>
  );
}
