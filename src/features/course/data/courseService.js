import apiClient from '@service/apiClient';
import { END_POINTS } from '@service/apiConstant';

export const fetchCoursesAPI = async (page) => {
  const response = await apiClient.get(`${END_POINTS.COURSE_LIST}?page=${page}`);
  return response.data;
};

export const fetchCourseDetailAPI = async (id) => {
  const response = await apiClient.get(`${END_POINTS.COURSE_DETAIL(id)}`);
  return response.data;
};
