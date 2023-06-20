import dynamic from "next/dynamic";
import { ChartType } from "../utils/types/Chart.type";
import { OHLC } from "../utils/constant";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
export const Chart = (props: ChartType) => {
  return (
    <div style={{ height: "80vh" }}>
      <ReactApexChart
        options={props.options}
        series={[{ data: props.series }]}
        type={props.type}
        height={"100%"}
        width={"100%"}
      />
    </div>
  );
};
Chart.defaultProps = {
  type: "candlestick",
  options: {
    chart: {
      foreColor: "#ccc",
      toolbar: {
        show: true,
      },
      animations: {
        enabled: false,
      },
      zoom: {
        enabled: true,
        type: "x",
        resetIcon: {
          offsetX: -10,
          offsetY: 0,
          fillColor: "#fff",
          strokeColor: "#37474F",
        },
        selection: {
          background: "#90CAF9",
          border: "#0D47A1",
        },
      },
      events: {
        mouseMove: () => {
          let elements = document.querySelector(".apexcharts-tooltip-box");
          if (elements) {
            let childNodes = elements.childNodes;
            if (childNodes.length) {
              const open =
                childNodes[OHLC.open].textContent?.split(": ")[1] ?? "";
              const high =
                childNodes[OHLC.high].textContent?.split(": ")[1] ?? "";
              const low =
                childNodes[OHLC.low].textContent?.split(": ")[1] ?? "";
              const close =
                childNodes[OHLC.close].textContent?.split(": ")[1] ?? "";
              const ids = document.querySelectorAll("#price-action");
              if (ids.length) {
                ids[OHLC.open].innerHTML = open;
                ids[OHLC.high].innerHTML = high;
                ids[OHLC.low].innerHTML = low;
                ids[OHLC.close].innerHTML = close;
                if (open <= close) {
                  ids.forEach((id) => {
                    id.classList.remove("text-red-400");
                    id.classList.add("text-green-400");
                  });
                } else if (open > close) {
                  ids.forEach((id) => {
                    id.classList.remove("text-green-400");
                    id.classList.add("text-red-400");
                  });
                }
              }
            }
          }
        },
      },
    },
    tooltip: {
      theme: "dark",
    },
    grid: {
      borderColor: "#cccccc40",
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      type: "datetime",
      title: {
        style: {
          color: "#fff",
        },
      },
    },
    yaxis: {
      opposite: true,
      enabled: true,
      tickAmount: 10,
      labels: {
        formatter: (value: number) => {
          return value.toFixed(2);
        },
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#01a781",
          downward: "#f53f47",
        },
        wick: {
          useFillColor: true,
        },
      },
    },
  },
};
