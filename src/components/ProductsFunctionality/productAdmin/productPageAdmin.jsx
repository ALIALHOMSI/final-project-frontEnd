import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import productBanner from '../../../assets/product_banner1.jpg';

function ProductListAdmin() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState('all');
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const productInfoRes = await axios.get('http://localhost:5000/api/productinfo/getAll');
      const productRes = await axios.get('http://localhost:5000/api/product/getAll');
      const productImageRes = await axios.get('http://localhost:5000/api/productimage/getAll');

      const products = productInfoRes.data.map((productInfo) => {
        const product = productRes.data.find((p) => p._id === productInfo.productId);
        const productImages = productImageRes.data.filter((p) => p.productInfoId === productInfo._id);
        return {
          id: productInfo._id,
          name: product.name,
          description: product.description,
          images: productImages.map((pi) => pi.imageUrl),
          color: productInfo.color,
          size: productInfo.size,
          price: productInfo.price,
          gender: productInfo.gender,
          type: productInfo.type,
          quantity: productInfo.quantity,
          cartItemQuantity: 1,
        };
      });

      setProducts(products);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      // Check if the user is logged in
      const token = sessionStorage.getItem('token');
      if (!token) {
        // User is not logged in, redirect to the login page
        navigate('/login');
        return;
      }

      // The user is logged in, proceed with adding the product to the cart
      const productImageRes = await axios.get(
        `http://localhost:5000/api/productimage/getAll?productInfoId=${product.id}`
      );
      const productImageId = productImageRes.data[0]._id;

      const res = await axios.post(
        'http://localhost:5000/api/cart/create',
        {
          userId: 123, // Replace with actual user ID
          productInfoId: product.id,
          productImageId: productImageId,
          cartItemQuantity: product.cartItemQuantity, // Make sure this is correct
          price: product.price,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      console.log(res.data); // Replace with actual handling of response data
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            cartItemQuantity: newQuantity,
          };
        }
        return product;
      });
      return updatedProducts;
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setSelectedGender('all'); // Reset selected gender when performing a search
  };

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleAddImage = async (product) => {
    try {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';

      fileInput.onchange = async (event) => {
        const file = event.target.files[0];
        if (file) {
          const formData = new FormData();
          formData.append('image', file);
          formData.append('productInfoId', product.id);

          const res = await axios.post('http://localhost:5000/api/productimage/create', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(res.data); // Replace with actual handling of response data
          fetchProducts(); // Fetch the updated product list after adding the image
        }
      };

      fileInput.click();
    } catch (err) {
      console.error(err);
    }
  };
  const handleDeleteImage = async (productId, imageId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/productimage/delete/${imageId}`
      );
      console.log(res.data); // Replace with actual handling of response data

      // Fetch updated product list after deleting the image
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const { name, size, color, type, gender } = product;
    const searchLowerCase = searchQuery.toLowerCase();

    const isGenderMatch = selectedGender === 'all' || (gender && selectedGender === gender.toLowerCase());

    return (
      ((name && name.toLowerCase().includes(searchLowerCase)) ||
        (size && size.toLowerCase().includes(searchLowerCase)) ||
        (color && color.toLowerCase().includes(searchLowerCase)) ||
        (type && type.toLowerCase().includes(searchLowerCase))) &&
      isGenderMatch
    );
  });

  if (loading) {
    return (
      <div className="center">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    );
  }

  return (
    <div className="product-list">
      <div className="product-banner">
        <img className="banner" src={productBanner} alt="banner" />
        <h1 className="banner-text">Product List</h1>
      </div>

      <div className="search-container">
        <input
          className="search-bar"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <select id="gender-select" value={selectedGender} onChange={handleGenderChange}>
          <option value="all">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unisex">Unisex</option>
        </select>
      </div>

      <div className="products-div">
        <ul className="product-cards">
          {filteredProducts.map((product) => (
            <li key={product.id} className="product-item">
              <div className="product-images">
                <div className="image-container">
                  <img className="product-image" src={product.images[currentImageIndex]} alt={product.name} />
                  <button
                    className="delete-image-button"
                    onClick={() =>
                      handleDeleteImage(
                        product.id,
                        product.images[currentImageIndex]._id
                      )
                    }
                  >
                    Delete Image
                  </button>
                </div>
                <div className="navigation-buttons">
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length)
                    }
                    disabled={currentImageIndex === 0}
                  >
                    Previous Image
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length)
                    }
                    disabled={currentImageIndex === product.images.length - 1}
                  >
                    Next Image
                  </button>
                </div>
              </div>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>{product.color}</p>
              <p>{product.size}</p>
              <p>{product.price}</p>
              <p>{product.gender}</p>
              <p>{product.type}</p>
              <p>{product.quantity} Items in Stock</p>
              <input
                className="quantity-input"
                type="number"
                value={product.cartItemQuantity}
                onChange={(e) =>
                  handleQuantityChange(product.id, parseInt(e.target.value))
                }
                min={1}
              />
              <button onClick={() => handleAddToCart(product)}>
                Add to cart
              </button>
              <button onClick={() => handleAddImage(product)}>
                Add Image
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductListAdmin;

