import React from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Redux Shopping Cart</h2>
      <ProductList />
      <hr />
      <Cart />
    </div>
  );
}

export default App;