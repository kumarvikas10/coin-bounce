import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    _id: '',
    email: '',
    username: '',
    auth: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUSer: (state, action) => {
            const {_id, email, username, auth} = action.payload;
            state._id = _id;
            state.email = email;
            state.username = username;
            state.auth = auth;

        },
        resetUser: (state, action) => {
            state._id = '';
            state.email = '';
            state.username = '';
            state.auth = false;
        }
    }
})

export const {setUSer, resetUser} = userSlice.actions;

export default userSlice.reducer;
