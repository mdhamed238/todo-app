import * as yup from 'yup';
import Input from '../Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import {
	TodoItem,
	addTodo,
	removeTodo,
	updateTodoStatus,
} from '@/store/todoSlice';
import { RootState } from '@/store';
import { classNames } from '@/utils';
import Image from 'next/image';
import { setTheme } from '@/store/screenSlice';
import Header from './Header';
import Check from '../Check';
import { useEffect, useState } from 'react';
import TabButton from './TabButton';

const schema = yup.object().shape({
	name: yup.string().required(),
	completed: yup.boolean(),
});

type FormValues = {
	name: string;
	completed: boolean;
};

const Todo = () => {
	const {
		screen: { theme, size },
		todo: { todos },
	} = useSelector((state: RootState) => state);
	const dispatch = useDispatch();

	const [currentTab, setCurrentTab] = useState<'all' | 'active' | 'complete'>(
		'all'
	);
	const [currentTodos, setCurrentTodos] = useState(todos);

	console.log(currentTodos, ' ', currentTab);

	useEffect(() => {
		if (currentTab !== 'all') {
			setCurrentTodos(todos.filter((todo) => todo.status === currentTab));
		}
	}, [currentTab]);

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<FormValues>({
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		dispatch(addTodo({ name: data.name, completed: data.completed }));
		setValue('name', '');
		setValue('completed', false);
	};

	const nonCompletedTodos = todos.filter(
		(todo) => todo.status != 'complete'
	).length;

	const handleToggleComplete = (todo: TodoItem) => {
		dispatch(
			updateTodoStatus({
				id: todo.id,
				status: todo.status === 'none' ? 'complete' : 'none',
			})
		);
	};

	return (
		<div
			className={classNames(
				'absolute left-1/2 -translate-x-1/2 top-[8%] flex flex-col gap-8',
				size === 'mobile' ? 'w-[90%]' : 'w-[500px]'
			)}
		>
			<Header />
			<div className='flex flex-col gap-4'>
				<div
					className={classNames(
						'rounded flex flex-col items-center gap-8',
						theme === 'dark'
							? 'bg-dark-very-dark-desaturated-blue'
							: 'bg-white'
					)}
				>
					<Input
						control={control}
						name='name'
						placeholder='Create a new todo...'
						handleSubmit={handleSubmit(onSubmit)}
					/>
				</div>
				{/* Todo list */}
				<div
					className={classNames(
						'rounded flex flex-col items-center shadow-2xl max-h-96 overflow-y-scroll scroll-tight',
						theme === 'dark'
							? 'bg-dark-very-dark-desaturated-blue'
							: 'bg-white'
					)}
				>
					{(currentTab === 'all' ? todos : currentTodos).map(
						(todo, idx) => (
							<div
								draggable='true'
								key={idx}
								className={classNames(
									'p-5 flex justify-start w-full items-center gap-6 border-b',
									theme === 'dark'
										? 'border-b-dark-very-dark-grayish-blue'
										: 'border-b-light-light-grayish-blue'
								)}
							>
								<Check
									isChecked={todo.status === 'complete'}
									setChecked={() => {
										handleToggleComplete(todo);
									}}
								/>
								<p
									className={classNames(
										'hover:opacity-90 cursor-pointer',
										todo.status === 'complete'
											? 'line-through'
											: '',
										theme === 'dark'
											? 'text-dark-light-grayish-blue'
											: 'text-light-very-dark-grayish-blue'
									)}
									onClick={() => {
										handleToggleComplete(todo);
									}}
								>
									{todo.name}
								</p>
								<button
									className='ml-auto'
									onClick={() => {
										dispatch(removeTodo(todo.id));
									}}
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='18'
										height='18'
									>
										<path
											fill='#494C6B'
											fill-rule='evenodd'
											d='M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z'
										/>
									</svg>
								</button>
							</div>
						)
					)}
					{/* Footer */}
					{todos.length > 0 && (
						<div className='px-5 py-3 flex justify-between w-full'>
							<span
								className={classNames(
									theme === 'dark'
										? 'text-dark-very-dark-grayish-blue'
										: 'text-light-dark-grayish-blue'
								)}
							>
								{nonCompletedTodos} item
								{nonCompletedTodos > 1 && 's'} left
							</span>
							<div className='flex flex-1 justify-end gap-12'>
								<div className='hidden sm:flex gap-4'>
									<TabButton
										currentTab={currentTab}
										name='all'
										onClick={() => {
											if (currentTab != 'all') {
												setCurrentTab('all');
											}
										}}
									>
										All
									</TabButton>
									<TabButton
										currentTab={currentTab}
										name='active'
										onClick={() => {
											if (currentTab != 'active') {
												setCurrentTab('active');
											}
										}}
									>
										Active
									</TabButton>
									<TabButton
										currentTab={currentTab}
										name='complete'
										onClick={() => {
											if (currentTab != 'complete') {
												setCurrentTab('complete');
											}
										}}
									>
										Completed
									</TabButton>
								</div>
								<button
									className={classNames(
										'text-sm font-bold duration-200',
										theme === 'light'
											? 'text-light-dark-grayish-blue hover:text-light-very-dark-grayish-blue'
											: 'text-dark-dark-grayish-blue hover:text-white'
									)}
									onClick={() => {
										todos.forEach((todo) => {
											dispatch(
												updateTodoStatus({
													id: todo.id,
													status: 'none',
												})
											);
										});
									}}
								>
									Clear Completed
								</button>
							</div>
						</div>
					)}
				</div>
				{/* Separated Tab -> For Mobile only */}
				<div
					className={classNames(
						'px-5 py-3 flex justify-center rounded sm:hidden gap-4',
						theme === 'dark'
							? 'bg-dark-very-dark-desaturated-blue'
							: 'bg-white'
					)}
				>
					<TabButton
						currentTab={currentTab}
						name='all'
						onClick={() => {
							if (currentTab != 'all') {
								setCurrentTab('all');
							}
						}}
					>
						All
					</TabButton>
					<TabButton
						currentTab={currentTab}
						name='active'
						onClick={() => {
							if (currentTab != 'active') {
								setCurrentTab('active');
							}
						}}
					>
						Active
					</TabButton>
					<TabButton
						currentTab={currentTab}
						name='complete'
						onClick={() => {
							if (currentTab != 'complete') {
								setCurrentTab('complete');
							}
						}}
					>
						Completed
					</TabButton>
				</div>
			</div>
			{todos.length > 0 && (
				<p
					className={classNames(
						'self-center text-sm shadow-2xl',
						theme === 'dark'
							? 'text-dark-dark-grayish-blue'
							: 'text-light-very-dark-grayish-blue'
					)}
				>
					Drag and drop to reorder list
				</p>
			)}
		</div>
	);
};

export default Todo;
