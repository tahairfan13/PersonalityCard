import React from "react";

function Attribute({ title, value }) {
  return (
    <div className="flex">
      <h1 className="text-base sm:text-xl sm:min-w-[150px] min-w-[120px] text-gray-100 font-bold capitalize">
        {title}:
      </h1>
      <p className="text-base sm:text-xl text-gray-100 break-all">{value}</p>
    </div>
  );
}

export default Attribute;
