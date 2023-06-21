import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../ProductsFunctionality/products.css"; // Import external CSS file
import productBanner from '../../assets/product_banner1.jpg';
import swal from "sweetalert";
function ProductList() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState("all");
  const navigate = useNavigate();
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});

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
      setCurrentImageIndexes(
        products.reduce((indexes, product) => {
          return { ...indexes, [product.id]: 0 };
        }, {})
      );
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
          cartItemQuantity: product.cartItemQuantity,
          price: product.price,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );
  
      // Product added successfully, show the success message
      swal({
        title: "Added successfully",
        icon: "success",
      });
  
      console.log(res.data); 
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
    setSelectedGender("all"); 
  };

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleImageNavigation = (productId, direction) => {
    setCurrentImageIndexes((prevIndexes) => {
      const currentIndex = prevIndexes[productId];
      const imageCount = products.find((product) => product.id === productId)?.images.length;
      if (imageCount) {
        let newIndex = currentIndex + direction;
        if (newIndex < 0) {
          newIndex = imageCount - 1;
        } else if (newIndex >= imageCount) {
          newIndex = 0;
        }
        return { ...prevIndexes, [productId]: newIndex };
      }
      return prevIndexes;
    });
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
    return (
      <div class="center">
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
                {product.images[currentImageIndexes[product.id]] && (
                  <img
                    className="product-image"
                    src={product.images[currentImageIndexes[product.id]]}
                    alt={product.name}
                    onLoad={() => {}}
                  />
                )}

                <div className="card-info">
                  <div className="navigation-buttons">
                    <button
                      onClick={() =>
                        handleImageNavigation(product.id, -1)
                      }
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        handleImageNavigation(product.id, 1)
                      }
                    >
                      Next
                    </button>
                  </div>

                  <div className="product-details">
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <p>{product.color}</p>
                    <p>{product.size}</p>
                    <p>{product.gender}</p>
                    <p>{product.quantity}</p>
                    <h4>${product.price}</h4>
                  </div>

                  <div className="cart-quantity">
                    <label htmlFor="quantity-input">Quantity:</label>
                    
                    <input
                      id="quantity-input"
                      type="number"
                      min="1"
                      max={product.quantity}
                      value={product.cartItemQuantity}
                      onChange={(e) =>
                        handleQuantityChange(product.id, parseInt(e.target.value))
                      }
                      
                    />
                  </div>
                </div>
                  <button
                    className="add-to-cart-button"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductList;
