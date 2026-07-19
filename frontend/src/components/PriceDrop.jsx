const PriceDrop = ({ products }) => {


  return (

    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">


      <h2 className="text-2xl font-bold mb-6">
        📉 Price Drop Alert
      </h2>




      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">



        {products.map((product,index)=>(


          <div

            key={index}

            className="
              border
              rounded-xl
              p-4
              hover:shadow-lg
              transition
            "

          >



            {product.image && (

              <img

                src={product.image}

                alt=""

                className="
                  w-full
                  h-36
                  object-contain
                  mb-4
                "

              />

            )}





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

              {product.brand || "Unknown"} 
              {" • "}
              {product.category}

            </p>






            <div className="mt-4">


              <span className="
                text-gray-400
                line-through
                mr-3
              ">

                {product.old_price} ৳

              </span>




              <span className="
                text-xl
                font-bold
                text-blue-600
              ">

                {product.price} ৳

              </span>



            </div>





            <div className="
              mt-3
              inline-block
              bg-red-100
              text-red-600
              px-3
              py-1
              rounded-full
              text-sm
              font-semibold
            ">

              ↓ {product.discount} OFF

            </div>



          </div>


        ))}


      </div>



    </div>

  );

};


export default PriceDrop;