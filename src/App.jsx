import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Categories from './pages/Category/Categories.jsx'
import Products from './pages/Product/Products.jsx'
import Purchases from './pages/Purchase/Purchases.jsx'
import Sales from './pages/Sale/Sales.jsx'
import Suppliers from './pages/Supplier/Suppliers.jsx'
import Customers from './pages/Customer/Customers.jsx'
import Login from './pages/Registration/Login.jsx'
import Registration from './pages/Registration/Registration.jsx'
import PasswordResetForm from './pages/Registration/PasswordResetForm.jsx'
import ForgetPasswordForm from './pages/Registration/ForgetPasswordForm.jsx'
import { Routes, Route, useLocation } from 'react-router-dom'
import StockMovement from './pages/StockMovement/StockMovement.jsx'
import CreateCategory from './pages/Category/CreateCategory.jsx'
import UpdateCategory from './pages/Category/UpdateCategory.jsx'
import CreateCustomer from './pages/Customer/CreateCustomer.jsx'
import UpdateCustomer from './pages/Customer/UpdateCustomer.jsx'
import CreateProduct from './pages/Product/CreateProduct.jsx'
import UpdateProduct from './pages/Product/UpdateProduct.jsx'
import CreatePurchase from './pages/Purchase/CreatePurchase.jsx'
import UpdatePurchase from './pages/Purchase/UpdatePurchase.jsx'
import CreateSale from './pages/Sale/CreateSale.jsx'
import UpdateSale from './pages/Sale/UpdateSale.jsx'
import CreateSupplier from './pages/Supplier/CreateSupplier.jsx'
import UpdateSupplier from './pages/Supplier/UpdateSupplier.jsx'
import SubscriptionPlan from './pages/Plan/SubscriptionPlan.jsx'
import { Navigate } from 'react-router-dom'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const hideSidebarOnRoutes = ['/', '/registration', '/forget-password', '/password-reset']
  const showSidebar = !hideSidebarOnRoutes.includes(location.pathname)

  useEffect(() => {
    if (!showSidebar) {
      setSidebarOpen(false)
    }
  }, [showSidebar])

  return (
    <div className="relative flex min-h-screen overflow-x-hidden bg-slate-100 text-slate-900">
      {showSidebar && (
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}
      {showSidebar && (
        <div
          className={`fixed inset-0 z-20 bg-slate-950/40 transition-opacity duration-200 md:hidden ${sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`min-w-0 flex-1 ${showSidebar ? 'md:pl-72' : ''}`}>
        <div className="sticky top-0 z-20 border-b border-slate-200/80 bg-slate-100 px-4 py-3 shadow-sm shadow-slate-200/20 md:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-slate-100 shadow-sm shadow-slate-900/20"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <main className="min-w-0 overflow-x-auto px-0 py-5 md:px-0">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/forget-password" element={<ForgetPasswordForm />} />
            <Route path="/password-reset" element={<PasswordResetForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products" element={<Products />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/stockMovement" element={<StockMovement />} />
            <Route path="/category/create" element={<CreateCategory />} />
            <Route path="/category/update/:id" element={<UpdateCategory />} />
            <Route path="/customer/create" element={<CreateCustomer />} />
            <Route path="/customer/update/:id" element={<UpdateCustomer />} />
            <Route path="/product/create" element={<CreateProduct />} />
            <Route path="/product/update/:id" element={<UpdateProduct />} />
            <Route path="/purchase/create" element={<CreatePurchase />} />
            <Route path="/purchase/update/:id" element={<UpdatePurchase />} />
            <Route path="/sale/create" element={<CreateSale />} />
            <Route path="/sale/update/:id" element={<UpdateSale />} />
            <Route path="/supplier/create" element={<CreateSupplier />} />
            <Route path="/supplier/update/:id" element={<UpdateSupplier />} />
            <Route path="/subscription" element={<SubscriptionPlan />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
