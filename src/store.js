import {configureStore} from '@reduxjs/toolkit';
import searchReducer from './searchReducer';
import authorizationReducer from "./authorizationReducer";

export default configureStore({
    reducer: {
        search: searchReducer,
        authorization: authorizationReducer
    },
});

