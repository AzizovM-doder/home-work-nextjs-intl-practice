export interface IData2{
    id : number;
    name : string;
    description : string;
    images : IImage2[];
    isCompleted : boolean
}
export interface IResponse2 {
    data : IData2[],
    errors : any[],
    statusCode : number
}
export interface IResponse2ID {
    data : IData2,
    errors : any[],
    statusCode : number
}
export interface IImage2 {
    id : number;
    imageName : string
}