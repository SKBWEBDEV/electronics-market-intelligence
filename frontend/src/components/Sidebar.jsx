import { NavLink } from "react-router-dom";

function Sidebar({ open, setOpen }) {

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

    <aside

      className={`
        fixed
        top-0
        left-0
        z-50
        w-64
        h-screen
        bg-slate-900
        text-white
        p-6
        transition-transform
        duration-300
        shadow-xl

        ${open ? "translate-x-0" : "-translate-x-full"}

        lg:translate-x-0
      `}

    >


      {/* Mobile Close Button */}

      <button

        onClick={() => setOpen(false)}

        className="
          lg:hidden
          absolute
          top-4
          right-4
          bg-slate-800
          hover:bg-slate-700
          w-9
          h-9
          rounded-xl
          text-xl
        "

      >

        ✕

      </button>



      {/* Logo */}

      <div className="mb-10">

        <h1 className="text-2xl font-bold">
          Electro AI
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Market Intelligence
        </p>

      </div>



      {/* Navigation */}

      <nav>

        <div className="space-y-3">


          {
            menuItems.map((item)=>(

              <NavLink

                key={item.path}

                to={item.path}

                onClick={() => setOpen(false)}

                className={({isActive}) =>

                  `
                    block
                    px-4
                    py-3
                    rounded-xl
                    transition
                    duration-300
                    font-medium

                    ${
                      isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      :
                      "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }

                  `
                }

              >

                {item.name}


              </NavLink>

            ))
          }


        </div>

      </nav>


    </aside>

  );
}


export default Sidebar;