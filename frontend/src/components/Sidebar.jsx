import { NavLink } from "react-router-dom";


function Sidebar() {

  const menuItems = [
    {
      name: "📊 Dashboard",
      path: "/"
    },
    {
      name: "📦 Products",
      path: "/products"
    },
    {
      name: "📈 Analytics",
      path: "/analytics"
    },
    {
      name: "🕷 Scraper Status",
      path: "/scraper"
    }
  ];


  return (

    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">

      {/* Logo */}

      <div className="mb-10">

        <h1 className="text-2xl font-bold">
          Electro AI
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Market Intelligence
        </p>

      </div>


      {/* Menu */}

      <nav className="mt-8">

  <div className="space-y-4">

    {
      menuItems.map((item)=>(

        <NavLink
          key={item.path}
          to={item.path}
          className={({isActive}) =>
            `w-full px-4 py-3 rounded-xl block transition duration-300 ${
              isActive
              ? "bg-blue-600 text-white"
              : "text-slate-300 hover:bg-slate-800"
            }`
          }
        >

          {item.name}

        </NavLink>

      ))
    }

  </div>

</nav>

    </aside>

  )

}


export default Sidebar;