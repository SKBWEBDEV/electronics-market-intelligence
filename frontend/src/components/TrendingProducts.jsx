const TrendingProducts = ({ products }) => {

  return (

    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">


      <h2 className="text-2xl font-bold mb-6">
        🔥 Trending Products
      </h2>



      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


        {products.map((product, index)=>(


          <div

            key={index}

            className="
              border
              rounded-xl
              p-4
              hover:shadow-xl
              transition
              bg-white
            "

          >


            {/* Product Image */}

            <div className="
              h-48
              flex
              items-center
              justify-center
              bg-slate-50
              rounded-lg
              mb-4
            ">

              {product.image && (

                <img
  src={product.image}
  alt=""
  onError={(e)=>{
    e.target.style.display="none";
  }}
  className="
    max-h-44
    object-contain
  "
/>

              )}

            </div>




            <h3 className="
              font-semibold
              text-slate-800
              line-clamp-2
            ">

              {product.name}

            </h3>




            <p className="
              text-sm
              text-gray-500
              mt-2
            ">

              {product.brand} • {product.category}

            </p>




            <div className="mt-3">


              <span className="
                text-xl
                font-bold
                text-blue-600
              ">

                {product.price} ৳

              </span>



              {product.old_price && (

                <span className="
                  ml-3
                  text-sm
                  line-through
                  text-gray-400
                ">

                  {product.old_price} ৳

                </span>

              )}


            </div>




            <a

              href={product.url}

              target="_blank"

              className="
                inline-block
                mt-4
                text-blue-600
                font-medium
                hover:underline
              "

            >

              View Product →

            </a>



          </div>


        ))}



      </div>


    </div>

  );

};


export default TrendingProducts;