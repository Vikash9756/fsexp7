import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";

import { Button, TextField } from "@mui/material";

function Cart() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Cart</h3>

      {items.length === 0 && <p>Cart is empty</p>}

      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: "10px" }}>
          <span>{item.name} - ₹{item.price}</span>

          <TextField
            type="number"
            size="small"
            value={item.quantity}
            onChange={(e) =>
              dispatch(updateQuantity({
                id: item.id,
                quantity: Number(e.target.value)
              }))
            }
            style={{ width: "60px", margin: "0 10px" }}
          />

          <Button
            variant="outlined"
            color="error"
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}

export default Cart;