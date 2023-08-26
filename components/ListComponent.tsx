import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
} from "react-native";
import React, { useState } from "react";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import SERVER from "../config/connection";

const LIST_HEIGHT = 60;
const TRANSLATE_X_THRESHOLD = 20;
const ListComponent = ({ data }: any) => {

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${SERVER}/bookmark/${id}`);
    } catch (err) {
      if (err.response) {
        console.log("Server Error:", err.response.status, err.response.data);
      } else {
        console.log("Network Error:", err.message);
      }
    }
  };
  return (
   
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ListItem item={item} onDelete={handleDelete} />
        )}
      />
    </Modal>
  );
};

const ListItem = ({ item, onDelete }: any) => {
  const translateX = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: () => {
      if (translateX.value < -TRANSLATE_X_THRESHOLD) {
        translateX.value = withSpring(-LIST_HEIGHT);
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  return (
    <View>
      <Animated.View style={styles.iconcontainer}>
        <Pressable onPress={() => onDelete(item)}>
          <FontAwesome5
            name={"trash-alt"}
            size={LIST_HEIGHT * 0.35}
            color={"white"}
          />
        </Pressable>
      </Animated.View>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={[styles.insidecontainer, rStyle]}>
          <Text
            style={{
              fontSize: 20,
              color: "rgb(255,255,255)",
              fontFamily: "GurbaniAkharHeavy",
              alignItems: "center",
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              color: "rgb(200, 200, 200)",
            }}
          >
            ANG: {item.ang}
          </Text>
        </Animated.View>
      
      </PanGestureHandler>
    </View>
  );
};

export default ListComponent;

const styles = StyleSheet.create({
  insidecontainer: {
    marginHorizontal: 20,
    width: "96%",
    padding: 12,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#232323",
    alignItems: "center",
  },
  iconcontainer: {
    height: LIST_HEIGHT,
    width: 60,
    backgroundColor: "red",
    justifyContent: "center",
    position: "absolute",
    right: 0.1,
    alignItems: "center",
  },
});
