import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";


const BrandChart = ({ data }) => {


  const topBrands = [...(data || [])]
    .sort((a,b)=> b.products - a.products)
    .slice(0,5);



  return (

    <div
      className="
        relative
        overflow-hidden
        bg-white/90
        backdrop-blur-xl
        border
        border-slate-200/70
        rounded-3xl
        shadow-sm
        p-4
        sm:p-6
        hover:shadow-xl
        transition-all
        duration-300
      "
    >


      {/* Top Gradient */}

      <div
        className="
          absolute
          top-0
          left-0
          w-full
          h-1
          bg-gradient-to-r
          from-orange-500
          to-red-500
        "
      />



      <div className="mb-4 sm:mb-6">


        <h2
          className="
            text-lg
            sm:text-xl
            font-bold
            text-slate-900
          "
        >
          🔥 Top Brands
        </h2>


        <p
          className="
            text-xs
            sm:text-sm
            text-slate-500
            mt-1
          "
        >
          Most available brands in market
        </p>


      </div>





      {
        topBrands.length > 0 ?


        <div className="w-full overflow-x-auto">


          <ResponsiveContainer
            width="100%"
            height={280}
            className="sm:!h-[350px]"
          >

            <BarChart
              data={topBrands}
              margin={{
                top:10,
                right:10,
                left:-10,
                bottom:10
              }}
            >


              <CartesianGrid
                strokeDasharray="3 3"
              />


              <XAxis
                dataKey="brand"
                tick={{
                  fontSize:12
                }}
              />


              <YAxis
                tick={{
                  fontSize:12
                }}
              />


              <Tooltip />


              <Bar
                dataKey="products"
                radius={[8,8,0,0]}
                fill="#6366f1"
              />


            </BarChart>


          </ResponsiveContainer>


        </div>



        :



        <div
          className="
            h-[280px]
            sm:h-[350px]
            flex
            items-center
            justify-center
            text-sm
            sm:text-base
            text-slate-400
          "
        >

          No brand data available

        </div>


      }



    </div>

  );

};


export default BrandChart;