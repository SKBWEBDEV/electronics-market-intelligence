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
        p-4
        sm:p-6
        mt-6
        sm:mt-8
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
          bg-gradient-to-r
          from-orange-500
          to-red-500
        "
      />





      {/* Header */}

      <div className="mb-4 sm:mb-6">


        <h2
          className="
            text-xl
            sm:text-2xl
            font-bold
            text-slate-900
          "
        >

          🔥 Trending Products

        </h2>



        <p
          className="
            text-xs
            sm:text-sm
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
          sm:grid-cols-2
          xl:grid-cols-3
          gap-4
          sm:gap-6
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
              p-3
              sm:p-4
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
                  whitespace-nowrap
                "
              >

                #{index + 1} Trending

              </span>


            </div>








            {/* Image */}

            <div
              className="
                h-32
                sm:h-44
                flex
                items-center
                justify-center
                bg-slate-50
                rounded-2xl
                mb-3
                sm:mb-4
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
                      max-h-28
                      sm:max-h-40
                      max-w-full
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
                text-sm
                sm:text-base
                font-semibold
                text-slate-800
                line-clamp-2
                min-h-[42px]
                sm:min-h-[48px]
              "
            >

              {product.name}

            </h3>









            <div
              className="
                flex
                flex-wrap
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
                  whitespace-nowrap
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
                  whitespace-nowrap
                "
              >

                {product.category}

              </span>


            </div>









            <div className="mt-3 sm:mt-4">


              <span
                className="
                  text-lg
                  sm:text-xl
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
                      ml-2
                      sm:ml-3
                      text-xs
                      sm:text-sm
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
                mt-3
                sm:mt-4
                text-blue-600
                font-semibold
                text-xs
                sm:text-sm
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