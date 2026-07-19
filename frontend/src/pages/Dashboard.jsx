// import StatsCard from "../components/StatsCard";
import {
  Package,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Globe,
  Settings
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
  const [priceSummary,setPriceSummary] = useState(null);

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");


  const [alerts, setAlerts] = useState([]);



  useEffect(() => {


    const loadDashboard = async () => {

      try {


        const statsRes = await api.get("/products/stats");
        setStats(statsRes.data);



        const productsRes = await api.get(
          `/products?page=${page}&limit=10&search=${search}&brand=${brand}&category=${category}`
        );


        setProducts(
          productsRes.data.products || productsRes.data
        );


        setTotalPages(
          productsRes.data.total_pages || 1
        );



        const brandsRes = await api.get(
          "/products/top-brands"
        );

        setBrands(brandsRes.data);



        const categoriesRes = await api.get(
          "/products/category-stats"
        );

        setCategories(categoriesRes.data);



        const trendingRes = await api.get(
          "/products/trending"
        );

        setTrending(trendingRes.data);



        const priceDropRes = await api.get(
          "/products/price-drop"
        );

        setPriceDrops(priceDropRes.data);



        const historyRes = await api.get(
          "/products/price-history"
        );

        setPriceHistory(historyRes.data);



        const priceChangesRes = await api.get(
          "/products/price-changes");

        setPriceChanges(priceChangesRes.data);


        const priceSummaryRes = await api.get(
          "/products/price-summary");

        setPriceSummary(priceSummaryRes.data);


       const alertsRes = await api.get("/price-alerts/");

        setAlerts(alertsRes.data.alerts);



      }

      catch(error){

        console.log(
          "Dashboard Error:",
          error
        );

      }


    };


    loadDashboard();


  }, [page, search, brand, category]);





  if(!stats){

    return (

      <h1 className="text-center mt-10 text-2xl">
        Loading...
      </h1>

    );

  }





  return (

 <div
      className="space-y-8">


      {/* Header */}

      <div className="mb-8">

        <h1 className="
          text-4xl
          font-bold
          text-slate-900
        ">
          Electronics Market Intelligence Dashboard
        </h1>


        <p className="
          text-slate-500
          mt-2
        ">
          Real-time electronics price monitoring system
        </p>


      </div>






      {/* Stats Cards */}

<div
  className="
    grid
    grid-cols-1
    md:grid-cols-2
    xl:grid-cols-4
    gap-6
    mb-8
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






     {/* System Information */}

<div
className="
grid
grid-cols-1
md:grid-cols-2
gap-6
mt-8
"
>


{/* Data Sources */}

<div
className="
relative
overflow-hidden
bg-white/90
backdrop-blur-xl
border
border-slate-200/70
rounded-3xl
p-6
shadow-sm
hover:shadow-xl
transition-all
duration-300
"
>


<div
className="
absolute
top-0
left-0
w-full
h-1
bg-linear-to-r
from-blue-500
to-indigo-600
"
/>


<h2
className="
text-xl
font-bold
text-slate-800
mb-5
"
>
🌐 Data Sources
</h2>



<div className="flex gap-3">


<span
className="
bg-blue-100
text-blue-700
px-4
py-2
rounded-full
font-medium
text-sm
"
>
✓ Star Tech
</span>


<span
className="
bg-purple-100
text-purple-700
px-4
py-2
rounded-full
font-medium
text-sm
"
>
✓ Ryans
</span>


</div>


</div>





{/* Scraper Status */}

<div
className="
relative
overflow-hidden
bg-white/90
backdrop-blur-xl
border
border-slate-200/70
rounded-3xl
p-6
shadow-sm
hover:shadow-xl
transition-all
duration-300
"
>


<div
className="
absolute
top-0
left-0
w-full
h-1
bg-linear-to-r
from-emerald-500
to-green-600
"
/>



<h2
className="
text-xl
font-bold
text-slate-800
mb-5
"
>
⚙️ Scraper Status
</h2>




<div
className="
flex
items-center
gap-3
"
>

<span
className="
w-3
h-3
bg-emerald-500
rounded-full
animate-pulse
"
/>


<p
className="
text-green-600
font-semibold
"
>
System Running
</p>


</div>



<p
className="
text-sm
text-slate-500
mt-3
"
>
Automatic daily scraping enabled
</p>



</div>



</div>





      {/* Search */}

      <div className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
        mt-8
      ">


        <h2 className="
          text-xl
          font-bold
          mb-4
        ">
          🔍 Search & Filter Products
        </h2>



        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-4
        ">


          <input

            type="text"

            placeholder="Search product..."

            value={search}

            onChange={(e)=>{

              setPage(1);
              setSearch(e.target.value);

            }}

            className="
              border
              rounded-lg
              p-3
            "

          />




          <select

            value={brand}

            onChange={(e)=>{

              setPage(1);
              setBrand(e.target.value);

            }}

            className="
              border
              rounded-lg
              p-3
            "

          >

            <option value="">
              All Brands
            </option>


            {
              brands.map((item,index)=>(

                <option
                  key={index}
                  value={item.brand}
                >
                  {item.brand}
                </option>

              ))
            }


          </select>






          <select

            value={category}

            onChange={(e)=>{

              setPage(1);
              setCategory(e.target.value);

            }}

            className="
              border
              rounded-lg
              p-3
            "

          >

            <option value="">
              All Categories
            </option>


            {
              categories.map((item,index)=>(

                <option
                  key={index}
                  value={item.category}
                >
                  {item.category}
                </option>

              ))
            }


          </select>


        </div>


      </div>






      {/* Product Table */}

      <div className="mt-8">

        <ProductTable products={products}/>

      </div>







      {/* Pagination */}

      <div className="
        flex
        justify-center
        items-center
        gap-3
        mt-6
      ">


        <button

          disabled={page===1}

          onClick={()=>setPage(page-1)}

          className="
            px-4
            py-2
            bg-slate-800
            text-white
            rounded-lg
          "

        >
          Previous
        </button>



        {
          Array.from(
            {length: totalPages},
            (_,i)=>i+1
          )
          .map(number=>(

            <button

              key={number}

              onClick={()=>setPage(number)}

              className={`
                px-4
                py-2
                rounded-lg
                ${
                  page===number
                  ?
                  "bg-blue-600 text-white"
                  :
                  "bg-white"
                }
              `}

            >

              {number}

            </button>

          ))
        }



        <button

          disabled={page===totalPages}

          onClick={()=>setPage(page+1)}

          className="
            px-4
            py-2
            bg-slate-800
            text-white
            rounded-lg
          "

        >
          Next
        </button>



      </div>






      {/* Analytics */}

      <div className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
        mt-8
      ">


        <BrandChart data={brands}/>

        <CategoryChart data={categories}/>

        <TrendingProducts products={trending}/>

        <PriceDrop products={priceDrops}/>

        <PriceMovement data={priceSummary}/>

        


      </div>





      <PriceHistory products={priceHistory}/>


      <PriceHistoryChart products={priceHistory}/>



    </div>

  );

};


export default Dashboard;