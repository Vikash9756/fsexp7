import React, { useState } from 'react';

const STATIC_PRODUCTS = [
  { _id: '1', name: 'Wireless Headphones', price: 99, description: 'High quality audio.', imageUrl: 'https://via.placeholder.com/150' },
  { _id: '2', name: 'Mechanical Keyboard', price: 120, description: 'Clicky switches.', imageUrl: 'https://via.placeholder.com/150' },
  { _id: '3', name: 'Gaming Mouse', price: 50, description: 'RGB lighting.', imageUrl: 'https://via.placeholder.com/150' },
];

const ProductList = () => {
  const [products] = useState(STATIC_PRODUCTS);
  const loading = false;
  const error = '';

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Featured Products</h2>
      
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {loading && (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="row g-4">
          {products.map((product) => (
            <div key={product._id || product.name} className="col-md-4">
              <div className="card h-100 shadow-sm border-0 rounded-3">
                <img src={product.imageUrl} className="card-img-top" alt={product.name} style={{ objectFit: 'cover', height: '220px', borderTopLeftRadius: '.3rem', borderTopRightRadius: '.3rem' }} />
                <div className="card-body">
                  <h5 className="card-title fw-semibold">{product.name}</h5>
                  <p className="card-text text-muted">{product.description}</p>
                </div>
                <div className="card-footer bg-white border-top-0 pb-3">
                  <span className="fs-5 fw-bold text-success">${product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
