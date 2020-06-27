import React, {useState, useEffect, Fragment} from 'react'
import {useParams, Link} from 'react-router-dom'
import {IExperiment} from '../../interfaces/experiment';
import {ITrial} from '../../interfaces/trial';
import Trial from './Trial';
import {alertWarningClasses} from '../../assets/classes';
import {useDocument, useCollection} from 'react-firebase-hooks/firestore';
import firebase from '../../firebase'
import ThankYou from './ThankYou';
import TrialNav from './TrialNav';
// import {useLocation} from 'react-router'
// import queryString from 'query-string';
import { useQueryParam, NumberParam } from 'use-query-params';
import TrialProgress from './TrialProgress';



export default function Trials() {
    let {experimentID} = useParams();
    const [indexParam, setIndexParam] = useQueryParam('index', NumberParam);
    const [experimentValue, experimentLoading, experimentError] = useDocument(firebase.firestore().doc(`experiments/${experimentID}`));
    const [trialsValue, trialsLoading, trialsError] = useCollection(firebase.firestore().collection(`experiments/${experimentID}/trials`));

    const [experiment, setExperiment] = useState < IExperiment | null > (null)
    const [trials, setTrials] = useState < ITrial[] > ([])
    const [index, setIndex] = useState<number>(0)



    // initialize index from url params
    useEffect(() => {
        // insertParam("index", "2")
        if (!indexParam) {
            return
        }
        setIndex(indexParam)
    },[indexParam])


    const goNextIndex = () => {
        let newIndex = index + 1
        setIndex(newIndex)
        setIndexParam(newIndex)
    }

    const goPrevIndex = () => {
        let newIndex = index -1
        setIndex(newIndex)
        setIndexParam(newIndex)

    }

    const jumpToIndex = (newIndex:number) => {
        setIndex(newIndex)
        setIndexParam(newIndex)

    }
    const updateTrial = (data : {
        best_value?: string,
        worst_value?: string,
        id: string
    }) => {
        console.log(data)
        if (!experimentID) {
            return
        }
        firebase.firestore().collection("experiments").doc(experimentID).collection('trials').doc(data.id).set(data, {merge: true}).then(() => {
            console.log("Updated")
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        if (!experimentValue) {
            return
        }
        setExperiment(experimentValue ?. data()as IExperiment)
    }, [experimentValue])

    useEffect(() => {
        if (!trialsValue) {
            return
        }
        console.log(trialsValue.size)
        let trialsList: ITrial[] = []
        trialsValue ?. docs.forEach(doc => {
            let tmp = doc.data()
            tmp['id'] = doc.id
            trialsList.push(tmp as ITrial)
        })
        setTrials(trialsList)
    }, [trialsValue])

    if (experimentLoading || trialsLoading) {
        return <div>Loading...</div>
    }

    const validateSubmission = () => {
        console.log("validateSubmission")
        if (!trials || trials.length <= 0) {
            return false
        }
        let v = true
        trials.forEach(t => {
            if (!t.best_value || t.best_value.trim() === "" || !t.worst_value || t.worst_value.trim() === "") {
                v = false
            }
        })
        return v
    }

    const markComplete = () => {
        if (validateSubmission() === false) {
            alert("Please complete all the trials first")
        } else {
            if (!experimentID) {
                return
            }
            firebase.firestore().collection('experiments').doc(experimentID).update({completed: true}).then(() => {
                console.log("Done")
                // TODO: remove from "inprogress"
            }).catch(err => {
                console.log(err)
            })
        }
    }




    return (
        <div>
            <Fragment>
                <a href="mailto:ben.chomsang@warwick.ac.uk" className={
                    `${alertWarningClasses} fixed top-0 right-0 cursor-pointer`
                }>Report problems</a>


                {
                    index > trials.length - 1 && <ThankYou validateSubmission={validateSubmission} markComplete={markComplete}/>
                }
                <Trial updateTrial={updateTrial}
                    trial={
                        trials[index]
                    }
                    goNextIndex={goNextIndex}/>
                <TrialProgress jumpToIndex={jumpToIndex} trials={trials} />

                <TrialNav goPrevIndex={goPrevIndex}
                    goNextIndex={goNextIndex}
                    markComplete={markComplete}
                    trials={trials}
                    index={index}/>

            </Fragment>
        </div>
    )
}
