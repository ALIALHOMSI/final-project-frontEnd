import React, { useState, useEffect } from 'react';
import CreateProductInfo from './productInfoCreateAdmin.jsx';
import '../productAdmin/admin.css'


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showCreateProductInfo, setShowCreateProductInfo] = useState(false);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:5000/api/product/getAll');
    if (response.ok) {
      const data = await response.json();
      setProducts(data);
    } else {
      console.error('Failed to fetch products');
    }
  };

  const handleAddProductInfo = (productId) => {
    setSelectedProductId(productId);
    setShowCreateProductInfo(true);
  };

  const handleCloseCreateProductInfo = () => {
    setShowCreateProductInfo(false);
  };

  const handleCreateProduct = async () => {
    const response = await fetch('http://localhost:5000/api/product/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: productName, description: productDescription }),
    });

    if (response.ok) {
      console.log('Product created');
      fetchProducts();
      setProductName('');
      setProductDescription('');
    } else {
      console.error('Failed to create product');
    }
  };

  return (
    <div className="product-list-container">
      <h2>All Products</h2>
      <div className="create-product-form">
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <label htmlFor="productDescription">Product Description:</label>
        <textarea
          id="productDescription"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <button onClick={handleCreateProduct}>Create Product</button>
      </div>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product._id}>
            <div className="product-info">
              <strong>{product.name}</strong>: {product.description}
            </div>
            <button
              className="add-product-info-button"
              onClick={() => handleAddProductInfo(product._id)}
            >
              Add Info
            </button>
          </li>
        ))}
      </ul>
      {showCreateProductInfo && (
        <CreateProductInfo productId={selectedProductId} onClose={handleCloseCreateProductInfo} />
      )}
    </div>
  );
};

export default ProductList;
