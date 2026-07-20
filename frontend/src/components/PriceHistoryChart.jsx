import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";


const PriceHistoryChart = ({ products }) => {


  if (!products || products.length === 0) {

    return null;

  }



  const chartData = products.map((item)=>({

    name: item.brand,

    product_name: item.product_name,

    old_price: item.old_price,

    new_price: item.new_price

  }));





  return (

    <div
      className="
        bg-white
        shadow-md
        rounded-2xl
        sm:rounded-3xl
        p-4
        sm:p-6
        mt-6
        sm:mt-8
      "
    >


      <h2
        className="
          text-xl
          sm:text-2xl
          font-bold
          mb-4
          sm:mb-6
        "
      >

        📊 Price Movement Chart

      </h2>





      <div className="w-full overflow-hidden">


        <ResponsiveContainer
          width="100%"
          height={280}
          className="sm:!h-[350px]"
        >


          <LineChart

            data={chartData}

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

              dataKey="name"

              tick={{
                fontSize:12
              }}

            />




            <YAxis

              tick={{
                fontSize:12
              }}

            />




            <Tooltip

              formatter={(value)=>`${value} ৳`}

            />






            <Line

              type="monotone"

              dataKey="old_price"

              stroke="#8884d8"

              strokeWidth={3}

              name="Old Price"

              dot={false}

            />





            <Line

              type="monotone"

              dataKey="new_price"

              stroke="#82ca9d"

              strokeWidth={3}

              name="New Price"

              dot={false}

            />





          </LineChart>


        </ResponsiveContainer>


      </div>



    </div>


  );

};


export default PriceHistoryChart;