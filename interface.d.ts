export interface TodoList {
    _id: string
    value: string
    priority: number
}

export interface UpdateObj {
    value ?: string,
    priority?: number
}