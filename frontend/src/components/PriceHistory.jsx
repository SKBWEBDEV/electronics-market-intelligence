const PriceHistory = ({ products }) => {


  if (!products || products.length === 0) {

    return null;

  }





  return (

    <div
      className="
        bg-white
        rounded-2xl
        sm:rounded-3xl
        shadow-md
        p-4
        sm:p-6
        mt-6
        sm:mt-8
      "
    >


      <h2
        className="
          text-xl
          sm:text-2xl
          font-bold
          mb-4
          sm:mb-6
        "
      >

        📈 Price History

      </h2>







      <div className="space-y-4 sm:space-y-5">



        {
          products.map((item, index) => {


            const increase =
              item.new_price > item.old_price;



            const decrease =
              item.new_price < item.old_price;



            const difference = Math.abs(
              item.new_price - item.old_price
            );





            return (


              <div

                key={index}

                className="
                  border
                  rounded-xl
                  p-4
                  sm:p-5
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-4
                "

              >



                {/* Product Info */}

                <div className="min-w-0">


                  <h3
                    className="
                      font-semibold
                      text-base
                      sm:text-lg
                      text-slate-800
                      truncate
                    "
                  >

                    {item.product_name}

                  </h3>



                  <p
                    className="
                      text-sm
                      text-gray-500
                      mt-1
                    "
                  >

                    {item.brand}

                  </p>


                </div>









                {/* Price */}

                <div
                  className="
                    text-left
                    md:text-right
                  "
                >



                  <div
                    className="
                      flex
                      flex-wrap
                      items-center
                      md:justify-end
                      gap-2
                      sm:gap-3
                    "
                  >


                    <span
                      className="
                        text-sm
                        text-gray-500
                        line-through
                      "
                    >

                      {item.old_price} ৳

                    </span>





                    <span
                      className="
                        font-bold
                        text-base
                        sm:text-lg
                        text-slate-900
                      "
                    >

                      {item.new_price} ৳

                    </span>


                  </div>








                  {
                    increase && (

                      <p
                        className="
                          text-red-500
                          font-semibold
                          text-sm
                          mt-2
                        "
                      >

                        📈 +{difference} ৳ Increase

                      </p>

                    )
                  }








                  {
                    decrease && (

                      <p
                        className="
                          text-green-600
                          font-semibold
                          text-sm
                          mt-2
                        "
                      >

                        📉 -{difference} ৳ Decrease

                      </p>

                    )
                  }






                </div>



              </div>


            );


          })
        }



      </div>



    </div>


  );

};


export default PriceHistory;