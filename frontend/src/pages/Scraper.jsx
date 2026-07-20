import { useEffect, useState } from "react";


function Scraper() {


  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(()=>{


    fetch("http://127.0.0.1:8000/scraper")

      .then(res => res.json())

      .then(data => {

        setStatus(data);

      })

      .catch(err => {

        console.log(err);

      })

      .finally(()=>{

        setLoading(false);

      });



  },[]);






  return (


    <div
      className="
        p-4
        sm:p-6
      "
    >




      <h1
        className="
          text-2xl
          sm:text-3xl
          font-bold
          text-slate-900
        "
      >

        🕷 Scraper Status

      </h1>





      <p
        className="
          text-sm
          sm:text-base
          text-slate-500
          mt-2
        "
      >

        Automated electronics data collection system

      </p>









      {/* Cards */}


      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          gap-4
          sm:gap-6
          mt-6
          sm:mt-8
        "
      >






        {/* Status */}


        <div
          className="
            bg-white
            rounded-3xl
            shadow-sm
            border
            border-slate-200
            p-5
            sm:p-6
            hover:shadow-xl
            transition
          "
        >


          <h3 className="text-slate-500 text-sm">

            System Status

          </h3>



          <p
            className="
              text-xl
              sm:text-2xl
              font-bold
              text-green-600
              mt-3
            "
          >

            🟢 Running

          </p>


        </div>









        {/* Sources */}


        <div
          className="
            bg-white
            rounded-3xl
            shadow-sm
            border
            border-slate-200
            p-5
            sm:p-6
            hover:shadow-xl
            transition
          "
        >


          <h3 className="text-slate-500 text-sm">

            Data Sources

          </h3>




          <div
            className="
              mt-3
              space-y-2
              text-slate-700
            "
          >

            <p>
              ✓ Star Tech
            </p>


            <p>
              ✓ Ryans
            </p>


          </div>


        </div>









        {/* Scheduler */}


        <div
          className="
            bg-white
            rounded-3xl
            shadow-sm
            border
            border-slate-200
            p-5
            sm:p-6
            hover:shadow-xl
            transition
          "
        >


          <h3 className="text-slate-500 text-sm">

            Scheduler

          </h3>




          <p
            className="
              text-lg
              sm:text-xl
              font-bold
              mt-3
              text-slate-800
            "
          >

            Daily Auto Scraping

          </p>


        </div>




      </div>









      {/* API Response */}


      {
        loading ?


        <div
          className="
            mt-8
            text-slate-500
          "
        >

          Loading scraper information...

        </div>




        :



        status && (


          <div
            className="
              bg-white
              rounded-3xl
              shadow-sm
              border
              border-slate-200
              p-4
              sm:p-6
              mt-8
            "
          >


            <h2
              className="
                text-lg
                sm:text-xl
                font-bold
                mb-4
              "
            >

              ⚙️ Scraper Information

            </h2>




            <pre
              className="
                bg-slate-100
                p-4
                rounded-xl
                overflow-x-auto
                text-xs
                sm:text-sm
              "
            >

              {JSON.stringify(status,null,2)}

            </pre>



          </div>


        )

      }




    </div>


  );

}


export default Scraper;