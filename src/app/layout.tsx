import './globals.css';
import { Josefin_Sans as JosefinSans } from 'next/font/google';

const josefinSans = JosefinSans({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
	title: 'Todo app',
	description:
		'A todo app project that helps users organize, track, and prioritize their tasks and responsibilities.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<link
				rel='icon'
				type='image/png'
				sizes='32x32'
				href='./favicon-32x32.png'
			/>
			<body className={josefinSans.className}>{children}</body>
		</html>
	);
}
