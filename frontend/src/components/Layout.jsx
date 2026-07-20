import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";


function Layout({children}) {


  const [open, setOpen] = useState(false);



  return (

    <div className="flex min-h-screen">


      {/* Sidebar */}

      <Sidebar
        open={open}
        setOpen={setOpen}
      />




      {/* Mobile Overlay */}

      {
        open && (

          <div

            onClick={()=>setOpen(false)}

            className="
              fixed
              inset-0
              bg-black/50
              z-40
              lg:hidden
            "

          />

        )
      }






      <div
        className="
          flex-1
          bg-slate-50
          lg:ml-64
        "
      >


        <Navbar
          setOpen={setOpen}
        />



        <main className="p-4 sm:p-6">

          {children}

        </main>


      </div>



    </div>

  )

}


export default Layout;