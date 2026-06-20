import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const menuItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-5H9v5H4a1 1 0 0 1-1-1v-9.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Categories',
    path: '/categories',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 9l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="4" y="15" width="16" height="6" rx="2" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    // subMenu: [
    //   {
    //     label: 'New Stock',
    //     path: '/stock-in/new',
    //     icon: (
    //       <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg">
    //         <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.8" />
    //       </svg>
    //     ),
    //   },
    //   {
    //     label: 'Stock History',
    //     path: '/stock-in/history',
    //     icon: (
    //       <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg">
    //         <path d="M6 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    //         <path d="M12 6v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    //       </svg>
    //     ),
    //   },
    // ],
  },
  {
    label: 'Products',
    path: '/products',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16 15l-4 4-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="4" y="3" width="16" height="6" rx="2" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    label: 'Suppliers',
    path: '/suppliers',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 7V3L3 8l5 5V9c6.075 0 9.923 1.91 11 8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Purchases',
    path: '/purchases',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 19h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10 15v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M14 11v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M18 7v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    // subMenu: [
    //   {
    //     label: 'Sales Report',
    //     path: '/reporting/sales',
    //     icon: (
    //       <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg">
    //         <path d="M4 14l4-4 4 4 4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    //       </svg>
    //     ),
    //   },
    //   {
    //     label: 'Inventory Report',
    //     path: '/reporting/inventory',
    //     icon: (
    //       <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg">
    //         <path d="M4 7h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    //         <path d="M4 12h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    //         <path d="M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    //       </svg>
    //     ),
    //   },
    // ],
  },
  {
    label: 'Sales',
    path: '/sales',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 8c0-3.314 2.686-6 6-6s6 2.686 6 6c0 2.526-1.548 4.686-3.75 5.6L12 22l-2.25-8.4C7.548 12.686 6 10.526 6 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 11v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 17h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Customers',
    path: '/customers',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09c.71 0 1.34-.4 1.61-1.01a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09c0 .71.4 1.34 1.01 1.61a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.05.72.46 1.35 1.1 1.69Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null)
  const location = useLocation()

  const isActive = (path) => location.pathname === path
  const hasActiveChild = (subMenu) => subMenu?.some((child) => isActive(child.path))

  return (
    <aside className="flex h-screen w-72 flex-col bg-slate-950 text-slate-100 shadow-2xl ring-1 ring-slate-800">
      <div className="flex h-full flex-col px-5 py-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-500 text-lg font-bold text-slate-950 shadow-lg shadow-sky-500/20">
            P
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Pragma</p>
            <h1 className="text-xl font-semibold text-white">Admin Panel</h1>
          </div>
        </div>

        <div className="mb-8 rounded-[2rem] bg-slate-900/90 p-4 ring-1 ring-white/10 shadow-inner shadow-slate-950/20">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-700 text-sm font-semibold text-slate-100">
              JD
            </div>
            <div>
              <p className="text-sm font-semibold text-white">John Doe</p>
              <p className="text-xs text-slate-500">john.doe@company.com</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isParentActive = isActive(item.path) || hasActiveChild(item.subMenu)
            const hasSubMenu = Array.isArray(item.subMenu) && item.subMenu.length > 0
            const isOpen = openMenu === item.label || hasActiveChild(item.subMenu)

            return (
              <div key={item.label} className="space-y-1">
                {hasSubMenu ? (
                  <button
                    type="button"
                    onClick={() => setOpenMenu(isOpen ? null : item.label)}
                    className={`group flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                      isParentActive
                        ? 'bg-sky-500/15 text-sky-300 shadow-md shadow-sky-500/10 ring-1 ring-sky-500/20'
                        : 'text-slate-300 hover:bg-slate-900/80 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                        isParentActive ? 'bg-sky-500/15 text-sky-300' : 'bg-slate-900 text-slate-400 group-hover:bg-slate-800 group-hover:text-white'
                      }`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </span>
                    <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                      isParentActive
                        ? 'bg-sky-500/15 text-sky-300 shadow-md shadow-sky-500/10 ring-1 ring-sky-500/20'
                        : 'text-slate-300 hover:bg-slate-900/80 hover:text-white'
                    }`}
                  >
                    <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                      isParentActive ? 'bg-sky-500/15 text-sky-300' : 'bg-slate-900 text-slate-400 group-hover:bg-slate-800 group-hover:text-white'
                    }`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                )}

                {hasSubMenu && isOpen && (
                  <div className="px-4 my-2">
                    {item.subMenu.map((subItem) => (
                      <Link
                        key={subItem.label}
                        to={subItem.path}
                        className={`flex items-center gap-3 rounded-xl px-4 py-2 my-1 text-sm transition duration-200 ${
                          isActive(subItem.path)
                            ? 'bg-sky-500/15 text-sky-300 ring-1 ring-sky-500/20'
                            : 'text-slate-400 hover:bg-slate-900/80 hover:text-white'
                        }`}
                      >
                        <span className="flex h-7 w-7 items-center justify-center rounded-2xl bg-slate-900 text-slate-400">
                          {subItem.icon || (
                            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                            </svg>
                          )}
                        </span>
                        <span>{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <div className="mt-6 rounded-[2rem] bg-slate-900/90 p-4 ring-1 ring-white/10 shadow-inner shadow-slate-950/20">
          <Link
            to="/logout"
            className="flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-slate-400">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 17l-4-4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 13h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
            Logout
          </Link>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
