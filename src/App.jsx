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
    <div className="relative flex min-h-screen bg-slate-100 text-slate-900">
      {showSidebar && (
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}
      {showSidebar && (
        <div
          className={`fixed inset-0 z-20 bg-slate-950/40 transition-opacity duration-200 md:hidden ${sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1">
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

        <main className="px-0 py-5 md:px-0">
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
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
