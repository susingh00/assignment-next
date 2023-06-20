import { routes } from "@/app/lib/utils/routes";
import Link from "next/link";

export const OhlcChartHeader = () => {
  return (
    <div className="flex justify-between p-2 border-gray-400 border-b-2">
      <h3>
        CHART <span className="text-gray-400">BTC/USD</span>
      </h3>
      <div className="flex items-center">
        <input type="checkbox" className="mr-2" checked={true} />
        <p className="max-[500px]:hidden text-gray-400 text-sm">
          SHOW LIQUIDATIONS
        </p>
        <i className="fa-solid fa-arrows-rotate text-gray-200 ms-2 text-sm"></i>
        <Link className="mx-2 border-2 px-2 rounded" href={routes.ORDER_BOOK}>
          Book Order&apos;s
        </Link>
      </div>
    </div>
  );
};
