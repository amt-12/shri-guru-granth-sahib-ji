import { useMutation } from "react-query";
import { queryClient } from "../../App";
import { getProfile } from "./services";

export const useDeleteBookmark = () =>
  useMutation((id) => {
    return getProfile(id).then(async (res) => {
      await queryClient.refetchQueries({ queryKey: ["profile"] });
      return res;
    });
  });
