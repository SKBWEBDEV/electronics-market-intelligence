function Navbar({setOpen}) {

  return (

    <header 
      className="
      bg-white
      border-b
      p-4
      flex
      items-center
      gap-4
      "
    >


      {/* Mobile Menu Button */}

      <button

        onClick={()=>setOpen(true)}

        className="
        lg:hidden
        bg-slate-900
        text-white
        w-10
        h-10
        rounded-xl
        text-xl
        "
      >

        ☰

      </button>




      <div>

        <h2 className="text-xl font-semibold">

          Electronics Market Dashboard

        </h2>


        <p className="text-sm text-gray-500">

          Real-time price monitoring system

        </p>


      </div>



      <div className="ml-auto">

        🟢 System Running

      </div>



    </header>

  )

}


export default Navbar;