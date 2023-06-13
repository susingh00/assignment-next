import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="flex justify-between px-2">
      <button className="px-2">
        <i className="fa fa-window-restore fa-fw text-blue-400"></i>
      </button>
      <div className="flex px-2">
        <p className="text-sm text-blue-400">FULL BOOK</p>
        <div
          className="text-gray-400 mx-2"
          style={{ borderLeft: " solid 0.5px", height: "20px" }}
        />
        <Link href={"#"} className="text-sm text-gray-400">
          <i className="fa fa-circle fa-fw text-green-600"></i>
          REAL TIME
        </Link>
      </div>
    </div>
  );
}
