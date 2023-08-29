import { useQuery } from "react-query";
import { Ang } from "../../types";
import { getBookmark } from "./services";

export const useBookmarks = () =>
  useQuery<any, any, Ang, any>(["bookmarks"], async () => getBookmark());
