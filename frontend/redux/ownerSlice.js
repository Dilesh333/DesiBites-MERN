import { createSlice } from "@reduxjs/toolkit";

const ownerSlice = createSlice({
  name: "owner",
  initialState: {
    myshopData: null,
  },
  reducers: {
    setMyshopData: (state, action) => {
      state.myshopData = action.payload;
    },
  


}
});

export const { setMyshopData} = ownerSlice.actions;
export default ownerSlice.reducer;
