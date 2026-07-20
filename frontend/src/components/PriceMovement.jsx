const PriceMovement = ({ data }) => {

  return (

    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        gap-4
        sm:gap-6
        mt-6
        sm:mt-8
      "
    >

      {/* Increase */}

      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          p-4
          sm:p-6
          border-l-4
          border-red-500
          hover:shadow-xl
          transition
        "
      >

        <h3
          className="
            text-base
            sm:text-lg
            font-bold
            text-slate-700
          "
        >
          📈 Price Increased
        </h3>


        <p
          className="
            text-2xl
            sm:text-3xl
            font-bold
            mt-3
            text-red-600
          "
        >
          {data?.price_increased || 0}
        </p>


        <p className="text-sm text-slate-500">
          Products
        </p>

      </div>


      {/* Decrease */}

      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          p-4
          sm:p-6
          border-l-4
          border-green-500
          hover:shadow-xl
          transition
        "
      >

        <h3
          className="
            text-base
            sm:text-lg
            font-bold
            text-slate-700
          "
        >
          📉 Price Decreased
        </h3>


        <p
          className="
            text-2xl
            sm:text-3xl
            font-bold
            mt-3
            text-green-600
          "
        >
          {data?.price_decreased || 0}
        </p>


        <p className="text-sm text-slate-500">
          Products
        </p>

      </div>


      {/* Stable */}

      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          p-4
          sm:p-6
          border-l-4
          border-blue-500
          hover:shadow-xl
          transition
        "
      >

        <h3
          className="
            text-base
            sm:text-lg
            font-bold
            text-slate-700
          "
        >
          ➡️ Stable Price
        </h3>


        <p
          className="
            text-2xl
            sm:text-3xl
            font-bold
            mt-3
            text-blue-600
          "
        >
          {data?.price_stable || 0}
        </p>


        <p className="text-sm text-slate-500">
          Products
        </p>

      </div>


    </div>

  );

};


export default PriceMovement;