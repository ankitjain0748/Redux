import { createSlice } from "@reduxjs/toolkit";


const UserSlice = createSlice({
    name: "users",
    initialState: {
        users: []
    },
    reducers: {

        login: (state, action) => {
            state.users = action.payload;
        },

        logout: (state, action) => {
            state.users = null;
        },
        getUser: (state, action) => {
            state.users = action.payload.map(user => {
                return {
                    id: user._id,
                    age: user.age,
                    name: user.name,
                    email: user.email,

                }
            })
        },
        adduser: (state, action) => {
            state.users.push(action.payload)
        }
    }

})

export const { getUser, adduser, login, logout } = UserSlice.actions;

export const selectuser = (state) => state.users.users;
export default UserSlice.reducer;
