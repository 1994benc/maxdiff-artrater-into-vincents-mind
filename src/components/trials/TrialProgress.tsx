import React, { ReactElement } from "react";
import { ITrial } from "../../interfaces/trial";

interface Props {
  trials: ITrial[];
  jumpToIndex:Function;
}

export default function TrialProgress({ trials , jumpToIndex}: Props): ReactElement {
  if (!trials || trials.length === 0) {
    return <div></div>;
  }
  return (
    <div className="flex p-6 mt-12 bg-gray-300 rounded-lg justify-center items-center flex-wrap">
        <h2 className="text-gray-500 pr-2">Trial Navigator: </h2>
      {trials.map((t, i) => {
        let isComplete =
          t.best_value &&
          t.worst_value &&
          t.best_value.trim() !== "" &&
          t.worst_value.trim() !== "";
        return (
          <button
            key={i}
            onClick={()=>jumpToIndex(i)}
            className={`px-2 hover:bg-gray-500 py-1 text-gray-700 m-1 bg-gray-400 rounded-lg ${
              isComplete ? "hover:bg-green-500 bg-green-400" : ""
            }`}
          >
            {i}
          </button>
        );
      })}
      <button
            onClick={()=>jumpToIndex(trials.length)}
            className={`px-2 hover:bg-gray-500 py-1 text-gray-700 m-1 bg-gray-400 rounded-lg`}
          >
            Done
          </button>
    </div>
  );
}
