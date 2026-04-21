import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

import { Card, CardContent, Button, Typography } from "@mui/material";

const products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Phone", price: 20000 },
  { id: 3, name: "Headphones", price: 3000 }
];

function ProductList() {
  const dispatch = useDispatch();

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {products.map((p) => (
        <Card key={p.id} style={{ width: "200px" }}>
          <CardContent>
            <Typography>{p.name}</Typography>
            <Typography>₹{p.price}</Typography>
            <Button
              variant="contained"
              onClick={() => dispatch(addToCart(p))}
            >
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ProductList;