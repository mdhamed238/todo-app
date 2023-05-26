import { RootState } from '@/store';
import { setTheme } from '@/store/screenSlice';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
	const { theme } = useSelector((state: RootState) => state.screen);
	const dispatch = useDispatch();

	const toggleTheme = () => {
		if (theme === 'dark') {
			dispatch(setTheme('light'));
		} else {
			dispatch(setTheme('dark'));
		}
	};

	return (
		<div className='flex justify-between'>
			<h1 className='text-4xl tracking-[12px] text-white font-bold uppercase'>
				Todo
			</h1>
			<button className=''>
				<Image
					src={
						theme === 'dark'
							? require('../../../public/images/icon-sun.svg')
							: require('../../../public/images/icon-moon.svg')
					}
					alt='theme'
					onClick={toggleTheme}
				/>
			</button>
		</div>
	);
};

export default Header;
