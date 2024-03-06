
import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name : 'theme',
    initialState: {
         current_active_theme : 'light'
    },
    reducers : {
        setCurrentTheme : (state, action) => {
             state.current_active_theme = action.payload
        }
    }
});

export const { setCurrentTheme } = themeSlice.actions;
export default themeSlice.reducer;