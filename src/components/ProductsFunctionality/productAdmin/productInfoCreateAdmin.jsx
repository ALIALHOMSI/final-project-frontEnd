import React, { useState } from 'react';
import '../productAdmin/productInfoAdmin.css';
const CreateProductInfo = ({ productId, onClose }) => {
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [gender, setGender] = useState('male');
  const [type, setType] = useState('shirt');

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleCreateProductInfo = async () => {
    const response = await fetch('http://localhost:5000/api/productinfo/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        color,
        size,
        quantity: Number(quantity),
        price: Number(price),
        gender,
        type,
      }),
    });

    if (response.ok) {
      // Product info created successfully
      console.log('Product info created');
      // Clear input fields
      setColor('');
      setSize('');
      setQuantity('');
      setPrice('');
      setGender('male');
      setType('shirt');
      // Close the form
      onClose();
    } else {
      // Product info creation failed
      console.error('Failed to create product info');
    }
  };

  return (
    <div className="create-product-info-container">
      <h2>Create Product Info</h2>
      <div className="form-row">
        <label htmlFor="color">Color:</label>
        <input type="text" id="color" value={color} onChange={handleColorChange} />
      </div>
      <div className="form-row">
        <label htmlFor="size">Size:</label>
        <input type="text" id="size" value={size} onChange={handleSizeChange} />
      </div>
      <div className="form-row">
        <label htmlFor="quantity">Quantity:</label>
        <input type="text" id="quantity" value={quantity} onChange={handleQuantityChange} />
      </div>
      <div className="form-row">
        <label htmlFor="price">Price:</label>
        <input type="text" id="price" value={price} onChange={handlePriceChange} />
      </div>
      <div className="form-row">
        <label htmlFor="gender">Gender:</label>
        <select id="gender" value={gender} onChange={handleGenderChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unisex">Unisex</option>
        </select>
      </div>
      <div className="form-row">
        <label htmlFor="type">Type:</label>
        <select id="type" value={type} onChange={handleTypeChange}>
          <option value="shirt">Shirt</option>
          <option value="pants">Pants</option>
          <option value="shoes">Shoes</option>
        </select>
      </div>
      <div className="form-actions">
        <button onClick={handleCreateProductInfo}>Create</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateProductInfo;
