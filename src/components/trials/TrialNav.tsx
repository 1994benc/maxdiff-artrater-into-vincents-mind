import React from "react";
import { buttonClasses, buttonSpecialClasses } from "../../assets/classes";
import { ITrial } from "../../interfaces/trial";

interface ITrialNavProps {
  goPrevIndex: () => void;
  index: number;
  goNextIndex: () => void;
  markComplete: () => void;
  trials: ITrial[];
}

export default function TrialNav({
  goPrevIndex,
  index,
  goNextIndex,
  markComplete,
  trials,
}: ITrialNavProps) {
  return (
    <div>
      <div className="p-5 flex justify-between fixed inset-x-0 bottom-0 rounded-lg bg-opacity-25 bg-white">
        <div>
          {index > 0 && (
            <button onClick={goPrevIndex} className={`${buttonClasses}`}>
              Back
            </button>
          )}
          {/* {
                    index < trials.length - 1 && <button onClick={goNextIndex}
                        className={
                            `${buttonClasses} ml-2`
                    }>Next</button>
                }  */}
        </div>
      </div>
    </div>
  );
}
