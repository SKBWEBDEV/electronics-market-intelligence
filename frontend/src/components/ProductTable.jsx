import React from "react";


const ProductTable = ({ products, priceChanges }) => {


  const getPriceChange = (product) => {

    return priceChanges?.find(
      (item) => item.name === product.name
    );

  };



  return (

    <div
      className="
        bg-white/90
        backdrop-blur-xl
        border
        border-slate-200/70
        rounded-3xl
        shadow-sm
        p-6
        mt-8
        overflow-hidden
      "
    >


      {/* Header */}

      <div className="mb-6">

        <h2
          className="
            text-2xl
            font-bold
            text-slate-900
          "
        >
          📦 Products
        </h2>


        <p
          className="
            text-sm
            text-slate-500
            mt-1
          "
        >
          Live electronics market products
        </p>


      </div>




      <div className="overflow-x-auto">


        <table className="w-full">


          <thead>


            <tr
              className="
                bg-slate-100/80
                text-slate-600
                text-sm
              "
            >


              <th className="p-4 text-left rounded-l-xl">
                Product
              </th>


              <th className="p-4">
                Brand
              </th>


              <th className="p-4">
                Category
              </th>


              <th className="p-4">
                Price
              </th>


              <th className="p-4">
                Discount
              </th>


              <th className="p-4 rounded-r-xl">
                Price Change
              </th>


            </tr>


          </thead>





          <tbody>


          {
            products.map((product,index)=>{


              const change = getPriceChange(product);



              return (

              <tr

                key={index}

                className="
                  border-b
                  border-slate-100
                  hover:bg-blue-50/50
                  transition
                  duration-200
                "

              >




                <td className="p-4">


                  <div
                    className="
                      flex
                      items-center
                      gap-4
                    "
                  >


                    {
                      product.image && (

                        <img

                          src={product.image}

                          alt={product.name}

                          className="
                            w-14
                            h-14
                            object-contain
                            rounded-xl
                            border
                          "

                        />

                      )
                    }




                    <div>


                      <h3
                        className="
                          font-semibold
                          text-slate-800
                          max-w-xs
                          truncate
                        "
                      >

                        {product.name}

                      </h3>


                      <p
                        className="
                          text-xs
                          text-slate-400
                          mt-1
                        "
                      >
                        Electronics
                      </p>


                    </div>


                  </div>


                </td>







                <td className="p-4 text-center">


                  <span
                    className="
                      bg-blue-100
                      text-blue-700
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-semibold
                    "
                  >

                    {product.brand || "Unknown"}

                  </span>


                </td>







                <td className="p-4 text-center">


                  <span
                    className="
                      bg-slate-100
                      text-slate-700
                      px-3
                      py-1
                      rounded-full
                      text-xs
                    "
                  >

                    {product.category}

                  </span>


                </td>







                <td
                  className="
                    p-4
                    text-center
                    font-bold
                    text-slate-900
                  "
                >

                  {product.price} ৳

                </td>








                <td className="p-4 text-center">


                {
                  product.discount ?


                  <span
                    className="
                      bg-emerald-100
                      text-emerald-700
                      px-3
                      py-1
                      rounded-full
                      text-xs
                    "
                  >

                    {product.discount}

                  </span>


                  :

                  <span className="text-slate-400">
                    -
                  </span>

                }


                </td>








                <td className="p-4 text-center">


                {

                  !change ?


                  <span className="text-slate-400">
                    -
                  </span>



                  :



                  change.change_type === "increase" ?


                  <span
                    className="
                      bg-red-100
                      text-red-700
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-semibold
                    "
                  >

                    📈 +{change.change_amount} ৳

                  </span>





                  :



                  change.change_type === "decrease" ?


                  <span
                    className="
                      bg-green-100
                      text-green-700
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-semibold
                    "
                  >

                    📉 {Math.abs(change.change_amount)} ৳

                  </span>





                  :

                  <span className="text-slate-400">
                    -
                  </span>


                }


                </td>





              </tr>


              );


            })

          }



          </tbody>


        </table>


      </div>



    </div>

  );

};



export default ProductTable;