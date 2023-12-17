<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { ActionData, PageData, SubmitFunction } from './$types.js';

	export let data: PageData;
	export let form: ActionData;

	let loading: boolean = false;

	const addTodo: SubmitFunction = (input) => {
		//do sth before form submits
		loading = true;

		return async ({ update }) => {
			// do sth after form submits
			loading = false;
			await update();
		};
	};
</script>

<h1 class="text-xl text-center">Welcome {data.user}!</h1>
{#if $page.data.user}
	<h1 class="text-xl text-center">Welcome {$page.data.user}!</h1>
{/if}

<pre>
    {JSON.stringify(form, null, 2)}
</pre>

<ul class="p-0">
	{#each data.todos as todo}
		<li class="flex justify-around align-center">
			<span class="text-4xl font-medium text-gray-900">{todo.text}</span>
			<form action="?/deleteTodo" method="POST" use:enhance>
				<input type="hidden" name="id" value={todo.id} />
				<button
					class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
					type="submit">X</button
				>
			</form>
		</li>
	{/each}
</ul>

<form action="?/addTodo" method="POST" use:enhance={addTodo}>
	<div class="mx-auto flex align-center justify-center gap-5">
		<input
			class="block mb-2 text-sm font-medium text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
			type="text"
			name="todo"
		/>
		{#if form?.missing || form?.errors?.todo}
			<p class="text-red-500">This field is required</p>
		{/if}
		<button
			aria-busy={loading}
			disabled={loading}
			class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
			type="submit">+ Add Todo</button
		>

		<button
			class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
			type="submit"
			formaction="?/clearTodo">Clear todos</button
		>
	</div>
</form>

{#if form?.success}
	<p class="">Added a todo!</p>
{/if}
