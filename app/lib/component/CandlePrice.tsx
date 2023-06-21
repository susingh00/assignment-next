import React from "react";
export function CandlePrice({
  currentPrice,
  label,
}: {
  currentPrice: number;
  label: string;
}) {
  return (
    <>
      <span className="text-gray-400 mx-1">{label}</span>
      <span className="text-green-600" id="price-action">
        {currentPrice}
      </span>
    </>
  );
}
