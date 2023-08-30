import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  TouchableOpacity,
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
import { useDeleteBookmark } from "../data/bookmark/mutation";
import { ActivityIndicator } from "react-native";

const LIST_HEIGHT = 60;
const TRANSLATE_X_THRESHOLD = 20;
const ListComponent = ({ data }: any) => {
  const deleteBookmark = useDeleteBookmark();

  const handleDelete = async (id) => deleteBookmark.mutateAsync(id);
  if (deleteBookmark.isLoading)
    return <ActivityIndicator animating size={"large"} />;

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <ListItem
          item={item}
          onDelete={() => {
            handleDelete(item._id);
          }}
        />
      )}
    />
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
          <View style={{ flex: 1, flexDirection: "row", marginRight: 5 }}>
            <TouchableOpacity>
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
            </TouchableOpacity>
          </View>
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
    width: "100%",
    height: 60,
    paddingHorizontal: 12,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#565656",
    alignItems: "center",
  },
  iconcontainer: {
    height: 60,
    width: 60,
    padding: 5,
    backgroundColor: "red",
    justifyContent: "center",
    position: "absolute",
    right: 0.1,
    alignItems: "center",
  },
});
