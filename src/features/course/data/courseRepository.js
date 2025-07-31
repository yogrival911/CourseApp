import { fetchCoursesAPI, fetchCourseDetailAPI } from '@features/course/data/courseService';

export const getCourses = async (page, limit) => {
  return await fetchCoursesAPI(page, limit);
};

export const getCourseDetail = async (id) => {
  return await fetchCourseDetailAPI(id);
};
