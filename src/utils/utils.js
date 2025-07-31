
import AsyncStorage from '@react-native-async-storage/async-storage';

const ENROLLED_COURSE_IDS_KEY = 'ENROLLED_COURSE_IDS';

// Get all enrolled course IDs
export const getEnrolledCourseIds = async () => {
  try {
    const json = await AsyncStorage.getItem(ENROLLED_COURSE_IDS_KEY);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Error getting enrolled course IDs:', error);
    return [];
  }
};

// Add a new course ID (avoid duplicates)
export const addEnrolledCourseId = async (courseId) => {
  try {
    const existing = await getEnrolledCourseIds();
    if (!existing.includes(courseId)) {
      const updated = [...existing, courseId];
      await AsyncStorage.setItem(ENROLLED_COURSE_IDS_KEY, JSON.stringify(updated));
    }
  } catch (error) {
    console.error('Error adding course ID:', error);
  }
};

// Remove a course ID
export const removeEnrolledCourseId = async (courseId) => {
  try {
    const existing = await getEnrolledCourseIds();
    const updated = existing.filter((id) => id !== courseId);
    await AsyncStorage.setItem(ENROLLED_COURSE_IDS_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error removing course ID:', error);
  }
};

// Clear all enrolled course IDs
export const clearEnrolledCourseIds = async () => {
  try {
    await AsyncStorage.removeItem(ENROLLED_COURSE_IDS_KEY);
  } catch (error) {
    console.error('Error clearing enrolled course IDs:', error);
  }
};

// Extract vimeo video id from url
export const  extractVimeoVideoId = (url) => {
    if (typeof url !== 'string') return null;
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
}

// Make url to https from http
export const getHttpsImageUrl = (url) => {
    return url?.replace(/^http:\/\//i, 'https://')
}