import { useEffect, useState } from "react";
import api from "../api/axios";

function Analytics() {


  const [stats, setStats] = useState({});
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);



 useEffect(()=>{


  const loadAnalytics = async()=>{

    try{


      const statsRes = await api.get(
        "/products/stats"
      );

      setStats(statsRes.data);



      const brandsRes = await api.get(
        "/products/top-brands"
      );

      setBrands(brandsRes.data);



      const categoriesRes = await api.get(
        "/products/category-stats"
      );

      setCategories(categoriesRes.data);



    }catch(error){

      console.log(
        "Analytics Error:",
        error
      );

    }


  };


  loadAnalytics();


},[]);





  const cards = [

    {
      title:"Total Products",
      value:stats.total_products || 0
    },

    {
      title:"Average Price",
      value:`${stats.average_price || 0} ৳`
    },

    {
      title:"Highest Price",
      value:`${stats.highest_price || 0} ৳`
    },

    {
      title:"Lowest Price",
      value:`${stats.lowest_price || 0} ৳`
    }

  ];







  return (

    <div className="p-4 sm:p-6">


      <h1 className="
        text-2xl
        sm:text-3xl
        font-bold
        text-slate-900
      ">

        📈 Analytics

      </h1>



      <p className="
        text-slate-500
        mt-2
      ">

        Electronics market insights

      </p>





      {/* Stats Cards */}

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-4
        mt-8
      ">


      {
        cards.map((card,index)=>(

          <div
            key={index}
            className="
              bg-white
              rounded-2xl
              p-6
              shadow-sm
              border
              border-slate-200
            "
          >

            <p className="text-slate-500 text-sm">

              {card.title}

            </p>


            <h2 className="
              text-3xl
              font-bold
              mt-3
            ">

              {card.value}

            </h2>


          </div>

        ))
      }


      </div>







      {/* Top Brands */}


      <div className="
        bg-white
        rounded-3xl
        p-6
        shadow-sm
        border
        mt-8
      ">


        <h2 className="
          text-xl
          font-bold
          mb-4
        ">

          🏷 Top Brands

        </h2>



        <div className="space-y-3">


        {
          brands.map((brand,index)=>(


            <div
              key={index}
              className="
                flex
                justify-between
                items-center
                border-b
                py-3
              "
            >


              <span className="text-slate-700">

                {brand.brand}

              </span>



              <span className="
                bg-blue-100
                text-blue-700
                px-3
                py-1
                rounded-full
                text-sm
                font-bold
              ">

                {brand.products}

              </span>


            </div>


          ))
        }


        </div>


      </div>









      {/* Categories */}


      <div className="
        bg-white
        rounded-3xl
        p-6
        shadow-sm
        border
        mt-8
      ">


        <h2 className="
          text-xl
          font-bold
          mb-4
        ">

          📂 Categories

        </h2>




        <div className="space-y-3">


        {
          categories.map((cat,index)=>(


            <div
              key={index}
              className="
                flex
                justify-between
                items-center
                border-b
                py-3
              "
            >


              <span className="text-slate-700">

                {cat.category}

              </span>



              <span className="
                bg-purple-100
                text-purple-700
                px-3
                py-1
                rounded-full
                text-sm
                font-bold
              ">

                {cat.products}

              </span>



            </div>


          ))
        }


        </div>


      </div>





    </div>

  );

}


export default Analytics;