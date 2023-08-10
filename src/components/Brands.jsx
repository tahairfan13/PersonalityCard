import React from "react";
import PanelTitle from "./PanelTitle";
import TraitTag from "./TraitTag";

function Brands({ brands }) {
  return (
    <div className="panel mt-7">
      <PanelTitle title="Brands" />
      <div className="mt-2 flex gap-2 flex-wrap">
        {brands.map((brand, i) => (
          <TraitTag key={`${brand}-${i}`} trait={brand} />
        ))}
      </div>
    </div>
  );
}

export default Brands;
