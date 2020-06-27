import React, { ReactElement, useEffect } from "react";

interface Props {
  markComplete: Function;
  validateSubmission: Function;
}

export default function ThankYou({
  markComplete,
  validateSubmission,
}: Props): ReactElement {

  let isValid = validateSubmission()
  useEffect(() => {
      if (validateSubmission() === true) {
          markComplete()
      }
  }, [isValid])

  if (validateSubmission() === true) {
    return (
      <div className="mx-auto m-3  rounded-lg p-10 max-w-3xl">
       <p className="font-semibold text-3xl">Thank you very much for your participation</p>
       <button className="w-full text-xl px-5 py-3 hover:bg-black bg-gray-800 font-semibold text-white rounded-lg mt-4">Go back to Prolific</button>
      </div>
    );
  } else {
    return (
        <div className="mx-auto rounded-lg p-10 m-3 rounded-lg max-w-3xl">
          <p className="text-3xl font-semibold text-red-800">You have not finished all the trials. Use the Back button or the Trial Navigator below to go back and finish them.</p>
          {/* {validateSubmission() && <button onClick={()=>markComplete()} className="text-xl px-5 py-3 bg-gray-800 font-semibold text-white rounded-lg mt-4">Confirm Submission</button>} */}
        </div>
      );
  }
}
