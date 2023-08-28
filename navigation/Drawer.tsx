import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import Login from "../screens/Login";
import Registration from "../screens/Registration";
import TabOneScreen from "../screens/TabOneScreen";
import LoginButton from "../components/LoginBtn";
import Bookmark from "../screens/Bookmark";
import { loginFlag } from "../store/auth";
import { useAtom } from "jotai";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Profile from "../screens/Profile";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function CustomDrawerContent(props) {
  const [isLoggedIn, setisLoggedIn] = useAtom(loginFlag);

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
      <DrawerItemList {...props} />
      <DrawerItem
        label="Log out"
        onPress={() => {
          // logout logic
          handleLogout();
        }}
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="logout" color="green" size={size} />
        )}
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
            <MaterialIcons name="home" color="orange" size={size} />
          ),
        })}
      />
      {isLoggedIn && (
        <>
          <Drawer.Screen
            name="BookmarkScreen"
            component={Bookmark}
            options={{
              title: "Bookmark",
              headerShown: true,
              headerStyle: {
                backgroundColor: "rgb(1,1,1)",
              },
              headerTintColor: "rgb(255,255,255)",
              headerTitleAlign: "center",
              drawerIcon: ({ color, size }) => (
                <Foundation
                  name="book-bookmark"
                  style={{ color: "rgb(50,150,230)" }}
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="ProfileScreen"
            component={Profile}
            options={{
              title: "Profile",
              headerShown: true,
              drawerIcon: ({ color, size }) => (
                <MaterialIcons
                  name="person"
                  style={{ color: "rgb(250,220,130)" }}
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </>
      )}
      {!isLoggedIn && (
        <>
          <Drawer.Screen
            name="Loginscreen"
            component={Login}
            options={{
              title: "Login",
              headerShown: true,

              drawerIcon: ({ color, size }) => (
                <MaterialIcons
                  name="lock"
                  color="rgb(100,150,169)"
                  size={size}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="RegistrationScreen"
            component={Registration}
            options={{
              title: "Registration",
              headerShown: true,
              drawerIcon: ({ color, size }) => (
                <MaterialIcons
                  name="person"
                  color="rgb(150, 90, 160)"
                  size={size}
                />
              ),
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
}
