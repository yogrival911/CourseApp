// src/features/course/screens/CourseListScreen.js

import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Button,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoursesThunk } from '@features/course/presentation/redux/courseThunk';
import { useNavigation } from '@react-navigation/native';
import { ROUTE_NAMES } from '@navigation/RouteNames';
import { getHttpsImageUrl } from '@utils/utils';
import Colors from '@themes/colors';
import Fonts from '@themes/font';

const LIMIT = 10;

const CourseListScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { courses, loading, error, page, hasMore } = useSelector(
    state => state.course,
  );

  useEffect(() => {
    dispatch(fetchCoursesThunk(1, LIMIT));
  }, [dispatch]);

  const loadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchCoursesThunk(page + 1, LIMIT));
    }
  };

  const redirectToCourseDetail = useCallback(item => {
    navigation.navigate(ROUTE_NAMES.CourseDetail, { courseId: item.slug });
  }, []);

  const renderFooter = () =>
    loading ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>Loading...</Text>
      </View>
    ) : null;

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: getHttpsImageUrl(item.thumbnailUrl) }}
          style={styles.thumbnailImage}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Button
          onPress={() => redirectToCourseDetail(item)}
          title="View Course"
        />
      </View>
    );
  };

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={courses}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      contentContainerStyle={styles.list}
      initialNumToRender={8}
      maxToRenderPerBatch={8}
      windowSize={5}
      removeClippedSubviews={true}
    />
  );
};

export default CourseListScreen;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: Colors.warning,
    fontSize: 16,
  },
  list: {
    padding: 6,
  },
  card: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: Colors.white,
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: Fonts.size.large,
    fontWeight: Fonts.weight.bold,
  },
  thumbnailImage: {
    aspectRatio: 16 / 9,
    width: '100%',
    resizeMode: 'cover',
  },
});
