import React from "react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

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
        bg-white
        border
        border-slate-200
        rounded-3xl
        p-6
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >

      <div className="flex items-start justify-between">

        <div>

          <p className="
            text-sm
            font-medium
            text-slate-500
          ">
            {title}
          </p>


          <h3 className="
            mt-3
            text-3xl
            font-bold
            text-slate-900
            tracking-tight
          ">
            {value}
          </h3>


        </div>



        {Icon && (

          <div
            className="
              w-12
              h-12
              flex
              items-center
              justify-center
              rounded-2xl
              bg-blue-50
              text-blue-600
            "
          >

            <Icon className="w-6 h-6"/>

          </div>

        )}


      </div>



      <div className="mt-5 flex items-center justify-between">


        {change && (

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

        )}



        {
          subtext &&
          <span className="
            text-xs
            text-slate-400
          ">
            {subtext}
          </span>
        }


      </div>


    </div>
  );
}