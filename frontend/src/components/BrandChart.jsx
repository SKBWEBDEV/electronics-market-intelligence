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


  // Top 5 Brands
  const topBrands = [...data]
    .sort((a,b)=> b.products - a.products)
    .slice(0,5);



  return (

    <div className="bg-white p-6 rounded-xl shadow mt-8">


      <h2 className="text-2xl font-bold mb-6">

        🔥 Top Brands

      </h2>




      <ResponsiveContainer width="100%" height={350}>


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

          />


        </BarChart>


      </ResponsiveContainer>



    </div>

  );

};


export default BrandChart;