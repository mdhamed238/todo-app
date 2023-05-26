import { RootState } from '@/store';
import { classNames } from '@/utils';
import { useSelector } from 'react-redux';

type Props = {
	currentTab: 'all' | 'active' | 'complete';
	name: 'all' | 'active' | 'complete';
	onClick: () => void;
	children: React.ReactNode;
};

const TabButton = ({ currentTab, name, onClick, children }: Props) => {
	const { theme } = useSelector((state: RootState) => state.screen);

	return (
		<button
			className={classNames(
				'text-sm font-bold duration-200',
				currentTab === name
					? 'text-bright-blue'
					: theme === 'light'
					? 'text-light-dark-grayish-blue hover:text-light-very-dark-grayish-blue'
					: 'text-dark-dark-grayish-blue hover:text-white'
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default TabButton;
