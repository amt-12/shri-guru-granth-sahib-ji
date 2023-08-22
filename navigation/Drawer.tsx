import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import Login from "../screens/Login";
import Registration from "../screens/Registration";
import TabOneScreen from "../screens/TabOneScreen";
import LoginButton from "../components/LoginBtn";
import Bookmark from "../screens/Bookmark";
import { useLoginset } from "../hooks/useLoginset";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { loginFlag } from "../store/auth";
import { useAtom } from "jotai";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Profile from "../screens/Profile";

function CustomDrawerContent(props) {
  const [isLoggedIn, setisLoggedIn] = useAtom(loginFlag);
  console.log(isLoggedIn);

  const { state, ...rest } = props;
  const newState = { ...state }; //copy from state before applying any filter. do not change original state
  newState.routes = newState.routes.filter((item) => {
    switch (item.name) {
      case "Login screen":
      case "Registration Screen":
        return !isLoggedIn;
      case "BookmarkScreen":
      case "ProfileScreen":
        return isLoggedIn;
      default:
        return true;
    }
  }); //replace "Login' with your route name
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      setisLoggedIn(false);
      navigation.navigate("Sri Guru Granth Sahib Ji");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList state={newState} {...rest} />
      <DrawerItem
        label="Log out"
        onPress={() => {
          // logout logic
          handleLogout();
        }}
      />
    </DrawerContentScrollView>
  );
}
const Drawer = createDrawerNavigator();

export function RouterDrawer() {
  const [isLoggedIn] = useAtom(loginFlag);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Sri Guru Granth Sahib Ji"
        component={TabOneScreen}
        options={({ navigation }) => ({
          headerRight: () =>
            !isLoggedIn && <LoginButton navigation={navigation} />,
          headerShown: true,

          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        })}
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
        name="ProfileScreen"
        component={Profile}
        options={{
          title: "Profile",
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
