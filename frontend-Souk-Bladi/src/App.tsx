import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { Layout } from './components/layout/Layout';
import { ScrollToTop } from './components/common/ScrollToTop';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Cooperatives } from './pages/Cooperatives';
import { CooperativeDetails } from './pages/CooperativeDetails';
import { GiftSets } from './pages/GiftSets';
import { CustomBox } from './pages/CustomBox';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Pricing } from './pages/Pricing';
import { Dashboard } from './pages/Dashboard';
import { DashboardOverview } from './pages/dashboard/DashboardOverview';
import { DashboardProducts } from './pages/dashboard/DashboardProducts';
import { AdminProducts } from './pages/dashboard/AdminProducts';
import { AdminCooperatives } from './pages/dashboard/AdminCooperatives';
import { AdminCooperativeDetails } from './pages/dashboard/AdminCooperativeDetails';
import { AdminBlacklist } from './pages/dashboard/AdminBlacklist';
import { DashboardSettings } from './pages/dashboard/DashboardSettings';
import { Orders } from './pages/dashboard/Orders';
import { OrderDetails } from './pages/dashboard/OrderDetails';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';

import { AuthProvider } from './context/AuthContext';
import { CooperativeProvider } from './context/CooperativeContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { WishlistProvider } from './context/WishlistContext';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <AuthProvider>
          <CooperativeProvider>
            <ProductProvider>
              <CartProvider>
                <OrderProvider>
                  <WishlistProvider>
                    <ToastProvider>
                      <ScrollToTop />
                      <Routes>
                        {/* Auth Routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Protected Routes */}
                        <Route
                          path="/dashboard"
                          element={
                            <ProtectedRoute allowedRoles={['admin', 'super_admin', 'manager', 'cooperative']}>
                              <Dashboard />
                            </ProtectedRoute>
                          }
                        >
                          <Route index element={<DashboardOverview />} />
                          <Route path="orders" element={<Orders />} />
                          <Route path="orders/:id" element={<OrderDetails />} />
                          <Route path="products" element={<DashboardProducts />} />
                          <Route path="admin-products" element={<AdminProducts />} />
                          <Route path="admin-coops" element={<AdminCooperatives />} />
                          <Route path="admin-coops/:id" element={<AdminCooperativeDetails />} />
                          <Route path="admin-blacklist" element={<AdminBlacklist />} />
                          <Route path="customers" element={<div className="p-8 text-center text-gray-500">Gestion Clients (À venir)</div>} />
                          <Route path="analytics" element={<div className="p-8 text-center text-gray-500">Analytique (À venir)</div>} />
                          <Route path="settings" element={<DashboardSettings />} />
                        </Route>

                        {/* Public Routes */}
                        <Route path="/" element={<Layout />}>
                          <Route index element={<Home />} />
                          <Route path="products" element={<Products />} />
                          <Route path="products/:id" element={<ProductDetails />} />
                          <Route path="cooperatives" element={<Cooperatives />} />
                          <Route path="cooperatives/:id" element={<CooperativeDetails />} />
                          <Route path="gift-sets" element={<GiftSets />} />
                          <Route path="custom-box" element={<CustomBox />} />
                          <Route path="cart" element={<Cart />} />
                          <Route path="checkout" element={<Checkout />} />
                          <Route path="about" element={<About />} />
                          <Route path="contact" element={<Contact />} />
                          <Route path="pricing" element={<Pricing />} />
                          <Route path="*" element={<div className="p-20 text-center">404 - Page non trouvée</div>} />
                        </Route>
                      </Routes>
                    </ToastProvider>
                  </WishlistProvider>
                </OrderProvider>
              </CartProvider>
            </ProductProvider>
          </CooperativeProvider>
        </AuthProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
