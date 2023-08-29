import { useMutation } from "react-query";
import { addBookmark, deleteBookmark } from "./services";
import { queryClient } from "../../App";

export const useAddBookmark = () =>
  useMutation((body) => {
    return addBookmark(body);
  });
export const useDeleteBookmark = () =>
  useMutation((id) => {
    return deleteBookmark(id).then(async (res) => {
      await queryClient.refetchQueries({ queryKey: ["bookmarks"] });
      return res;
    });
  });
