import { createStackNavigator } from "@react-navigation/stack"
import { ROUTE_NAMES } from "@navigation/RouteNames"
import CourseListScreen from "@features/course/presentation/screens/CourseListScreen"
import CourseDetailScreen from "@features/course/presentation/screens/CourseDetailScreen"

const CourseStack = createStackNavigator()
const CourseStackNavigator = () => {
    return <CourseStack.Navigator>
        <CourseStack.Screen name={ROUTE_NAMES.CourseList} component={CourseListScreen} />
        <CourseStack.Screen name={ROUTE_NAMES.CourseDetail} component={CourseDetailScreen} />
    </CourseStack.Navigator>
}

export default CourseStackNavigator;