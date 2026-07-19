import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";


const CategoryChart = ({ data }) => {


  const categories = [...(data || [])]
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
          from-purple-500
          to-pink-500
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
          📊 Category Analytics
        </h2>



        <p
          className="
            text-sm
            text-slate-500
            mt-1
          "
        >
          Product distribution by category
        </p>


      </div>





      {
        categories.length > 0 ?


        <ResponsiveContainer
          width="100%"
          height={350}
        >


          <BarChart data={categories}>


            <CartesianGrid
              strokeDasharray="3 3"
            />



            <XAxis
              dataKey="category"
            />



            <YAxis />



            <Tooltip />



            <Bar

              dataKey="products"

              radius={[
                8,
                8,
                0,
                0
              ]}

              fill="#a855f7"

            />



          </BarChart>


        </ResponsiveContainer>



        :



        <div
          className="
            h-87.5
            flex
            items-center
            justify-center
            text-slate-400
          "
        >

          No category data available

        </div>


      }



    </div>

  );

};


export default CategoryChart;