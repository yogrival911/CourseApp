import { getCourseDetail } from '@features/course/data/courseRepository';
import { CourseDetail } from '@features/course/domain/models/courseDetailModel';


export const fetchCourseDetail = async (id) => {
  const res = await getCourseDetail(id);
  return new CourseDetail(res);
};
