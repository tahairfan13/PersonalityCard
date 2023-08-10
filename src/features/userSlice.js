import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRandomIndex, prepareUserDetails } from "../utils/data";

const initialState = {
  user: null,
  loading: false,
};

export const getRandomUser = createAsyncThunk(
  "users/getRandomUser",
  async () => {
    const userRes = await fetch("https://randomuser.me/api/").then((res) =>
      res.json()
    );
    const brandsRes = await fetch(
      "https://random-data-api.com/api/v2/appliances?size=6"
    ).then((res) => res.json());

    return { users: { ...userRes.results }, brands: brandsRes };
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRandomUser.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getRandomUser.fulfilled, (state, action) => {
      state.loading = false;
      const allUsers = action.payload.users;

      const single = allUsers[getRandomIndex(Object.keys(allUsers).length)];
      const formattedUser = prepareUserDetails({
        ...single,
        brands: action.payload.brands,
      });
      state.user = formattedUser;
    });
  },
});

export const selectUsers = (state) => state.user.users;
export default userSlice.reducer;
