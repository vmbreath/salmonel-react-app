import {createSlice} from '@reduxjs/toolkit';
import {loadState} from './localStorage'

const persistedState = loadState('token');

export const initialState = ({
    token: persistedState ? persistedState.state.token : undefined,
    isAuthenticated: false
});

export const authorizationReducer = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        setNewToken: (state, action) => {
            state.token = action.payload;
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        }
    },
});

export const {setIsAuthenticated,setNewToken } = authorizationReducer.actions;
export const selectToken = state => state.authorization.token;
export const selectIsAuthenticated = state => state.authorization.isAuthenticated;
export default authorizationReducer.reducer;
export const {reducer, actions} = authorizationReducer;