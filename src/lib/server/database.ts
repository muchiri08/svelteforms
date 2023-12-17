type Todo = {
    id: number;
    text: string;
}

let todos: Todo[] = [];

export function getTodos(): Todo[] {
    return todos;
}

export function addTodo(todo: string) {
    let count: number = todos.length + 1;
    todos.push({ id: count++, text: todo });
}

export function deleteTodo(id: number) {
    //todos = todos.filter(t => t.id !== id);
    const index = todos.findIndex(t => t.id === id);
    if (index > -1) {
        todos.splice(index, 1);
    }
}

export function clearTodos() {
    todos =  [];
}