import { useEffect, useState } from "react";
import ProductTable from "../components/ProductTable";


function Products() {


  const [products, setProducts] = useState([]);
  const [priceChanges, setPriceChanges] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {


    const fetchProducts = async () => {


      try {


        const productRes = await fetch(
          "http://127.0.0.1:8000/products/"
        );


        const productData = await productRes.json();


        setProducts(
          productData.products || []
        );



        const changeRes = await fetch(
          "http://127.0.0.1:8000/products/price-changes"
        );


        const changeData = await changeRes.json();


        setPriceChanges(
          changeData || []
        );


      } catch(error) {


        console.log(
          "API Error:",
          error
        );


      } finally {


        setLoading(false);


      }


    };



    fetchProducts();


  }, []);





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