import React from "react";

const ProductTable = ({ products = [], priceChanges = [] }) => {

  const getPriceChange = (product) => {

    // Prevent object.find error
    if (!Array.isArray(priceChanges)) {
      return null;
    }

    return priceChanges.find(
      (item) => item.name === product.name
    );
  };


  const getSourceStyle = (source) => {

    if (source === "Daraz")
      return "bg-pink-100 text-pink-700";

    if (source === "Startech" || source === "Star Tech")
      return "bg-blue-100 text-blue-700";

    if (source === "Ryans")
      return "bg-orange-100 text-orange-700";

    return "bg-slate-100 text-slate-700";
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
      p-4
      sm:p-6
      mt-6
      sm:mt-8
      overflow-hidden
      "
    >

      <div className="mb-4 sm:mb-6">

        <h2
          className="
          text-xl
          sm:text-2xl
          font-bold
          text-slate-900
          "
        >
          📦 Products
        </h2>


        <p
          className="
          text-xs
          sm:text-sm
          text-slate-500
          mt-1
          "
        >
          Live electronics market products
        </p>

      </div>



      <div className="overflow-x-auto scrollbar-thin">


        <table className="w-full min-w-[1050px]">


          <thead>

            <tr
              className="
              bg-slate-100/80
              text-slate-600
              text-sm
              "
            >

              <th className="p-3 sm:p-4 text-left">
                Product
              </th>

              <th className="p-3 sm:p-4">
                Brand
              </th>

              <th className="p-3 sm:p-4">
                Category
              </th>

              <th className="p-3 sm:p-4">
                Source
              </th>

              <th className="p-3 sm:p-4">
                Price
              </th>

              <th className="p-3 sm:p-4">
                Discount
              </th>

              <th className="p-3 sm:p-4">
                Price Change
              </th>

            </tr>

          </thead>



          <tbody>


          {products.map((product,index)=>{


            const change = getPriceChange(product);


            return (

            <tr
              key={index}
              className="
              border-b
              border-slate-100
              hover:bg-blue-50/50
              transition
              "
            >


              <td className="p-3 sm:p-4">

                <div className="flex items-center gap-3">


                {product.image && (

                  <img
                    src={product.image}
                    alt={product.name}
                    className="
                    w-12
                    h-12
                    sm:w-14
                    sm:h-14
                    object-contain
                    rounded-xl
                    border
                    "
                  />

                )}


                <div>

                <h3
                  className="
                  font-semibold
                  text-sm
                  sm:text-base
                  text-slate-800
                  max-w-xs
                  truncate
                  "
                >
                  {product.name}
                </h3>


                </div>


                </div>


              </td>




              <td className="p-3 sm:p-4 text-center">

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
                  {product.brand || "Unknown"}
                </span>

              </td>




              <td className="p-3 sm:p-4 text-center">

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
                  {product.category || "-"}
                </span>

              </td>




              <td className="p-3 sm:p-4 text-center">

                <span
                  className={`
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-semibold
                  ${getSourceStyle(product.source)}
                  `}
                >
                  {product.source || "Unknown"}
                </span>


              </td>




              <td
                className="
                p-3
                text-center
                font-bold
                "
              >

                {product.price} ৳

              </td>





              <td className="p-3 text-center">


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





              <td className="p-3 text-center">


              {!change && (

                <span className="text-slate-400">
                  -
                </span>

              )}



              {
                change?.change_type === "increase" &&

                <span
                  className="
                  bg-red-100
                  text-red-700
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  "
                >

                  📈 +{change.change_amount} ৳

                </span>

              }




              {
                change?.change_type === "decrease" &&

                <span
                  className="
                  bg-green-100
                  text-green-700
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  "
                >

                  📉 {Math.abs(change.change_amount)} ৳

                </span>

              }



              </td>



            </tr>


            );


          })}


          </tbody>


        </table>


      </div>


    </div>

  );

};


export default ProductTable;