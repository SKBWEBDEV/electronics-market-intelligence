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
        p-6
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



      <div className="mb-6">


        <h2
          className="
            text-xl
            font-bold
            text-slate-900
          "
        >
          🔥 Top Brands
        </h2>


        <p
          className="
            text-sm
            text-slate-500
            mt-1
          "
        >
          Most available brands in market
        </p>


      </div>





      {
        topBrands.length > 0 ?


        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <BarChart data={topBrands}>


            <CartesianGrid
              strokeDasharray="3 3"
            />


            <XAxis
              dataKey="brand"
            />


            <YAxis />


            <Tooltip />


            <Bar
              dataKey="products"
              radius={[8,8,0,0]}
              fill="#6366f1"
            />


          </BarChart>


        </ResponsiveContainer>



        :



        <div
          className="
            h-[350px]
            flex
            items-center
            justify-center
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