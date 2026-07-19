import React from "react";


export default function InfoCard({
  title,
  icon,
  children,
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
        p-6
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
      "
    >


      {/* Top Line */}

      <div
        className="
          absolute
          top-0
          left-0
          w-full
          h-1
          bg-gradient-to-r
          from-indigo-500
          to-blue-500
        "
      />


      <div
        className="
          flex
          items-center
          gap-3
          mb-5
        "
      >

        <div
          className="
            w-12
            h-12
            rounded-2xl
            bg-gradient-to-br
            from-indigo-500
            to-blue-600
            flex
            items-center
            justify-center
            text-white
            text-xl
            shadow-lg
          "
        >

          {icon}

        </div>


        <h2
          className="
            text-lg
            font-bold
            text-slate-800
          "
        >
          {title}
        </h2>


      </div>



      {children}



      {/* Decoration */}

      <div
        className="
          absolute
          right-0
          bottom-0
          w-24
          h-24
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