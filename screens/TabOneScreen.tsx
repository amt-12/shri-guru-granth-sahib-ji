import { useContext, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Animated, Pressable } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  TextInput,
  TouchableRipple,
} from "react-native-paper";
import InfinitePager, {
  InfinitePagerImperativeApi,
} from "react-native-infinite-pager";
import * as Animatable from "react-native-animatable";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { UserContext } from "../contexts/UserState";
import { useAng } from "../data/ang/query";
import { RootTabScreenProps } from "../types";
import AsyncStorageLib from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalScreen from "./ModalScreen";
import ModalMenu from "./ModalScreen";

const { width, height } = Dimensions.get("window");
function keyExtractor(page: CreatePage) {
  return `${page.key}`;
}

function Ang({ page, setAngId }: RootTabScreenProps<"TabOne">) {
  const ang = useAng(
    { angId: page },
    {
      enabled: page > 0 && page <= 1431,
    }
  );
  const [visible, setVisible] = useState(false);
  const [angValue, setAngValue] = useState(page);
  const [viewable, setViewable] = useState(false)
  return (
    <View style={{ flex: 1 }}>
      <Portal>
        <Dialog visible={visible}>
          <TextInput
            label="Ang ID"
            focusable
            autoFocus
            keyboardType="number-pad"
            value={`${angValue}`}
            onChangeText={(value) => {
              const parsedQty = Number.parseInt(value);
              if (Number.isNaN(parsedQty)) {
                setAngValue(0); //setter for state
              } else if (parsedQty > 1431 || parsedQty < 1) {
                setAngValue(angValue);
              } else {
                setAngValue(parsedQty);
              }
            }}
          />
          <Button
            onPress={() => {
              setAngId(+angValue);
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
      <ScrollView style={styles.container}>
        {ang.data?.page?.map((page) => (
          <View key={page.line.id}>
            <Pressable onLongPress={()=>ModalScreen} >
            <Text
              style={{ fontSize: 30, fontWeight: "600", textAlign: "center" }}
            >
              {page.line.gurmukhi.unicode}
            </Text>
            </Pressable>
            <ModalMenu visible={viewable} setVisible={setViewable} />
            <Text style={{ fontSize: 20 }}>
              {page.line.translation.punjabi.default.unicode}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const NUM_ITEMS = 50;

const Page = ({ index, setAngId }: { index: number }) => {
  return <Ang page={index} setAngId={setAngId} />;
};

const slide1 = () => {
  return <Text>First page</Text>;
};
const slide2 = () => {
  return <Text>Second page</Text>;
};
const slide3 = () => {
  return <Text>Third page</Text>;
};

const slides = [slide1, slide2, slide3];
const firstSlide = slides[0];
const lastSlide = slides[slides.length - 1];

const loopingSlides = [lastSlide, ...slides, firstSlide];

export default function TabOneScreen() {
  const infinitePager = useRef<InfinitePagerImperativeApi>();

  const [displayPage, setDisplayPage] = useState(false);
  const [displayPortal, setDisplayPortal] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setDisplayPortal(false);
    }, 4000);
    setTimeout(async () => {
      let lastang = await AsyncStorage.getItem("lastAng");
      console.log({ lastang });

      infinitePager.current?.setPage(+lastang, {
        animated: false,
      });
      setDisplayPage(true);
    }, 1000);
    return () => {};
  }, [infinitePager.current]);

  return (
    <View style={styles.flex}>
      <View
        style={{
          display: displayPage ? "flex" : "none",
          flex: 1,
        }}
      >
        <InfinitePager
          ref={infinitePager}
          // PageComponent={Page}
          renderPage={(props) => (
            <Page
              {...props}
              setAngId={async (angId) => {
                infinitePager.current?.setPage(+angId, {
                  animated: false,
                });
              }}
            />
          )}
          style={styles.flex}
          pageWrapperStyle={styles.flex}
          minIndex={1}
          pageBuffer={1}
          onPageChange={(page) => {
            if (page != 0) {
              AsyncStorage.setItem("lastAng", `${page}`);
            }
          }}
        />
      </View>
      {displayPortal && (
        <Portal>
          <Animatable.View
            duration={4000}
            animation={{
              0: {
                opacity: 0,
                backgroundColor: "rgba(0,0,0,1)",
              },
              0.1: {
                opacity: 1,
                backgroundColor: "rgba(0,0,0,1)",
              },
              0.9: {
                opacity: 1,
                backgroundColor: "rgba(0,0,0,1)",
              },
              1: {
                opacity: 0,
                backgroundColor: "rgba(0,0,0,1)",
              },
            }}
            style={{
              flex: 1,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "600",
                textAlign: "center",
                alignSelf: "center",
              }}
            >
              ਵਾਹਿਗੁਰੂ ਜੀ ਦਾ ਖਾਲਸਾ{"\n"}
              ਵਾਹਿਗੁਰੂ ਜੀ ਦੀ ਫਤਿਹ
            </Text>
          </Animatable.View>
        </Portal>
      )}
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
  flex: { flex: 1 },
});
