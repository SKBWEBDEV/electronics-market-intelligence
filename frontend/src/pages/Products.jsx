import { useEffect, useState } from "react";
import ProductTable from "../components/ProductTable";
import api from "../api/axios";

function Products() {


  const [products, setProducts] = useState([]);
  const [priceChanges, setPriceChanges] = useState([]);
  const [loading, setLoading] = useState(true);



useEffect(() => {


 const fetchProducts = async()=>{


  try{


    const productRes = await api.get(
      "/products/"
    );


    setProducts(
      productRes.data.products || productRes.data
    );



    const changeRes = await api.get(
      "/products/price-history"
    );


    setPriceChanges(
      Array.isArray(changeRes.data)
      ? changeRes.data
      : []
    );



  }catch(error){


    console.log(
      "Products Error:",
      error
    );


  }finally{


    setLoading(false);


  }


 };


 fetchProducts();


},[]);




  return (


    <div
      className="
        w-full
        min-h-screen
        p-3
        sm:p-5
        lg:p-6
      "
    >



      {
        loading ? (


          <div
            className="
              flex
              items-center
              justify-center
              min-h-[250px]
              text-slate-500
              text-sm
              sm:text-base
            "
          >

            Loading products...

          </div>


        ) : products.length === 0 ? (


          <div
            className="
              bg-white
              rounded-2xl
              sm:rounded-3xl
              p-6
              sm:p-8
              text-center
              shadow-sm
              border
              border-slate-200
              text-slate-500
            "
          >

            No products found

          </div>


        ) : (


          <div
            className="
              w-full
              overflow-hidden
            "
          >

            <ProductTable

              products={products}

              priceChanges={priceChanges}

            />

          </div>


        )
      }



    </div>


  );

}


export default Products;