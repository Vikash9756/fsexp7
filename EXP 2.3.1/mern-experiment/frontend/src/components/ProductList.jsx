import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setError('');
      } catch (err) {
        setError('Error fetching products from server. Please make sure the backend is running and the database is connected.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
          {products.length === 0 && (
            <div className="col-12 text-center text-muted">
              <p>No products available. Database might need seeding.</p>
              <button 
                className="btn btn-outline-primary mt-2 shadow-sm" 
                onClick={async () => {
                    setLoading(true);
                    try {
                        await axios.post('http://localhost:5000/api/seed');
                        const res = await axios.get('http://localhost:5000/api/products');
                        setProducts(res.data);
                        setError('');
                    } catch(err) {
                        setError('Failed to seed database.');
                    }
                    setLoading(false);
                }}>
                Seed Database
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
