import {
  FiActivity,
  FiAlertTriangle,
  FiArrowDown,
  FiArrowUp,
  FiBox,
  FiCheckCircle,
  FiDollarSign,
  FiPackage,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";

const stats = [
  {
    title: "Total Products",
    value: "1,284",
    change: "+12.5%",
    trend: "up",
    note: "Active SKUs in stock",
    icon: FiPackage,
    iconStyle: "bg-sky-100 text-sky-700",
  },
  {
    title: "Inventory Value",
    value: "$86,420",
    change: "+8.2%",
    trend: "up",
    note: "Current warehouse value",
    icon: FiDollarSign,
    iconStyle: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Low Stock",
    value: "34",
    change: "-6.1%",
    trend: "down",
    note: "Items need reorder",
    icon: FiAlertTriangle,
    iconStyle: "bg-amber-100 text-amber-700",
  },
  {
    title: "Pending Orders",
    value: "19",
    change: "+4.8%",
    trend: "up",
    note: "Purchases awaiting receive",
    icon: FiTruck,
    iconStyle: "bg-indigo-100 text-indigo-700",
  },
];

const stockAlerts = [
  { item: "Wireless Barcode Scanner", sku: "PRG-4281", stock: 8, limit: 25, color: "bg-red-500" },
  { item: "Thermal Receipt Paper", sku: "PRG-1024", stock: 16, limit: 40, color: "bg-amber-500" },
  { item: "USB-C POS Cable", sku: "PRG-8902", stock: 22, limit: 50, color: "bg-orange-500" },
];

const recentMovements = [
  { product: "Inventory Label Roll", type: "Stock In", qty: "+320", time: "10 min ago", badge: "bg-emerald-50 text-emerald-700" },
  { product: "Counter Display Stand", type: "Sale", qty: "-18", time: "32 min ago", badge: "bg-rose-50 text-rose-700" },
  { product: "Card Reader Dock", type: "Purchase", qty: "+75", time: "1 hr ago", badge: "bg-sky-50 text-sky-700" },
  { product: "Shelf Tag Holder", type: "Adjustment", qty: "-6", time: "2 hr ago", badge: "bg-violet-50 text-violet-700" },
];

const categoryPerformance = [
  { name: "Electronics", value: 82, amount: "$28.4k", bar: "bg-sky-500" },
  { name: "Packaging", value: 64, amount: "$18.7k", bar: "bg-emerald-500" },
  { name: "Accessories", value: 48, amount: "$12.2k", bar: "bg-amber-500" },
  { name: "Fixtures", value: 36, amount: "$9.8k", bar: "bg-indigo-500" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 text-slate-900 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="overflow-hidden rounded-2xl bg-slate-950 text-white shadow-xl shadow-slate-200">
          <div className="grid gap-6 p-6 md:grid-cols-[1.5fr_1fr] md:p-8">
            <div className="flex flex-col justify-between gap-8">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-sky-100 ring-1 ring-white/10">
                  <FiActivity className="h-4 w-4" />
                  Live inventory overview
                </div>
                <h1 className="max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
                  Keep every stock decision clear, fast, and under control.
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                  Monitor product availability, purchase flow, sales movement, and urgent reorder points from one focused workspace.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-white/10 p-4 ring-1 ring-white/10">
                  <p className="text-sm text-slate-300">Today Sales</p>
                  <p className="mt-2 text-2xl font-bold">$12,840</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4 ring-1 ring-white/10">
                  <p className="text-sm text-slate-300">Stock In</p>
                  <p className="mt-2 text-2xl font-bold">785</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4 ring-1 ring-white/10">
                  <p className="text-sm text-slate-300">Stock Out</p>
                  <p className="mt-2 text-2xl font-bold">426</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 text-slate-900 shadow-2xl shadow-slate-950/20">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Warehouse Health</p>
                  <h2 className="text-2xl font-bold">92%</h2>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                  Stable
                </span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-600">Stock accuracy</span>
                    <span className="font-semibold">96%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-[96%] rounded-full bg-emerald-500" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-600">Order fulfillment</span>
                    <span className="font-semibold">88%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-[88%] rounded-full bg-sky-500" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-600">Reorder readiness</span>
                    <span className="font-semibold">74%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-[74%] rounded-full bg-amber-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const isUp = stat.trend === "up";

            return (
              <div key={stat.title} className="rounded-xl bg-white p-5 shadow-md shadow-slate-200/80 ring-1 ring-slate-200/70">
                <div className="flex items-start justify-between gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconStyle}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    isUp ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                  }`}>
                    {isUp ? <FiArrowUp className="h-3.5 w-3.5" /> : <FiArrowDown className="h-3.5 w-3.5" />}
                    {stat.change}
                  </span>
                </div>
                <p className="mt-5 text-sm font-medium text-slate-500">{stat.title}</p>
                <h3 className="mt-1 text-3xl font-bold text-slate-950">{stat.value}</h3>
                <p className="mt-2 text-sm text-slate-500">{stat.note}</p>
              </div>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
          <div className="rounded-xl bg-white p-5 shadow-md shadow-slate-200/80 ring-1 ring-slate-200/70">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Sales & Purchase Flow</h2>
                <p className="text-sm text-slate-500">Last 7 days movement summary</p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                  Sales
                </span>
                <span className="flex items-center gap-2 text-slate-600">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  Purchases
                </span>
              </div>
            </div>

            <div className="flex h-72 items-end gap-3 rounded-xl bg-slate-50 px-4 py-5">
              {[54, 68, 45, 78, 62, 88, 74].map((sale, index) => {
                const purchase = [46, 58, 62, 52, 72, 64, 82][index];
                const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

                return (
                  <div key={days[index]} className="flex flex-1 flex-col items-center gap-3">
                    <div className="flex h-52 w-full items-end justify-center gap-1.5">
                      <div className="w-3 rounded-t-lg bg-sky-500 sm:w-4" style={{ height: `${sale}%` }} />
                      <div className="w-3 rounded-t-lg bg-emerald-500 sm:w-4" style={{ height: `${purchase}%` }} />
                    </div>
                    <span className="text-xs font-medium text-slate-500">{days[index]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-md shadow-slate-200/80 ring-1 ring-slate-200/70">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Low Stock Alerts</h2>
                <p className="text-sm text-slate-500">Products below reorder level</p>
              </div>
              <FiAlertTriangle className="h-6 w-6 text-amber-500" />
            </div>

            <div className="space-y-4">
              {stockAlerts.map((alert) => {
                const width = Math.min((alert.stock / alert.limit) * 100, 100);

                return (
                  <div key={alert.sku} className="rounded-xl border border-slate-100 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-slate-950">{alert.item}</h3>
                        <p className="mt-1 text-xs font-medium text-slate-500">{alert.sku}</p>
                      </div>
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                        {alert.stock} left
                      </span>
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-slate-100">
                      <div className={`h-2 rounded-full ${alert.color}`} style={{ width: `${width}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-xl bg-white p-5 shadow-md shadow-slate-200/80 ring-1 ring-slate-200/70">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Category Performance</h2>
                <p className="text-sm text-slate-500">Inventory value by category</p>
              </div>
              <FiBox className="h-6 w-6 text-slate-400" />
            </div>

            <div className="space-y-5">
              {categoryPerformance.map((category) => (
                <div key={category.name}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{category.name}</span>
                    <span className="font-semibold text-slate-950">{category.amount}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100">
                    <div className={`h-2.5 rounded-full ${category.bar}`} style={{ width: `${category.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-white shadow-md shadow-slate-200/80 ring-1 ring-slate-200/70">
            <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Recent Stock Movement</h2>
                <p className="text-sm text-slate-500">Latest warehouse activities</p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                <FiCheckCircle className="h-4 w-4" />
                Synced
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {recentMovements.map((movement) => (
                <div key={`${movement.product}-${movement.time}`} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                      {movement.type === "Sale" ? <FiShoppingBag className="h-5 w-5" /> : <FiPackage className="h-5 w-5" />}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-slate-950">{movement.product}</h3>
                      <p className="mt-1 text-sm text-slate-500">{movement.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${movement.badge}`}>
                      {movement.type}
                    </span>
                    <p className="mt-2 font-bold text-slate-950">{movement.qty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
