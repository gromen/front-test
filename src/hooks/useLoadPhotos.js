import {incrementPage, setIsLoading, setPhotos} from "../reducers/app";
import {useDispatch, useSelector} from "react-redux";
import axiosInstance from "../axios";

export const useLoadPhotos = () => {
  const dispatch = useDispatch();
  const pageCurrent = useSelector(state => state.app.pageCurrent);

  return async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await axiosInstance.get(`/photos?page=${pageCurrent}`);
      const newPhotos = await response.data;
      dispatch(setPhotos(newPhotos));
    } catch (error) {
      console.error('Error fetching more photos:', error);
    } finally {
      dispatch(setIsLoading(false));
      dispatch(incrementPage());
    }
  }
};
