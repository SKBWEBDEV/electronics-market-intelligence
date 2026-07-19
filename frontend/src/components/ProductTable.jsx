const ProductTable = ({ products }) => {


  return (

    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">


      <h2 className="text-2xl font-bold mb-6">
        📦 Products
      </h2>




      <div className="overflow-x-auto">


        <table className="w-full">


          <thead>


            <tr className="bg-slate-100">


              <th className="p-4 text-left">
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


            </tr>


          </thead>





          <tbody>


          {products.map((product,index)=>(


            <tr

              key={index}

              className="
                border-b
                hover:bg-slate-50
                transition
              "

            >



              <td className="p-4">


                <div className="flex items-center gap-4">


                  {product.image && (

                    <img

                      src={product.image}

                      alt=""

                      className="
                        w-16
                        h-16
                        object-contain
                        rounded-lg
                      "

                    />

                  )}



                  <div>


                    <h3 className="
                      font-semibold
                      max-w-xs
                    ">

                      {product.name}

                    </h3>


                  </div>


                </div>


              </td>





              <td className="p-4 text-center">


                <span className="
                  bg-blue-100
                  text-blue-700
                  px-3
                  py-1
                  rounded-full
                  text-sm
                ">

                  {product.brand || "Unknown"}

                </span>


              </td>





              <td className="p-4 text-center">


                <span className="
                  bg-gray-100
                  px-3
                  py-1
                  rounded-full
                  text-sm
                ">

                  {product.category}

                </span>


              </td>





              <td className="
                p-4
                text-center
                font-bold
              ">


                {product.price} ৳


              </td>






              <td className="p-4 text-center">


                {

                product.discount ?

                (

                  <span className="
                    bg-green-100
                    text-green-700
                    px-3
                    py-1
                    rounded-full
                    text-sm
                  ">

                    {product.discount}

                  </span>

                )

                :

                (

                  <span>
                    -
                  </span>

                )


                }


              </td>



            </tr>


          ))}



          </tbody>


        </table>


      </div>



    </div>

  );

};


export default ProductTable;