import { useContext, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Animated } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  TextInput,
  TouchableRipple,
} from "react-native-paper";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { UserContext } from "../contexts/UserState";
import { useAng } from "../data/ang/query";
import { RootTabScreenProps } from "../types";
import { LazyPagerView } from "react-native-pager-view";
import { NavigationPanel } from "../components/NavigationPanel";
import { useNavigationPanel } from "../hooks/useNavigationPanel";

const AnimatedPagerView = Animated.createAnimatedComponent(LazyPagerView);

const { width, height } = Dimensions.get("window");
function keyExtractor(page: CreatePage) {
  return `${page.key}`;
}

function Ang({ page }: RootTabScreenProps<"TabOne">) {
  const { angId, setAngId } = useContext(UserContext);

  const ang = useAng({ angId });
  const [visible, setVisible] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <Portal>
        <Dialog visible={visible}>
          <TextInput
            label="Ang ID"
            focusable
            keyboardType="number-pad"
            value={`${angId}`}
            onChangeText={(p) => {
              if (+p < 1) {
                setAngId(1);
                return;
              }
              if (+p > 1430) return;
              setAngId(+p);
            }}
          />
          <Button
            onPress={() => {
              setVisible(false);
            }}
          >
            OK
          </Button>
        </Dialog>
      </Portal>
      <Button
        onPress={() => {
          setVisible(true);
        }}
      >
        <Text style={{ textAlign: "right", padding: 5 }}>
          Ang: {ang.data?.pageno}
        </Text>
      </Button>
      <ScrollView
        onTouchEnd={(e) => {
          if (e.nativeEvent.locationX < 50 && angId > 1) {
            setAngId((p) => p - 1);
          }
          if (e.nativeEvent.locationX > width - 50 && angId < 1400) {
            setAngId((p) => p + 1);
          }
        }}
        style={styles.container}
      >
        {ang.data?.page?.map((page) => (
          <View key={page.line.id}>
            <Text
              style={{ fontSize: 30, fontWeight: "600", textAlign: "center" }}
            >
              {page.line.gurmukhi.unicode}
            </Text>
            <Text style={{ fontSize: 20 }}>
              {page.line.translation.punjabi.default.unicode}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
function renderItem(a) {
  return <Ang page={a} />;
}
export default function TabOneScreen() {
  return <Ang />;
  const { ref, ...navigationPanel } =
    useNavigationPanel<LazyPagerView<unknown>>(10);

  return (
    <View style={styles.pagerView}>
      <Button
        onPress={() => {
          navigationPanel.setPage(140);
        }}
      >
        change
      </Button>
      <AnimatedPagerView
        ref={ref}
        style={styles.pagerView}
        initialPage={0}
        maxRenderWindow={20}
        buffer={5}
        overdrag={navigationPanel.overdragEnabled}
        scrollEnabled={navigationPanel.scrollEnabled}
        onPageScroll={navigationPanel.onPageScroll}
        onPageSelected={navigationPanel.onPageSelected}
        onPageScrollStateChanged={navigationPanel.onPageScrollStateChanged}
        pageMargin={20}
        // Lib does not support dynamically orientation change
        orientation="horizontal"
        // Lib does not support dynamically transitionStyle change
        transitionStyle="curl"
        // showPageIndicator={navigationPanel.dotsEnabled}
        renderItem={renderItem}
        data={navigationPanel.pages}
        keyExtractor={keyExtractor}
        // offscreenPageLimit={2}
        overScrollMode={"always"}
      ></AnimatedPagerView>
      <NavigationPanel {...navigationPanel} />
    </View>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 10,
    alignContent: "center",
    backgroundColor: "white",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
