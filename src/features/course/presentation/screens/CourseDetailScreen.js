import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseDetailThunk } from '@features/course/presentation/redux/courseThunk';
import VimeoPlayer from '../components/vimeoPlayer';
import { addEnrolledCourseId, extractVimeoVideoId, getEnrolledCourseIds, removeEnrolledCourseId } from '@utils/utils';

const CourseDetailScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { courseId } = route.params;
  const [isEnrolled, setEnrolled] = useState(false);

  const { courseDetail, loading } = useSelector(state => state.course);

  useEffect(() => {
    dispatch(fetchCourseDetailThunk(courseId));
  }, [dispatch, courseId]);

  useEffect(() => {
    (async () => {
      const enrolledIds = await getEnrolledCourseIds();
      setEnrolled(enrolledIds.includes(courseId));
    })();
  }, []);

  const onEnroll = async () => {
    setEnrolled(!isEnrolled);
    await addEnrolledCourseId(courseDetail.slug);
  };

  const onUnenroll = async () => {
    setEnrolled(!isEnrolled);
    await removeEnrolledCourseId(courseDetail.slug);
  };
  

  if (loading || !courseDetail) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <VimeoPlayer thumbnailImage={courseDetail.thumbnailUrl} videoId={"68481134"} />
       <Button onPress={isEnrolled ? onUnenroll : onEnroll} title={isEnrolled ? 'Enrolled' : "Enroll"}/>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
        {courseDetail.title}
      </Text>
      <Text style={{ marginBottom: 16 }}>{courseDetail.description}</Text>
    </ScrollView>
  );
};

export default CourseDetailScreen;
