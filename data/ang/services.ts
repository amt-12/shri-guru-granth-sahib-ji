import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { callApi } from "../../apiUtils";
import SERVER from "../../config/connection";

// call api to fetch ang
export const getAng = ({ angId }) => {
  return AsyncStorageLib.getItem("ang:" + angId).then((ang) => {
    if (ang) {
      return JSON.parse(ang);
    }

    return callApi({
      uriEndPoint: {
        uri: "/ang/:angId",
        method: "GET",
        version: "/v2",
      },
      pathParams: {
        angId,
      },
    }).then((res) => {
      AsyncStorageLib.setItem("ang:" + angId, JSON.stringify(res));
      return res;
    });
  });
};
