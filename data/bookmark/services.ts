import { callApi } from "../../apiUtils";
import SERVER from "../../config/connection";

// call api to fetch ang
export const getBookmark = () => {
  return callApi({
    uriEndPoint: {
      uri: "bookmark",
      method: "GET",
      version: "",
    },
    apiHostUrl: SERVER,
  }).then((res) => {
    return res;
  });
};

export const addBookmark = (body) => {
  return callApi({
    uriEndPoint: {
      uri: "bookmark",
      method: "POST",
      version: "",
    },
    apiHostUrl: SERVER,
    body,
  }).then((res) => {
    return res;
  });
};

export const deleteBookmark = (bookmarkId) => {
  return callApi({
    uriEndPoint: {
      uri: "bookmark/:bookmarkId",
      method: "DELETE",
      version: "",
    },
    apiHostUrl: SERVER,
    pathParams: {
      bookmarkId,
    },
  }).then((res) => {
    return res;
  });
};
