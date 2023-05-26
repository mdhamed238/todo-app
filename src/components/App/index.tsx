'use client';

import Todo from '@/components/Todo';
import { RootState, store } from '@/store';
import { setBackgroundImage, setScreen, setTheme } from '@/store/screenSlice';
import { classNames } from '@/utils';
import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function App() {
	const { screen, todo } = useSelector((state: RootState) => state);
	const dispatch = useDispatch();

	// Detect theme (light or dark)
	// useEffect(() => {
	// 	const prefersDarkScheme = window.matchMedia(
	// 		'(prefers-color-scheme: dark)'
	// 	);
	// 	if (prefersDarkScheme.media) {
	// 		// setState({ ...state, theme: 'dark' });
	// 		dispatch(setTheme('dark'));
	// 	} else {
	// 		dispatch(setTheme('light'));
	// 	}
	// }, []);

	// Detect screen size (mobile or desktop)
	useEffect(() => {
		const checkMobile = () => {
			let image;
			if (window.innerWidth <= 640) {
				image =
					screen.theme === 'dark'
						? require('../../../public/images/bg-mobile-dark.jpg')
						: require('../../../public/images/bg-mobile-light.jpg');

				dispatch(setScreen('mobile'));
				dispatch(setBackgroundImage(image));
			} else {
				image =
					screen.theme === 'dark'
						? require('../../../public/images/bg-desktop-dark.jpg')
						: require('../../../public/images/bg-desktop-light.jpg');

				dispatch(setScreen('desktop'));
				dispatch(setBackgroundImage(image));
			}
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => {
			window.removeEventListener('resize', checkMobile);
		};
	}, []);

	useEffect(() => {
		console.log(todo.todos);
	}, [todo.todos.length]);

	return (
		<main
			className={classNames(
				'relative w-full h-screen',
				screen.theme === 'dark'
					? 'bg-dark-very-dark-blue text-dark-dark-grayish-blue'
					: 'bg-light-very-light-gray text-light-very-dark-grayish-blue'
			)}
		>
			<Image
				alt='bg-image'
				src={screen.backgroundImage}
				className='w-full h-[38%]'
			/>
			<Todo />
		</main>
	);
}
