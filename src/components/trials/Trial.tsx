import React, {ReactElement, useState, useEffect, Fragment} from 'react'
import {ITrial} from '../../interfaces/trial'

interface ITrialProps {
    trial: ITrial;
    goNextIndex: Function;
    updateTrial: Function;
}

export default function Trial({trial, goNextIndex, updateTrial} : ITrialProps): ReactElement { // Responses
    
    const [best, setBest] = useState('')
    const [worst, setWorst] = useState('')
    const [mode, setMode] = useState < "best" | "worst" > ("best")
    const [currentQ, setCurrentQ] = useState("")

    useEffect(()=>{
        // Initialize best and worst from db
        if (!trial) {
            return;
        }
        if (trial.best_value && trial.best_value.trim() !== "") {
            setBest(trial.best_value)
        } 
        if (trial.worst_value  && trial.worst_value.trim() !== "") {
            setWorst(trial.worst_value)
        }
    }, [trial])

    useEffect(() => {
        setCurrentQ(mode === "best" ? trial ?. best_question : trial ?. worst_question)
    }, [trial, mode])

    const selectImage = (option_id : string) => {
        if (mode === "best") {
            if (option_id === "worst") {
                return
            }
             // Update trial in db with id = trial.id
            updateTrial({best_value:option_id, worst_value:worst, id:trial.id})
            setBest(option_id)
            setMode("worst")
        } else { 
            
            
            if (option_id === best) {
                return;
            }
            // Update trial in db with id = trial.id
            updateTrial({best_value:best, worst_value:option_id, id:trial.id})
            setWorst(option_id)
            // Move on to next q
            goNextIndex()
            // Clear best and worst states
            setBest("")
            setWorst("")
            // Set mode back to "best"
            setMode("best")
        }
    }

    return (
        <Fragment>
            <div className={`text-2xl m-3 font-semibold ${mode === "best" ? `text-green-800`:`text-red-800`}`}>
                {currentQ}</div>
            <div className="grid md:grid-flow-col md:grid-cols-4 md:grid-rows-1 md:gap-1">
                {
                trial && trial.options.map((o, i) => {
                    return <div onClick={
                            () => selectImage(o.option_id)
                        }
                        className="p-2"
                        key={
                            o.option_id
                    }><img className={
                                `cursor-pointer border-8 rounded-lg ${
                                    best === o.option_id ? "border-green-500 opacity-75 shadow-xl" : worst === o.option_id ? "shadow-xl border-red-500 opacity-75" : "border-gray-200"
                                } hover:border-gray-600`
                            }
                            src={
                                `${
                                    o ?. imageURL
                                }`
                            }
                            alt=""/></div>
            })
            }</div>
        </Fragment>
    )
}
