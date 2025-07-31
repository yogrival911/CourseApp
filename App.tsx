
import store from 'store/courseStore';
import CourseStackNavigator from '@navigation/CourseStackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { Provider } from 'react-redux';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
    <NavigationContainer >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <CourseStackNavigator/>
    </NavigationContainer>
    </Provider>
  );
}

export default App;
