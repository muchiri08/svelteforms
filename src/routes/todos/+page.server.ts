import { addTodo, clearTodos, deleteTodo, getTodos } from "$lib/server/database";
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad, RequestEvent } from "./$types";

export const load: PageServerLoad = async (event: RequestEvent) => {
    const todos = getTodos();

    return { todos }
}

async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const actions: Actions = {
    addTodo: async ({ request }: RequestEvent) => {
        const formData = await request.formData();
        const todo = String(formData.get('todo'));

        if (!todo) {
            return fail(400, { todo, missing: true });
        }
        
        let errors: Record<string, unknown> = {};

        if (todo.trim().length === 0) {
            errors.todo = 'required req';
        }

        if (Object.keys(errors).length > 0) {
            const data = {
                data: Object.fromEntries(formData),
                errors
            }

            return fail(400, data);
        }

        await sleep(2000);

        addTodo(todo);

        return { success: true };

    },
    deleteTodo: async ({ request }: RequestEvent) => {
        const formData = await request.formData();
        const todoId = Number(formData.get('id'));

        deleteTodo(todoId);

        return { success: true };
    },
    clearTodo: () => {
        clearTodos();
    }
}

