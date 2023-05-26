import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type State = {
	theme: 'dark' | 'light';
	size: 'desktop' | 'mobile';
	backgroundImage: any;
};

const initialState: State = {
	theme: 'light',
	backgroundImage: require('../../public/images/bg-desktop-light.jpg'),
	size: 'desktop',
};

export const screenSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		setTheme(state, action: PayloadAction<'dark' | 'light'>) {
			state.theme = action.payload;
			// Change Background image
			if (state.size === 'desktop') {
				state.backgroundImage =
					action.payload === 'dark'
						? require('../../public/images/bg-desktop-dark.jpg')
						: require('../../public/images/bg-desktop-light.jpg');
			} else {
				state.backgroundImage =
					action.payload === 'dark'
						? require('../../public/images/bg-mobile-dark.jpg')
						: require('../../public/images/bg-mobile-light.jpg');
			}
		},
		setScreen(state, action: PayloadAction<'desktop' | 'mobile'>) {
			state.size = action.payload;
		},
		setBackgroundImage(state, action: PayloadAction<any>) {
			state.backgroundImage = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setScreen, setTheme, setBackgroundImage } = screenSlice.actions;

export default screenSlice.reducer;
