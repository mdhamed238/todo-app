import { classNames } from '@/utils';
import Image from 'next/image';

type Props = {
	isChecked?: boolean;
	isDarkMode?: boolean;
	setChecked: () => void;
};

const Check = ({ isChecked, setChecked, isDarkMode }: Props) => {
	return (
		<button
			className={classNames(
				'flex items-center justify-center w-5 h-5 p-0 rounded-full cursor-pointer border outline-none hover:outline-none duration-200',
				isDarkMode
					? 'border-dark-very-dark-grayish-blue'
					: 'border-light-dark-grayish-blue',
				isChecked
					? 'bg-gradient-to-br from-check-bg-start to-check-bg-end'
					: ''
			)}
			onClick={setChecked}
		>
			{isChecked && (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='11'
					height='9'
				>
					<path
						fill='none'
						stroke='#FFF'
						strokeWidth='2'
						d='M1 4.304L3.696 7l6-6'
					/>
				</svg>
			)}
		</button>
	);
};

export default Check;
