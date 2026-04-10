export interface IData {
    id: number;
    name: string;
    description: string;
    images: IImage[];
    isCompleted: boolean
}
export interface IResponse {
    data: IData[],
    errors: any[],
    statusCode: number
}
export interface IImage {
    id: number;
    imageName: string
}
export interface AddImageArg {
  id: number;
  formData: FormData;
}
export interface IEditData {
  id: number;
  name: string;
  description: string;
}
