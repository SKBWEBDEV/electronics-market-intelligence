const PriceHistory = ({ products }) => {


  if (!products || products.length === 0) {

    return null;

  }





  return (

    <div className="bg-white rounded-xl shadow-md p-6 mt-8">


      <h2 className="text-2xl font-bold mb-6">

        📈 Price History

      </h2>





      <div className="space-y-5">



        {products.map((item, index) => {


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

              className="border rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"

            >



              {/* Product Info */}

              <div>


                <h3 className="font-semibold text-lg">

                  {item.product_name}

                </h3>



                <p className="text-gray-500">

                  {item.brand}

                </p>


              </div>







              {/* Price */}

              <div className="text-right">



                <div className="flex items-center gap-3 justify-end">


                  <span className="text-gray-500 line-through">

                    {item.old_price} ৳

                  </span>



                  <span className="font-bold text-lg">

                    {item.new_price} ৳

                  </span>


                </div>





                {increase && (

                  <p className="text-red-500 font-semibold">

                    📈 +{difference} ৳ Increase

                  </p>

                )}





                {decrease && (

                  <p className="text-green-600 font-semibold">

                    📉 -{difference} ৳ Decrease

                  </p>

                )}





              </div>



            </div>


          );


        })}



      </div>



    </div>


  );

};


export default PriceHistory;