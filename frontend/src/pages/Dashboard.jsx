import { useEffect, useState } from "react";

import api from "../api/axios";

import StatsCard from "../components/StatsCard";
import BrandChart from "../components/BrandChart";
import CategoryChart from "../components/CategoryChart";
import TrendingProducts from "../components/TrendingProducts";
import ProductTable from "../components/ProductTable";
import PriceDrop from "../components/PriceDrop";
import PriceHistory from "../components/PriceHistory";
import PriceHistoryChart from "../components/PriceHistoryChart";


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


  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");



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

    <div className="
      min-h-screen
      bg-slate-100
      p-6 md:p-8
    ">


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





      {/* Stats */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-4
        gap-6
      ">


        <StatsCard
          title="Total Products"
          value={stats.total_products}
          icon="📦"
        />


        <StatsCard
          title="Average Price"
          value={`${stats.average_price} ৳`}
          icon="💰"
        />


        <StatsCard
          title="Highest Price"
          value={`${stats.highest_price} ৳`}
          icon="🔥"
        />


        <StatsCard
          title="Lowest Price"
          value={`${stats.lowest_price} ৳`}
          icon="⬇️"
        />


      </div>






      {/* Sources */}

      <div className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
        mt-8
      ">


        <div className="
          flex
          flex-col
          md:flex-row
          justify-between
          gap-6
        ">


          <div>

            <h2 className="
              text-xl
              font-bold
              mb-4
            ">
              🌐 Data Sources
            </h2>


            <div className="flex gap-3">

              <span className="
                bg-blue-100
                text-blue-700
                px-4
                py-2
                rounded-full
              ">
                ✓ Star Tech
              </span>


              <span className="
                bg-purple-100
                text-purple-700
                px-4
                py-2
                rounded-full
              ">
                ✓ Ryans
              </span>


            </div>


          </div>




          <div>

            <h2 className="
              text-xl
              font-bold
              mb-4
            ">
              ⚙️ Scraper Status
            </h2>


            <p className="
              text-green-600
              font-semibold
            ">
              🟢 System Running
            </p>


            <p className="
              text-sm
              text-slate-500
              mt-2
            ">
              Automatic daily scraping enabled
            </p>


          </div>



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
        mt-10
      ">


        <BrandChart data={brands}/>

        <CategoryChart data={categories}/>


        <TrendingProducts products={trending}/>


        <PriceDrop products={priceDrops}/>


      </div>





      <PriceHistory products={priceHistory}/>


      <PriceHistoryChart products={priceHistory}/>



    </div>

  );

};


export default Dashboard;