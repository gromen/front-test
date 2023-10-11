import {incrementPage, setIsLoading, setPhotos} from "../reducers/app";
import {useDispatch, useSelector} from "react-redux";
import {API_ACCESS_KEY} from "../shared";

export const useLoadPhotos = () => {
  const dispatch = useDispatch();
  const pageCurrent = useSelector(state => state.app.pageCurrent);

  return async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await fetch(
        `https://api.unsplash.com/photos?per_page=30&=page=${pageCurrent}&client_id=${API_ACCESS_KEY}`,
        { method: 'GET' }
      );
      const newPhotos = await response.json();
      dispatch(setPhotos(newPhotos));
    } catch (error) {
      console.error('Error fetching more photos:', error);
    } finally {
      dispatch(setIsLoading(false));
      dispatch(incrementPage());
    }
  }
};
