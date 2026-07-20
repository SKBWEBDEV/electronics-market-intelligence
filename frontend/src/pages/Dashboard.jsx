// import StatsCard from "../components/StatsCard";
import {
  Package,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Globe,
  Settings,
} from "lucide-react";

import InfoCard from "../components/InfoCard";

import { useEffect, useState } from "react";

import api from "../api/axios";

import StatsCard from "../components/StatsCard";
import BrandChart from "../components/BrandChart";
import CategoryChart from "../components/CategoryChart";
import TrendingProducts from "../components/TrendingProducts";
import ProductTable from "../components/ProductTable";
import PriceDrop from "../components/PriceDrop";
// console.log("PRICE DROP DATA:", PriceDrop);
import PriceHistory from "../components/PriceHistory";
import PriceHistoryChart from "../components/PriceHistoryChart";
import PriceMovement from "../components/PriceMovement";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [trending, setTrending] = useState([]);
  const [priceDrops, setPriceDrops] = useState([]);
  const [priceHistory, setPriceHistory] = useState([]);
  const [priceChanges, setPriceChanges] = useState([]);
  const [priceSummary, setPriceSummary] = useState(null);

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const [alerts, setAlerts] = useState([]);

useEffect(() => {
  const loadDashboard = async () => {

    // Stats
    try {
      const statsRes = await api.get("/products/stats");
      setStats(statsRes.data);
    } catch (error) {
      console.log("Stats Error:", error);
    }


    // Products
    try {
      const productsRes = await api.get(
        `/products?page=${page}&limit=10&search=${search}&brand=${brand}&category=${category}`
      );

      setProducts(
        productsRes.data.products || productsRes.data
      );

      setTotalPages(
        productsRes.data.total_pages || 1
      );

    } catch (error) {
      console.log("Products Error:", error);
    }


    // Brands
    try {
      const brandsRes = await api.get("/products/top-brands");
      setBrands(brandsRes.data);

    } catch (error) {
      console.log("Brands Error:", error);
    }


    // Categories
    try {
      const categoriesRes = await api.get("/products/category-stats");
      setCategories(categoriesRes.data);

    } catch (error) {
      console.log("Categories Error:", error);
    }


    // Trending
    try {
      const trendingRes = await api.get("/products/trending");
      setTrending(trendingRes.data);

    } catch (error) {
      console.log("Trending Error:", error);
    }


    // Price Drop
    try {
      const priceDropRes = await api.get("/products/price-drop");

      setPriceDrops(
        priceDropRes.data || []
      );

    } catch (error) {
      console.log("Price Drop Error:", error);
    }


    // Price History
    try {
      const historyRes = await api.get("/products/price-history");

      setPriceHistory(
        historyRes.data || []
      );

    } catch (error) {
      console.log("Price History Error:", error);
    }


    // Product Table Price Changes
    try {

      const priceChangesRes = await api.get(
        "/products/price-history"
      );

      setPriceChanges(
        Array.isArray(priceChangesRes.data)
          ? priceChangesRes.data
          : []
      );

    } catch (error) {
      console.log("Price Changes Error:", error);
    }


    // Price Movement Summary
    try {

      const priceSummaryRes = await api.get(
        "/products/price-changes"
      );


      console.log(
        "PRICE SUMMARY:",
        priceSummaryRes.data
      );


      setPriceSummary(
        priceSummaryRes.data
      );


    } catch (error) {
      console.log("Price Summary Error:", error);
    }



    // Alerts
    try {

      const alertsRes = await api.get(
        "/price-alerts/"
      );


      setAlerts(
        alertsRes.data.alerts || []
      );


    } catch (error) {
      console.log("Alerts Error:", error);
    }


  };


  loadDashboard();


}, [page, search, brand, category]);

  if (!stats) {
    return <h1 className="text-center mt-10 text-2xl">Loading...</h1>;
  }

  return (
    <div
      className="
w-full
space-y-6
sm:space-y-8
overflow-hidden
"
    >
      {/* Header */}

      <div>
        <h1
          className="
text-2xl
sm:text-3xl
lg:text-4xl
font-bold
text-slate-900
"
        >
          Electronics Market Intelligence Dashboard
        </h1>

        <p
          className="
text-sm
sm:text-base
text-slate-500
mt-2
"
        >
          Real-time electronics price monitoring system
        </p>
      </div>

      {/* Stats */}

      <div
        className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-4
sm:gap-6
"
      >
        <StatsCard
          title="Total Products"
          value={stats?.total_products || 0}
          icon={Package}
          change="+12%"
          changeType="positive"
          subtext="Products tracked"
        />

        <StatsCard
          title="Average Price"
          value={`${stats?.average_price || 0} ৳`}
          icon={DollarSign}
          change="+5.4%"
          changeType="positive"
          subtext="Market average"
        />

        <StatsCard
          title="Highest Price"
          value={`${stats?.highest_price || 0} ৳`}
          icon={TrendingUp}
          change="High value"
          changeType="neutral"
          subtext="Premium product"
        />

        <StatsCard
          title="Lowest Price"
          value={`${stats?.lowest_price || 0} ৳`}
          icon={TrendingDown}
          change="-2.1%"
          changeType="negative"
          subtext="Budget product"
        />
      </div>

      {/* System */}

      <div
        className="
grid
grid-cols-1
lg:grid-cols-2
gap-4
sm:gap-6
"
      >
        <InfoCard title="🌐 Data Sources" value="✓ Star Tech  ✓ Ryans" />

        <InfoCard title="⚙️ Scraper Status" value="🟢 System Running" />
      </div>

      {/* Search */}

      <div
        className="
bg-white
rounded-2xl
p-4
sm:p-6
shadow
"
      >
        <h2
          className="
text-lg
sm:text-xl
font-bold
mb-4
"
        >
          🔍 Search & Filter Products
        </h2>

        <div
          className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-4
"
        >
          <input
            type="text"

            placeholder="Search product..."

            value={search}

            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}

            className="
border
rounded-lg
p-3
w-full
"
          />

          <select
            value={brand}
            onChange={(e) => {
              setPage(1);
              setBrand(e.target.value);
            }}

            className="
border
rounded-lg
p-3
w-full
"
          >
            <option value="">All Brands</option>

            {brands.map((item, index) => (
              <option key={index} value={item.brand}>
                {item.brand}
              </option>
            ))}
          </select>

          <select
            value={category}

            onChange={(e) => {
              setPage(1);
              setCategory(e.target.value);
            }}

            className="
border
rounded-lg
p-3
w-full
"
          >
            <option value="">All Categories</option>

            {categories.map((item, index) => (
              <option key={index} value={item.category}>
                {item.category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Table */}

      <div
        className="
w-full
overflow-x-auto
mt-6
sm:mt-8
"
      >
        <ProductTable products={products} priceChanges={priceChanges} />
      </div>

      {/* Pagination */}

      <div
  className="
    flex
    justify-start
    sm:justify-center
    items-center
    gap-2
    mt-6
    overflow-x-auto
    pb-2
    max-w-full
  "
>

  {/* Previous */}
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="
      px-3
      sm:px-4
      py-2
      bg-slate-800
      text-white
      rounded-lg
      text-sm
      whitespace-nowrap
      disabled:opacity-50
    "
  >
    Previous
  </button>


  {/* Page Numbers */}
  <div
    className="
      flex
      gap-2
      overflow-x-auto
      max-w-[500px]
      px-2
    "
  >

    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
      <button
        key={number}
        onClick={() => setPage(number)}
        className={`
          px-3
          py-2
          rounded-lg
          text-sm
          whitespace-nowrap

          ${
            page === number
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }
        `}
      >
        {number}
      </button>
    ))}

  </div>


  {/* Next */}
  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    className="
      px-3
      sm:px-4
      py-2
      bg-slate-800
      text-white
      rounded-lg
      text-sm
      whitespace-nowrap
      disabled:opacity-50
    "
  >
    Next
  </button>

</div>

      {/* Analytics */}
     

     <div
  className="
grid
grid-cols-1
lg:grid-cols-2
gap-4
sm:gap-6
mt-8
"
>
  <BrandChart data={brands} />

  <CategoryChart data={categories} />

  <TrendingProducts products={trending} />

  <PriceDrop products={priceDrops} />

  <PriceMovement 
    data={priceSummary}
  />

</div>
     
     
      {/* Price History */}

      <div
        className="
w-full
mt-8
overflow-x-auto
"
      >
        <PriceHistory products={priceHistory} />
      </div>

      <div
        className="
w-full
mt-8
overflow-x-auto
"
      >
        <PriceHistoryChart products={priceHistory} />
      </div>
    </div>
  );
};

export default Dashboard;
