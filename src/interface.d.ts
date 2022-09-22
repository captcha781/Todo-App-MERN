export interface TodoItem {
    _id?:string,
    value?:string,
    priority?:number,
    _v?: number
}

export interface InitialState {
    todos: TodoItem[]
}