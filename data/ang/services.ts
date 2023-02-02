import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { callApi } from "../../apiUtils";

// call api to fetch ang
export const getAng = ({ angId }) => {
  return AsyncStorageLib.getItem("ang:" + angId).then((ang) => {
    if (ang) {
      console.log("using Cache for ang: " + angId);

      
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
      apiHostUrl:'http://192.168.0.101:13131'
    }).then((res) => {
      AsyncStorageLib.setItem("ang:" + angId, JSON.stringify(res));
      return res;
    });
  });
};
