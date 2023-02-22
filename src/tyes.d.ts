import mongoose from "mongoose";

export interface IModel{
    mongooseModel:mongoose.Model<any>;
    create<T>(document:ay):Promise<T>;
    find(populate?: IPopulate): Promise<any[]>;
    findById<T>(id: string, populate?: IPopulate): Promise<T>;
    findOne<T>(query: any, populate?: IPopulate): Promise<T>;
    findMany<T>(query: any, populate?: IPopulate): Promise<any[] |T>;
    updateById<T>(id: string, document: any, populate?: IPopulate | IPopulate[]): Promise<T>;
    deleteById<T>(id: string): Promise<T>;
}
export interface IPagination {
    perPage?: number,
    pageNo?: number,
  }