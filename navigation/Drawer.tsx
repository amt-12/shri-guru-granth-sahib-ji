import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import Login from "../screens/Login";
import Registration from "../screens/Registration";
import TabOneScreen from "../screens/TabOneScreen";
import LoginButton from "../components/LoginBtn";
import Bookmark from "../screens/Bookmark";

const Drawer = createDrawerNavigator();

export function RouterDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Sri Guru Granth Sahib Ji"
        component={TabOneScreen}
        options={({ navigation }) => ({
          headerRight: () => <LoginButton navigation={navigation} />,
          headerShown: true,

          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        })}
      />
      <Drawer.Screen
        name="Login screen"
        component={Login}
        options={{
          title: "Login",
          headerShown: false,

          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="lock" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Registration Screen"
        component={Registration}
        options={{
          title: "Registration",
          headerShown: false,

          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="BookmarkScreen"
        component={Bookmark}
        options={{
          title: "Bookmark",
          headerShown: true,

          drawerIcon: ({ color, size }) => (
            <Foundation name="book-bookmark" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}