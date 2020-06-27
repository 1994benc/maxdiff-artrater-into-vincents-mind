import React, {Fragment, useEffect} from 'react';
import {Switch, Route} from 'react-router-dom'
import Welcome from '../welcome/Welcome';
import Main from '../layout/Main';
import ProlificId from '../prolificId/ProlificId';
import Trials from '../trials/Trials';
import TrialLayout from '../layout/TrialLayout';
import {watchAuth} from '../prolificId/signInAnonymously';
import { QueryParamProvider } from 'use-query-params';

function App() {
    useEffect(() => {
        watchAuth()
    }, [])
    return (
        <QueryParamProvider ReactRouterRoute={Route}>
        <Fragment>

            <Switch>
                <Route path="/" exact>
                    <Main><Welcome/></Main>
                </Route>
                <Route path="/prolific" exact>
                    <Main>
                        <ProlificId/></Main>
                </Route>
                <Route path="/trials/:experimentID" exact>
                    <TrialLayout><Trials/></TrialLayout>
                </Route>
            </Switch>

        </Fragment>
        </QueryParamProvider>
    );
}

export default App;
