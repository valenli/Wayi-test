export interface ITask{
    id:number;
    json: any;
    name:"string",
    description:"string",
    is_completed:boolean,
    created_at:Date,
    updated_at:Date

}