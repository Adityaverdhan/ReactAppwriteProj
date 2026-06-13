// import {configureStore} from '@reduxjs/toolkit';

// export const store = configureStore({
//     reducer: {
//         // Add your reducers here
//     },
// });

import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        //post: postReducer
    },
});