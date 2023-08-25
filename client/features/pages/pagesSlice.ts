import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export type Page = 'timelines';
interface State {
    current: Page;
}


// Define the initial state using that type
const initialState: State = {
    current: 'timelines',
}

export const pagesSlice = createSlice({
    name: 'timelines',
    initialState: initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<Page>) =>
        {
            state.current = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const {setCurrentPage,} = pagesSlice.actions
export default pagesSlice.reducer