import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";


const CategoryChart = ({ data }) => {


  return (

    <div className="bg-white p-6 rounded-2xl shadow-md mt-8">


      <h2 className="text-2xl font-bold mb-6">

        📊 Category Analytics

      </h2>



      <ResponsiveContainer 
        width="100%" 
        height={350}
      >


        <BarChart data={data}>


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
          />


        </BarChart>


      </ResponsiveContainer>


    </div>

  );

};


export default CategoryChart;