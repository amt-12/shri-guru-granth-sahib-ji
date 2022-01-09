import type {
  Pageable,
  PageScrollStateChangedNativeEvent,
  PagerViewOnPageScrollEventData,
  PagerViewOnPageSelectedEventData,
} from "react-native-pager-view";
import { Animated } from "react-native";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import type { ViewStyle } from "react-native";
import { UserContext } from "../contexts/UserState";

export type UseNavigationPanelProps = ReturnType<typeof useNavigationPanel>;

export interface EventLog {
  event: "scroll" | "select" | "statusChanged";
  text: string;
  timestamp: Date;
}

const getBasePages = (pages: number) =>
  new Array(pages).fill("").map((_v, index) => createPage(index));

export function useNavigationPanel<T extends Pageable>(
  pagesAmount: number = 10,
  onPageSelectedCallback: (position: number) => void = () => {}
) {
  const ref = useRef<T>(null);
  const [pages, setPages] = useState<CreatePage[]>(
    useMemo(() => getBasePages(pagesAmount), [pagesAmount])
  );
  const [activePage, setActivePage] = useState(0);
  const [isAnimated, setIsAnimated] = useState(true);
  const [overdragEnabled, setOverdragEnabled] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [scrollState, setScrollState] = useState("idle");
  const [dotsEnabled, setDotsEnabled] = useState(false);
  const [logs, setLogs] = useState<EventLog[]>([]);
  const [progress, setProgress] = useState({ position: 0, offset: 0 });
  const onPageScrollOffset = useRef(new Animated.Value(0)).current;
  const onPageScrollPosition = useRef(new Animated.Value(0)).current;
  const onPageSelectedPosition = useRef(new Animated.Value(0)).current;

  const setPage = useCallback(
    (page: number) =>
      isAnimated
        ? ref.current?.setPage(page)
        : ref.current?.setPageWithoutAnimation(page),
    [isAnimated]
  );

  const addLog = useCallback((log: EventLog) => {
    setLogs((text) => [log, ...text].slice(0, 100));
  }, []);

  const addPage = useCallback(
    () => setPages((prevPages) => [...prevPages, createPage(prevPages.length)]),
    []
  );
  const removePage = useCallback(
    () => setPages((prevPages) => prevPages.slice(0, prevPages.length - 1)),
    []
  );
  const toggleAnimation = useCallback(
    () => setIsAnimated((animated) => !animated),
    []
  );
  const toggleScroll = useCallback(
    () => setScrollEnabled((enabled) => !enabled),
    []
  );
  const toggleDots = useCallback(
    () => setDotsEnabled((enabled) => !enabled),
    []
  );
  const toggleOverdrag = useCallback(
    () => setOverdragEnabled((enabled) => !enabled),
    []
  );

  const onPageScroll = useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: onPageScrollOffset,
              position: onPageScrollPosition,
            },
          },
        ],
        {
          listener: ({ nativeEvent: { offset, position } }) => {
            addLog({
              event: "scroll",
              text: `Position: ${position} Offset: ${offset}`,
              timestamp: new Date(),
            });
            setProgress({
              position,
              offset,
            });
          },
          useNativeDriver: true,
        }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const { angId, setAngId } = useContext(UserContext);

  const onPageSelected = useMemo(
    () =>
      Animated.event<PagerViewOnPageSelectedEventData>(
        [{ nativeEvent: { position: onPageSelectedPosition } }],
        {
          listener: ({ nativeEvent: { position } }) => {
            addLog({
              event: "select",
              text: `Page: ${position}`,
              timestamp: new Date(),
            });
            // setAngId(position + 1);
            // console.log({ position });

            setActivePage(position);
            onPageSelectedCallback(position);
          },
          useNativeDriver: true,
        }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onPageScrollStateChanged = useCallback(
    (e: PageScrollStateChangedNativeEvent) => {
      console.log(e.nativeEvent);

      addLog({
        event: "statusChanged",
        text: `State: ${e.nativeEvent.pageScrollState}`,
        timestamp: new Date(),
      });
      setScrollState(e.nativeEvent.pageScrollState);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    ref,
    activePage,
    isAnimated,
    pages,
    scrollState,
    scrollEnabled,
    dotsEnabled,
    progress,
    overdragEnabled,
    setPage,
    addPage,
    removePage,
    toggleScroll,
    toggleDots,
    toggleAnimation,
    setProgress,
    onPageScroll,
    onPageSelected,
    onPageScrollStateChanged,
    toggleOverdrag,
    logs,
  };
}

export const PAGES = 5;
export const BGCOLOR = ["#fdc08e", "#fff6b9", "#99d1b7", "#dde5fe", "#f79273"];
export const IMAGE_URIS = [
  "https://apod.nasa.gov/apod/image/1410/20141008tleBaldridge001h990.jpg",
  "https://apod.nasa.gov/apod/image/1409/volcanicpillar_vetter_960.jpg",
  "https://apod.nasa.gov/apod/image/1409/m27_snyder_960.jpg",
  "https://apod.nasa.gov/apod/image/1409/PupAmulti_rot0.jpg",
  "https://apod.nasa.gov/apod/image/1510/lunareclipse_27Sep_beletskycrop4.jpg",
];
export const thumbsUp = "\uD83D\uDC4D";
export const logoUrl =
  "https://raw.githubusercontent.com/callstack/react-native-pager-view/master/img/viewpager-logo.png";

export type CreatePage = {
  key: number;
  style: ViewStyle;
  imgSource: { uri: string };
};

export const createPage = (key: number): any => {
  return {
    key: key,
    style: {
      backgroundColor: BGCOLOR[key % BGCOLOR.length],
      alignItems: "center",
      flex: 1,
      padding: 20,
    },
  };
};
