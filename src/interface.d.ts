export interface TodoItem {
    _id?:string,
    value?:string,
    priority?:number,
    _v?: number
}

export interface InitialState {
    todos: TodoItem[]
}

export interface CreateState {
    value: string,
    priority: number
}