import {
    fetchCoursesStart,
    fetchCoursesSuccess,
    fetchCoursesFailure,
    fetchCourseDetailStart,
    fetchCourseDetailSuccess,
    fetchCourseDetailFailure,
  } from '@features/course/presentation/redux/coursesSlice';
  
import {fetchCourses} from '@domain/fetchCources';
import {fetchCourseDetail} from '@domain/fetchCourseDetail';
import {Course} from '@features/course/domain/models/courseListModel';
  
  export const fetchCoursesThunk = (page = 1, limit = 10) => async (dispatch) => {
    try {
      dispatch(fetchCoursesStart());
      const res = await fetchCourses(page, limit);
      const { courses, metadata } = res;
      var coursesList = courses.map(item => new Course(item));
      const hasMore = metadata.page * metadata.limit < metadata.totalCount;

      dispatch(fetchCoursesSuccess({ data: courses, page, hasMore: hasMore }));
    } catch (error) {
      dispatch(fetchCoursesFailure(error.message));
    }
  };
  
  export const fetchCourseDetailThunk = (id) => async (dispatch) => {
    try {
      dispatch(fetchCourseDetailStart());
      const course = await fetchCourseDetail(id);
      dispatch(fetchCourseDetailSuccess(course));
    } catch (error) {
      dispatch(fetchCourseDetailFailure(error.message));
    }
  };
  