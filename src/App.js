import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function SmartShopAI() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [priceTrends, setPriceTrends] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products"); // Check this URL
      console.log("Fetched Products Data:", response.data); // Debugging log
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };  

  const fetchPriceTrends = async () => {
    try {
      setPriceTrends({
        "Wireless Headphones": [79.99, 74.99, 69.99],
        "Smart Watch": [149.99, 139.99, 129.99],
        "Gaming Mouse": [49.99, 45.99, 39.99]
      });
    } catch (error) {
      console.error("Error fetching price trends:", error);
    }
  };

  const fetchRecommendations = async () => {
    try {
      setRecommendations([
        { title: "Best Deals on Electronics", description: "Check out the latest discounts on top gadgets!" },
        { title: "AI-Powered Shopping", description: "Get smart recommendations based on your interests." },
      ]);
    } catch (error) {
      console.error("Error fetching AI recommendations:", error);
    }
  };

  useEffect(() => {
    console.log("Product Data:", products); 
    fetchProducts("trending");
    fetchPriceTrends();
    fetchRecommendations();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Header Section */}
      <header className="bg-white shadow-md py-6 text-center">
        <h1 className="text-4xl font-bold text-blue-600">SmartShop AI</h1>
        <p className="text-gray-600">Find the best deals with AI-powered shopping</p>
      </header>

      {/* Search Bar */}
      <section className="flex flex-col items-center mt-10 px-4">
        <motion.input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-2xl p-4 border rounded-lg text-lg shadow-md"
          whileFocus={{ scale: 1.05 }}
        />
        <motion.button
          onClick={() => fetchProducts(searchQuery)}
          className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
          whileHover={{ scale: 1.1 }}
        >
          Search
        </motion.button>
      </section>

    {/* Trending Products */}
<section className="mt-12 px-6">
  <h2 className="text-2xl font-semibold text-center text-blue-600">
    🔥 Trending Products
  </h2>
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
    {products.length > 0 ? (
      products.map((product, index) => {
        console.log("Product Image URL:", product.image); // Debugging: Log image URLs to console

        return (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={
                product.image &&
                !product.image.includes("via.placeholder.com")
                  ? product.image
                  : "/fallback-image.jpg" // ✅ Use fallback if needed
              }
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = "/fallback-image.jpg"; // ✅ Replace broken images
              }}
            />
            <h3 className="mt-2 font-bold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg w-full hover:bg-green-700 text-center block"
            >
              Buy Now
            </a>
          </div>
        );
      })
    ) : (
      <p className="text-center text-gray-500">No products found.</p>
    )}
  </div>
</section>


      {/* Price Trends */}
      <section className="mt-12 px-6">
        <h2 className="text-2xl font-semibold text-center text-blue-600">📉 Price Trends</h2>
        <pre className="text-gray-600 bg-white p-4 rounded-lg shadow-md">
          {JSON.stringify(priceTrends, null, 2)}
        </pre>
      </section>

      {/* AI-Powered Recommendations */}
      <section className="mt-12 px-6">
        <h2 className="text-2xl font-semibold text-center text-blue-600">🤖 AI-Powered Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold">{rec.title}</h3>
              <p className="text-gray-600">{rec.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
