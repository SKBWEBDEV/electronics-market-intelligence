import React from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from "lucide-react";


export default function StatsCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  subtext,
}) {

  return (

    <div
      className="
        relative
        overflow-hidden
        bg-white/90
        backdrop-blur-xl
        border
        border-slate-200/70
        rounded-3xl
        p-4
        sm:p-6
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >


      {/* Top Gradient Line */}

      <div
        className="
          absolute
          top-0
          left-0
          w-full
          h-1
          bg-gradient-to-r
          from-blue-500
          to-indigo-600
        "
      />





      <div
        className="
          flex
          items-start
          justify-between
          gap-3
        "
      >


        <div className="min-w-0">


          <p
            className="
              text-xs
              sm:text-sm
              font-medium
              text-slate-500
              truncate
            "
          >

            {title}

          </p>





          <h3
            className="
              mt-2
              sm:mt-3
              text-2xl
              sm:text-3xl
              font-bold
              text-slate-900
              tracking-tight
            "
          >

            {value}

          </h3>



        </div>







        {
          Icon && (

            <div
              className="
                w-10
                h-10
                sm:w-12
                sm:h-12
                flex
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-blue-500
                to-indigo-600
                text-white
                shadow-lg
                shadow-blue-200
                shrink-0
              "
            >

              <Icon
                className="
                  w-5
                  h-5
                  sm:w-6
                  sm:h-6
                "
              />

            </div>

          )
        }


      </div>








      <div
        className="
          mt-4
          sm:mt-5
          flex
          flex-wrap
          items-center
          justify-between
          gap-2
        "
      >




        {
          change && (

            <span
              className={`
                inline-flex
                items-center
                gap-1
                px-3
                py-1
                rounded-full
                text-xs
                font-semibold

                ${
                  changeType === "positive"
                  ?
                  "bg-emerald-50 text-emerald-700"
                  :
                  changeType === "negative"
                  ?
                  "bg-red-50 text-red-700"
                  :
                  "bg-slate-100 text-slate-600"
                }
              `}
            >



              {
                changeType === "positive" &&
                <ArrowUpRight className="w-3 h-3"/>
              }



              {
                changeType === "negative" &&
                <ArrowDownRight className="w-3 h-3"/>
              }



              {
                changeType === "neutral" &&
                <Minus className="w-3 h-3"/>
              }



              {change}


            </span>

          )
        }







        {
          subtext && (

            <span
              className="
                text-xs
                text-slate-400
              "
            >

              {subtext}

            </span>

          )
        }





      </div>








      {/* Background Decoration */}

      <div
        className="
          absolute
          right-0
          bottom-0
          w-20
          h-20
          sm:w-24
          sm:h-24
          bg-blue-100
          rounded-full
          opacity-30
          translate-x-10
          translate-y-10
        "
      />



    </div>

  );

}