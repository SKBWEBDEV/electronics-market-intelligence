const PriceMovement = ({ data }) => {


  return (

    <div className="
      grid
      grid-cols-1
      md:grid-cols-3
      gap-6
      mt-8
    ">


      {/* Increase */}

      <div className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
        border-l-4
        border-red-500
      ">

        <h3 className="
          text-lg
          font-bold
          text-slate-700
        ">
          📈 Price Increased
        </h3>


        <p className="
          text-3xl
          font-bold
          mt-3
          text-red-600
        ">
          {data?.increase || 0}
        </p>


        <p className="text-slate-500">
          Products
        </p>


      </div>





      {/* Decrease */}

      <div className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
        border-l-4
        border-green-500
      ">


        <h3 className="
          text-lg
          font-bold
          text-slate-700
        ">
          📉 Price Decreased
        </h3>


        <p className="
          text-3xl
          font-bold
          mt-3
          text-green-600
        ">
          {data?.decrease || 0}
        </p>


        <p className="text-slate-500">
          Products
        </p>


      </div>






      {/* Stable */}

      <div className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
        border-l-4
        border-blue-500
      ">


        <h3 className="
          text-lg
          font-bold
          text-slate-700
        ">
          ➡️ Stable Price
        </h3>


        <p className="
          text-3xl
          font-bold
          mt-3
          text-blue-600
        ">
          {data?.stable || 0}
        </p>


        <p className="text-slate-500">
          Products
        </p>


      </div>


    </div>

  );

};


export default PriceMovement;