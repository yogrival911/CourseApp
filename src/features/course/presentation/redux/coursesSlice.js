import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    courses: [],
    page: 1,
    hasMore: true,
    courseDetail: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Course List
    fetchCoursesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCoursesSuccess: (state, action) => {
      const { data, page, hasMore } = action.payload;
      state.courses = page === 1 ? data : [...state.courses, ...data];
      state.page = page;
      state.hasMore = hasMore;
      state.loading = false;
    },
    fetchCoursesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Course Detail
    fetchCourseDetailStart: (state) => {
      state.loading = true;
      state.error = null;
      state.courseDetail = null;
    },
    fetchCourseDetailSuccess: (state, action) => {
      state.loading = false;
      state.courseDetail = action.payload;
    },
    fetchCourseDetailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCoursesStart,
  fetchCoursesSuccess,
  fetchCoursesFailure,
  fetchCourseDetailStart,
  fetchCourseDetailSuccess,
  fetchCourseDetailFailure,
} = courseSlice.actions;

export default courseSlice.reducer;
