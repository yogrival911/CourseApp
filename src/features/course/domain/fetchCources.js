import { getCourses } from '@features/course/data/courseRepository';
import { CourseListResponseModel } from '@features/course/domain/models/courseListModel';

export const fetchCourses = async (page = 1, limit = 10) => {
  const res = await getCourses(page, limit );
  return  new CourseListResponseModel(res);
  // return data.courses.map(item => new Course(item));
};
