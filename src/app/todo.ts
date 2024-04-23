export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface ApiResponse {
  todos: Todo[];
}
