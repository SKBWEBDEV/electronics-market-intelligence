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

    product_name:item.product_name,

    old_price:item.old_price,

    new_price:item.new_price

}));




  return (

    <div className="bg-white shadow-md rounded-xl p-6 mt-8">


      <h2 className="text-2xl font-bold mb-6">

        📊 Price Movement Chart

      </h2>




      <ResponsiveContainer width="100%" height={350}>


        <LineChart data={chartData}>


          <CartesianGrid strokeDasharray="3 3" />


          <XAxis 
            dataKey="name"
          />


          <YAxis />


          <Tooltip

formatter={(value)=>`${value} ৳`}

/>



          <Line

            type="monotone"

            dataKey="old_price"

            stroke="#8884d8"

            strokeWidth={3}

            name="Old Price"

          />



          <Line

            type="monotone"

            dataKey="new_price"

            stroke="#82ca9d"

            strokeWidth={3}

            name="New Price"

          />



        </LineChart>


      </ResponsiveContainer>


    </div>


  );

};


export default PriceHistoryChart;