import React from "react";


const PriceDrop = ({ products }) => {


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
          from-red-500
          to-orange-500
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
          📉 Price Drop Alert
        </h2>


        <p
          className="
            text-xs
            sm:text-sm
            text-slate-500
            mt-1
          "
        >
          Products with recent price reduction
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




            {/* Image */}

            <div
              className="
                h-32
                sm:h-40
                bg-slate-50
                rounded-2xl
                flex
                items-center
                justify-center
                mb-3
                sm:mb-4
              "
            >


            {
              product.image && (

                <img

                  src={product.image}

                  alt={product.name}

                  className="
                    max-h-28
                    sm:max-h-36
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






            <p
              className="
                text-xs
                sm:text-sm
                text-slate-500
                mt-2
                truncate
              "
            >

              {product.brand || "Unknown"}
              {" • "}
              {product.category}

            </p>






            <div
              className="
                mt-3
                sm:mt-4
                flex
                flex-wrap
                items-center
                gap-2
                sm:gap-3
              "
            >


              <span
                className="
                  text-xs
                  sm:text-sm
                  text-slate-400
                  line-through
                "
              >

                {product.old_price} ৳

              </span>





              <span
                className="
                  text-lg
                  sm:text-xl
                  font-bold
                  text-blue-600
                "
              >

                {product.new_price} ৳

              </span>


            </div>







            <div
              className="
                mt-3
                sm:mt-4
                inline-flex
                items-center
                bg-red-100
                text-red-700
                px-3
                sm:px-4
                py-2
                rounded-full
                text-xs
                sm:text-sm
                font-bold
              "
            >

              📉 {Math.abs(product.change_amount)} ৳ OFF

            </div>





          </div>


        ))
      }



      </div>


    </div>

  );

};


export default PriceDrop;