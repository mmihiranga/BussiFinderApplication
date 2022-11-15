import { createSlice } from '@reduxjs/toolkit'

export const factorDetailsSlice = createSlice({
    name: "factorDetails",
    initialState: {
        value: []
    },
    reducers: {
        factorDetailsInfo: (state, action) => {
            state.value = action.payload
        }
    }
});
export const { factorDetailsInfo } = factorDetailsSlice.actions;
export default factorDetailsSlice.reducer;