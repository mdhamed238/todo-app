'use client';
import { KeyboardEvent, useState } from 'react';
import { Controller } from 'react-hook-form';
import Check from '../Check';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { classNames } from '@/utils';

type Props = {
	control: any;
	name: string;
	placeholder: string;
	handleSubmit: () => void;
};

const Input = ({ control, name, placeholder, handleSubmit }: Props) => {
	const [isChecked, setChecked] = useState(false);
	const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSubmit();
		}
	};
	const theme = useSelector((state: RootState) => state.screen.theme);

	return (
		<div className='py-4 pl-6 w-full flex items-center gap-4'>
			<Controller
				control={control}
				name='completed'
				render={({ field: { value, onChange } }) => (
					<Check
						isChecked={value}
						setChecked={onChange}
					/>
				)}
			/>
			<Controller
				control={control}
				name={name}
				render={({ field: { value, onBlur, onChange } }) => (
					<input
						type='text'
						className={classNames(
							'w-full bg-transparent outline-none focus:outline-none text-lg',
							theme === 'dark'
								? 'text-dark-light-grayish-blue placeholder:text-dark-dark-grayish-blue'
								: 'text-light-very-dark-grayish-blue'
						)}
						placeholder={placeholder}
						value={value}
						onBlur={onBlur}
						onChange={onChange}
						onKeyDown={handleEnter}
					/>
				)}
				defaultValue=''
			/>
		</div>
	);
};

export default Input;
