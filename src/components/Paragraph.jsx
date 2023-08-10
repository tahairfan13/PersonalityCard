import React from "react";

function Paragraph({ info }) {
  return (
    <div className="panel mt-3 sm:mt-7">
      <p className="text-lg sm:text-xl text-gray-100">{info}</p>
    </div>
  );
}

export default Paragraph;
