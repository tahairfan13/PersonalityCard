import React from "react";
import PanelTitle from "./PanelTitle";
import Attribute from "./Attribute";

function Details({ attributes }) {
  return (
    <div className="panel mt-3 sm:mt-8">
      <PanelTitle title="Details" />
      <div className="flex flex-col gap-1 mt-3">
        {attributes.map((attribute) => (
          <Attribute
            key={attribute[0]}
            title={attribute[0]}
            value={attribute[1]}
          />
        ))}
      </div>
    </div>
  );
}

export default Details;
