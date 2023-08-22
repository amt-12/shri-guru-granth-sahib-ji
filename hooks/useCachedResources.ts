import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
          "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
          "Lora-Regular": require("../assets/fonts/Lora-Regular.ttf"),
          "Lobster-Regular": require("../assets/fonts/Lobster-Regular.ttf"),
          GurbaniAkhar: require("../assets/fonts/GurbaniAkhar.ttf"),
          GurbaniAkharHeavy: require("../assets/fonts/GurbaniAkharHeavy.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
