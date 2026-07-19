import React from "react";


const TrendingProducts = ({ products }) => {


  return (

    <div
      className="
        relative
        overflow-hidden
        bg-white/90
        backdrop-blur-xl
        border
        border-slate-200/70
        rounded-3xl
        shadow-sm
        p-6
        mt-8
        hover:shadow-xl
        transition-all
        duration-300
      "
    >


      {/* Top Gradient */}

      <div
        className="
          absolute
          top-0
          left-0
          w-full
          h-1
          bg-linear-to-r
          from-orange-500
          to-red-500
        "
      />



      {/* Header */}

      <div className="mb-6">


        <h2
          className="
            text-2xl
            font-bold
            text-slate-900
          "
        >
          🔥 Trending Products
        </h2>


        <p
          className="
            text-sm
            text-slate-500
            mt-1
          "
        >
          Most popular electronics products
        </p>


      </div>






      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
      >



      {
        products?.map((product,index)=>(


          <div

            key={index}

            className="
              group
              border
              border-slate-200
              rounded-2xl
              p-4
              bg-white
              hover:-translate-y-1
              hover:shadow-xl
              transition-all
              duration-300
            "

          >



            {/* Ranking */}

            <div
              className="
                flex
                justify-between
                items-center
                mb-3
              "
            >

              <span
                className="
                  bg-orange-100
                  text-orange-700
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-semibold
                "
              >
                #{index + 1} Trending
              </span>


            </div>





            {/* Image */}

            <div
              className="
                h-44
                flex
                items-center
                justify-center
                bg-slate-50
                rounded-2xl
                mb-4
              "
            >

              {
                product.image && (

                  <img

                    src={product.image}

                    alt={product.name}

                    onError={(e)=>{
                      e.target.style.display="none";
                    }}

                    className="
                      max-h-40
                      object-contain
                      group-hover:scale-105
                      transition
                    "

                  />

                )
              }


            </div>






            <h3
              className="
                font-semibold
                text-slate-800
                line-clamp-2
                min-h-[48px]
              "
            >

              {product.name}

            </h3>





            <div
              className="
                flex
                gap-2
                mt-3
              "
            >


              <span
                className="
                  bg-blue-100
                  text-blue-700
                  px-3
                  py-1
                  rounded-full
                  text-xs
                "
              >
                {product.brand}
              </span>



              <span
                className="
                  bg-slate-100
                  text-slate-600
                  px-3
                  py-1
                  rounded-full
                  text-xs
                "
              >
                {product.category}
              </span>


            </div>







            <div className="mt-4">


              <span
                className="
                  text-xl
                  font-bold
                  text-blue-600
                "
              >

                {product.price} ৳

              </span>



              {
                product.old_price && (

                  <span
                    className="
                      ml-3
                      text-sm
                      text-slate-400
                      line-through
                    "
                  >

                    {product.old_price} ৳

                  </span>

                )
              }


            </div>







            <a

              href={product.url}

              target="_blank"

              className="
                inline-flex
                mt-4
                text-blue-600
                font-semibold
                text-sm
                hover:underline
              "

            >

              View Product →

            </a>





          </div>


        ))
      }



      </div>


    </div>

  );

};


export default TrendingProducts;