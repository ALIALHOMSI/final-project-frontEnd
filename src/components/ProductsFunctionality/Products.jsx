import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../ProductsFunctionality/products.css"; // Import external CSS file
import productBanner from '../../assets/product_banner1.jpg';
function ProductList() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState("all");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const productInfoRes = await axios.get("http://localhost:5000/api/productinfo/getAll");
      const productRes = await axios.get("http://localhost:5000/api/product/getAll");
      const productImageRes = await axios.get("http://localhost:5000/api/productimage/getAll");

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
      const token = sessionStorage.getItem("token");
      if (!token) {
        // User is not logged in, redirect to the login page
        navigate("/login");
        return;
      }

      // The user is logged in, proceed with adding the product to the cart
      const productImageRes = await axios.get(
        `http://localhost:5000/api/productimage/getAll?productInfoId=${product.id}`
      );
      const productImageId = productImageRes.data[0]._id;

      const res = await axios.post(
        "http://localhost:5000/api/cart/create",
        {
          userId: 123, // Replace with actual user ID
          productInfoId: product.id,
          productImageId: productImageId,
          cartItemQuantity: product.cartItemQuantity, // Make sure this is correct
          price: product.price,
        },
        {
          headers: {
            "Content-Type": "application/json",
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
    setSelectedGender("all"); // Reset selected gender when performing a search
  };

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const { name, size, color, type, gender } = product;
    const searchLowerCase = searchQuery.toLowerCase();

    const isGenderMatch =
      selectedGender === "all" ||
      (gender && selectedGender === gender.toLowerCase());

    return (
      ((name && name.toLowerCase().includes(searchLowerCase)) ||
        (size && size.toLowerCase().includes(searchLowerCase)) ||
        (color && color.toLowerCase().includes(searchLowerCase)) ||
        (type && type.toLowerCase().includes(searchLowerCase))) &&
      isGenderMatch
    );
  });

  if (loading) {
    return <div class="center">
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
  </div>;
  }
  

  return (
    
    <div className="product-list">
      <div className="product-banner">
        <img className="banner" src={productBanner} alt="banner">
          
        </img>
        <h1 className="banner-text">Product List</h1>
        </div>
      
      <div className="search-container">
        <input className="search-bar"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
          <select
          id="gender-select"
          value={selectedGender}
          onChange={handleGenderChange}
        >
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
  <div className="scroll-container">
    {product.images.map((imageUrl, idx) => (
      <div className="image-container" key={idx}>
        <img className="product-image" src={imageUrl} alt={product.name} />
      </div>
    ))}
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
          
            <input className="quantity-input"
              type="number"
              value={product.cartItemQuantity}
              onChange={(e) =>
                handleQuantityChange(product.id, parseInt(e.target.value))
              }
              min={1}
            />
            <button onClick={() => handleAddToCart(product)}>Add to cart</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default ProductList;
