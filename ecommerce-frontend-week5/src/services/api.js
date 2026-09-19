// Mock API Service for Products and Auth

const MOCK_PRODUCTS = [
  { 
    id: 1, 
    name: "Wireless Headphones", 
    price: 99.99, 
    category: "Electronics", 
    rating: 4.5, 
    description: "High quality noise-canceling wireless headphones with up to 30 hours of battery life.",
    images: [
      "https://dummyjson.com/image/400x300/1e293b/ffffff?text=Headphones",
      "https://dummyjson.com/image/400x300/334155/ffffff?text=Headphones+Detail"
    ],
    reviews: [
      { id: 101, user: "John Doe", rating: 5, comment: "Excellent sound quality!" },
      { id: 102, user: "Sara Smith", rating: 4, comment: "Very comfortable to wear." }
    ]
  },
  { 
    id: 2, 
    name: "Smartphone Case", 
    price: 24.99, 
    category: "Accessories", 
    rating: 4.2, 
    description: "Durable protective slim case with shock-absorbing corners.",
    images: ["https://dummyjson.com/image/400x300/1e293b/ffffff?text=Phone+Case"],
    reviews: []
  },
  { 
    id: 3, 
    name: "USB-C Cable", 
    price: 19.99, 
    category: "Electronics", 
    rating: 4.8, 
    description: "Braided fast charging 6ft USB-C cable.",
    images: ["https://dummyjson.com/image/400x300/1e293b/ffffff?text=USB-C+Cable"],
    reviews: []
  },
  { 
    id: 4, 
    name: "Smart Watch", 
    price: 199.99, 
    category: "Electronics", 
    rating: 4.6, 
    description: "Fitness tracker with heart rate monitor, GPS, and water resistance.",
    images: ["https://dummyjson.com/image/400x300/1e293b/ffffff?text=Smart+Watch"],
    reviews: []
  }
];

export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_PRODUCTS), 300);
  });
};

export const fetchProductById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = MOCK_PRODUCTS.find(p => p.id === parseInt(id));
      if (product) resolve(product);
      else reject("Product not found");
    }, 300);
  });
};