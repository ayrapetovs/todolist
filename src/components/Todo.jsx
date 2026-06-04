import { useState, useEffect, useRef } from 'react';
import AddTaskForm from './AddTaskForm';
import SearchTaskForm from './SearchTaskForm';
import TodoInfo from './TodoInfo';
import TodoList from './TodoList';
import TodoItem from './TodoItem';
import Button from './Button';

const Todo = () => {
	const [tasks, setTasks] = useState(() => {
		const savedTasks = localStorage.getItem('tasks');

		if (savedTasks) {
			return JSON.parse(savedTasks);
		}

		return [
			{ id: 'task-1', title: 'Купить молоко', isDone: false },
			{ id: 'task-2', title: 'Погладить кота', isDone: true },
		];
	});

	const [taskTitle, setTaskTitle] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const newTaskInputRef = useRef(null);
	const firstIncompleteTaskRef = useRef(null);
  const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id;
	const done = tasks.filter((task) => task.isDone).length;
	const onClickDeleteAll = () => {
		setTasks([]);
	};

	const deleteTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
		console.log(id);
	};

	const toggleTaskComplete = (id) => {
		setTasks(tasks.map((task) => (task.id === id ? { ...task, isDone: !task.isDone } : task)));
	};

	const AddTask = (e) => {
		e.preventDefault();
		if (taskTitle.trim()) {
			const newTask = {
				id: crypto?.randomUUID() ?? tasks.length + 1,
				title: taskTitle,
				isDone: false,
			};
			setTasks([...tasks, newTask]);
			setTaskTitle('');
			setSearchQuery('');
			newTaskInputRef.current?.focus();
		}
	};

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	useEffect(() => {
		newTaskInputRef.current?.focus();
	}, []);

	const clearSearchQuery = searchQuery.trim().toLowerCase();
	const filteredTasks =
		clearSearchQuery.length > 0
			? tasks.filter((task) => task.title.toLowerCase().includes(clearSearchQuery))
			: null;

	const hasTasks = tasks.length > 0;
	const isEmptyFilteredTasks = filteredTasks?.length === 0;
	let messageTasksEmpty = null;
	if (!hasTasks) {
		messageTasksEmpty = <div className="todo__empty-message">Задач нет</div>;
	}
	if (hasTasks && isEmptyFilteredTasks) {
		messageTasksEmpty = <div className="todo__empty-message">Задач не найдены</div>;
	}
	return (
		<div className="todo">
			<h1 className="todo__title">To Do List</h1>
			<AddTaskForm
				onSubmit={AddTask}
				taskTitle={taskTitle}
				setTaskTitle={setTaskTitle}
				newTaskInputRef={newTaskInputRef}
			/>
			<SearchTaskForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			<TodoInfo total={tasks.length} done={done} onClickDeleteAll={onClickDeleteAll} />
			<Button
				onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({ behavior: 'smooth' })}>
				Show first incomplete task
			</Button>
			<TodoList deleteTask={deleteTask} filteredTasks={filteredTasks}>
				{(filteredTasks ?? tasks).map((task) => {
					return (
						<TodoItem
							{...task}
							key={task.id}
							className="todo__item"
							deleteTask={deleteTask}
							toggleTaskComplete={toggleTaskComplete}
							ref={task.id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
						/>
					);
				})}
			</TodoList>
			{messageTasksEmpty}
		</div>
	);
};

export default Todo;
