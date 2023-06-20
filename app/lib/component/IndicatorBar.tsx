import React from "react";
import { EPOCH_TIME } from "../utils/constant";

export function IndicatorBar({ time }: { time: string }) {
  return (
    <div className="flex">
      <button className="p-2">
        <p className="text-sm text-gray-400">{EPOCH_TIME[time].timeFrame}</p>
      </button>
      <button className="p-2">
        <span className="text-sm text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 28 28"
            width="28"
            height="28"
            fill="currentColor"
          >
            <path d="M17 11v6h3v-6h-3zm-.5-1h4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5z"></path>
            <path d="M18 7h1v3.5h-1zm0 10.5h1V21h-1z"></path>
            <path d="M9 8v12h3V8H9zm-.5-1h4a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5z"></path>
            <path d="M10 4h1v3.5h-1zm0 16.5h1V24h-1z"></path>
          </svg>
        </span>
      </button>
      <button className="p-2">
        <p className="text-sm  text-gray-400">Indicators</p>
      </button>
    </div>
  );
}
