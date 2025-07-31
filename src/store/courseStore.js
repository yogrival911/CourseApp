import { configureStore } from '@reduxjs/toolkit';
import courseReducer from '@features/course/presentation/redux/coursesSlice';

const store = configureStore({
    reducer: {
        course: courseReducer,
    },
});

export default store;
