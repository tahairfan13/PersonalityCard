import React from "react";

function TraitTag({ trait }) {
  return (
    <span className="text-base sm:text-lg bg-basic px-5 p-1 rounded-lg text-gray-100 font-medium">
      {trait}
    </span>
  );
}

export default TraitTag;
