import { useState, useEffect } from "react";
import axios from "axios";



function ProductShoes() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState("all");

  const fetchProducts = async () => {
    setLoading(true);

    const productInfoRes = await axios.get("http://localhost:5000/api/productinfo/getAll");
    const productRes = await axios.get("http://localhost:5000/api/product/getAll");
    const productImageRes = await axios.get("http://localhost:5000/api/productimage/getAll");

    const products = productInfoRes.data
      .filter((productInfo) => productInfo.type === "shoes") // Filter products by type
      .map((productInfo) => {
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
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
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
    return <p>Loading...</p>;
  }

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name, size, color, type, or gender"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="gender-filter">
        <label htmlFor="gender-select">Gender:</label>
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
      
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id} className="product-item">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div className="product-images">
              {product.images.map((imageUrl, idx) => (
                <img key={idx} src={imageUrl} alt={product.name} />
              ))}
            </div>
            <p>{product.color}</p>
            <p>{product.size}</p>
            <p>{product.price}</p>
            <p>{product.gender}</p>
            <p>{product.type}</p>
            <p>{product.quantity}</p>
            <label>Quantity:</label>
            <input
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
  );
}

export default ProductShoes;
