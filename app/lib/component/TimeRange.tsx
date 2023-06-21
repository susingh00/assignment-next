import { EPOCH_TIME } from "../utils/constant";
import { updateTimeFrame } from "../utils/types/OHLC.type";

export const TimeRange = ({
  updateTimeFrame,
  currentTime,
}: {
  updateTimeFrame: updateTimeFrame;
  currentTime: string;
}) => {
  return (
    <div>
      {Object.keys(EPOCH_TIME).map((time, index) => (
        <button
          className="p-2"
          onClick={() => updateTimeFrame(time)}
          key={index}
        >
          <p
            className={`text-sm ${
              currentTime === time ? "text-white" : "text-gray-400"
            }`}
          >
            {time}
          </p>
        </button>
      ))}
    </div>
  );
};
