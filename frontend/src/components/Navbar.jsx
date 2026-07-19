function Navbar() {

  return (

    <header className="bg-white border-b p-4 flex justify-between items-center">

      <div>
        <h2 className="text-xl font-semibold">
          Electronics Market Dashboard
        </h2>

        <p className="text-sm text-gray-500">
          Real-time price monitoring system
        </p>
      </div>


      <div className="flex items-center gap-6">


        <div className="text-sm">
          🟢 System Running
        </div>


        <div className="bg-slate-100 px-4 py-2 rounded-lg">
          Admin
        </div>


      </div>


    </header>

  )

}


export default Navbar;