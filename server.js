const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3003; // Ensures it's running on 3003 unless changed manually

// Middleware
app.use(express.json());
app.use(cors());

// Mock product data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 79.99,
    image: "/images/headphones.jpg", // Ensure this file exists in /public/images/
    link: "https://example.com/product1",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 149.99,
    image: "/images/smartwatch.jpg",
    link: "https://example.com/product2",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: 49.99,
    image: "/images/mouse.jpg",
    link: "https://example.com/product3",
  },
];

// API Route to get products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Ensure Express serves static files from the public folder
app.use(express.static("public"));

// Fallback r
