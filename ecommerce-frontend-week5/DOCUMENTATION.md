📦 Project Documentation: Advanced E-Commerce Frontend PlatformProject Name: DevShop Advanced E-CommerceModule: Week 5 - Advanced Frontend DevelopmentArchitecture: Single Page Application (SPA) with Component-Driven StateTech Stack: React 18, Redux Toolkit, Vite, Tailwind CSS, Lucide Icons📑 Executive SummaryThis documentation outlines the design decisions, component hierarchy, state management logic, dynamic routing, and implementation details for the Week 5 Advanced E-Commerce Frontend project.The application implements a real-world e-commerce user interface with:Product browsing, category filtering, and multi-field sorting.Real-time product search with instant filtering.Interactive shopping cart with subtotal, tax (8%), and shipping calculation.LocalStorage state persistence.Simulated user authentication flow with protected checkout routing.Detailed product specification modal/page views with review highlights.🏗️ Architecture & Component Hierarchy1. High-Level Component Tree[App.jsx] (React Router Context & Redux Store Provider)
 │
 ├── [Header.jsx]
 │     ├── Brand Navigation Link
 │     ├── Search Input Field (triggers setSearchQuery)
 │     ├── Cart Icon Badge (calculates total quantity)
 │     └── Auth Status / Login Button (triggers login/logout)
 │
 ├── [Pages]
 │     ├── [ProductList.jsx]
 │     │     ├── Category Pills (All, Electronics, Accessories)
 │     │     ├── Sort Select Selector (Price, Rating, Featured)
 │     │     └── [ProductCard.jsx] (Grid of Items)
 │     │
 │     ├── [ProductDetail.jsx]
 │     │     ├── Image Gallery Switcher
 │     │     ├── Description & Pricing Details
 │     │     ├── Customer Reviews Summary
 │     │     └── Add-To-Cart Action
 │     │
 │     ├── [CartPage.jsx]
 │     │     ├── Line Item Table / Quantity Modifiers (+ / - / Remove)
 │     │     └── Financial Order Breakdown (Subtotal, Shipping, Tax, Total)
 │     │
 │     ├── [Login.jsx]
 │     │     └── Simulated Authentication Form
 │     │
 │     └── [Checkout.jsx] (Wrapped in <ProtectedRoute />)
 │           └── Multi-field Shipping & Payment Validation Form
🔄 State Management Architecture (Redux Toolkit)The application utilizes three global slices configured in src/store/index.js:1. cartSlice.jsitems: Array of products added to the cart, including line item quantities.Reducers:addToCart(product): Appends new product or increments existing quantity.removeFromCart(id): Filters out selected item.updateQuantity({ id, quantity }): Adjusts quantity with zero-boundary cleanup.clearCart(): Resets cart array upon successful checkout.Persistence: Automatically syncs state changes to localStorage.setItem('cart_items').2. productSlice.jsitems: Array of all available catalog items fetched via api.js.searchQuery: Global string state driving real-time title matching.selectedCategory: Active filter pill (All, Electronics, Accessories).sortBy: Sorting mode (price-low, price-high, rating, default).3. userSlice.jsuser: Object storing logged-in user profile (name, email).isAuthenticated: Boolean flag determining session authorization.Persistence: Remembers active session via localStorage.setItem('auth_user').🌐 Mock API Layer Specification (src/services/api.js)Simulates asynchronous HTTP API calls using JavaScript Promises and delay timers:FunctionParameterReturn TypeDescriptionfetchProducts()NonePromise<Array>Returns full array of mock product items.fetchProductById(id)id (Number/String)Promise<Object>Resolves product details matching the specified ID.🔒 Route Protection & Auth FlowDirect access to the /checkout route is intercepted by the <ProtectedRoute /> wrapper:// src/components/ProtectedRoute.jsx
if (!isAuthenticated) {
  return <Navigate to="/login" state={{ from: location }} replace />;
}
Upon successful login via Login.jsx, the user is automatically redirected back to /checkout using React Router's location state memory.🧪 Quality Assurance & Test Case MatrixIDFeatureTest ActionExpected ResultResultTC-01Add to CartClick "Add to Cart" on Product CardCart item count badge increments instantly✅ PassTC-02Quantity UpdateClick + / - buttons in CartItem quantity updates and subtotal recalibrates✅ PassTC-03Cart CleanupDecrease item quantity to 0Item is removed from the list automatically✅ PassTC-04Category FilterClick "Electronics" filter pillOnly products under Electronics are shown✅ PassTC-05Real-time SearchType "Headphones" in search barGrid filters down dynamically✅ PassTC-06Protected RouteNavigate to /checkout unauthenticatedImmediate redirect to /login page✅ PassTC-07Local StorageReload browser page after adding itemsCart items remain saved in state✅ Pass🚀 Build & Deployment Commands# Install dependencies
npm install

# Run local development server (Vite)
npm run dev

# Build production distribution bundle
npm run build

# Preview production build locally
npm run preview
