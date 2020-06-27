export interface ITrial {
    id:string;
    best_question: string;
    ​​​ name: string;
    ​​​ options: {
        imageURL: string,
        option_id: string,
        title?: string
    }[];
    ​​​ worst_question: string;
    best_value?:string;
    worst_value?:string;

}
