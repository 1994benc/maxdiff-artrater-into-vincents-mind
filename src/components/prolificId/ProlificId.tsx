import React, {useState, useEffect} from 'react'
import {buttonSpecialClasses, textInputClasses, buttonClasses} from '../../assets/classes'
import {createRestHook} from 'react-data-hooks'
// import {IExperiment} from '../../interfaces/experiment';
import {Redirect, Link} from 'react-router-dom'
import { signIn } from './signInAnonymously';

const useExperiment = createRestHook('https://vgrator-khrzfla7dq-ez.a.run.app/api/start');

export default function ProlificId() {
    let {isLoading, create} = useExperiment({
        onCreate: (item : any) => setExperimentData(item)
    })
    const [prolificId, setProlificId] = useState < string > ("")
    const [redirectURL, setRedirectURL] = useState('')
    const startTrials = (type : "prolific" | "skip") => {
        if (type === "prolific") {
            create({'prolific_id': prolificId})
            signIn()
        } else {
            create({'prolific_id': null})
            signIn()
        }
    }
    const setExperimentData = (experimentData : any) => {
        if (experimentData) {
            setRedirectURL(`/trials/${
                experimentData["experimentID"]
            }`)
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (redirectURL && redirectURL.trim() !== "") {
        return <Redirect to={redirectURL}/>
    }

    return (
        <div>
            <div className="mb-5">
                <h1>Enter your Prolific ID (Required for Prolific users)</h1>
                <input value={prolificId}
                    onChange={
                        (e) => setProlificId(e.target.value)
                    }
                    className={
                        `${textInputClasses} mr-2`
                    }
                    type="text"
                    placeholder="Prolific ID"/>
                <button className={
                        `${buttonSpecialClasses} my-3 mx-1`
                    }
                    onClick={
                        () => startTrials("prolific")
                }>Start</button>
                <button className={
                        `${buttonClasses} my-3 mx-1`
                    }
                    onClick={
                        () => startTrials("skip")
                }>Skip</button>
            </div>
        </div>

    )
}
