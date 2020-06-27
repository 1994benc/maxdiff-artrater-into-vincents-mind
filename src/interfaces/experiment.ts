import {ITrial} from "./trial";

export interface IExperiment {
    experimentID: string;
    trials: ITrial[];
    info: {
        age: string | null,
        ​​ completed: boolean,
        ​​ createdAt: string,
        ​​ ends_at_trial_index: number,
        ​​ gender: string | null,
        ​​ prolificID: string | null,
        ​​ starts_from_trial_index: number
    }
}
