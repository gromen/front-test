import React, {useEffect} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setPhotos} from "../reducers/app";
import {Flex} from "@chakra-ui/react";
import {useLoadMorePhotos} from "../hooks/useLoadMorePhotos";
import {API_ACCESS_KEY} from "../shared";

const List = () => {
  const dispatch = useDispatch();
  const photosList = useSelector(state => state.app.list)
  const isLoading = useSelector(state => state.app.isLoading)
  const page = useSelector(state => state.app.pageCurrent)
  const loadMorePhotos = useLoadMorePhotos();

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
      loadMorePhotos();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    const getImages = async()=> {
      try {
        const response = await axios(`https://api.unsplash.com/photos?per_page=30&page=${page}`, {
          method: 'GET',
          headers: {
            'Authorization': `Client-ID ${API_ACCESS_KEY}`,
          },
        });
        console.log(response.data)
        dispatch(setPhotos(response.data))
        console.log(photosList)

      } catch(error) {
        console.error('Error fetching images from Unsplash:', error);
      }
    }
    getImages()
  }, []);

  return <Flex justify="space-around" grow="1" wrap="wrap" className="pt-10 gap-4">
    {photosList?.map(photo => (
      <div key={photo.slug} className="w-[25%]">
        <img src={photo.urls.regular} alt={photo.alt_description}/>
      </div>
    ))}
    {isLoading && <p className="w-full">Loading photos...</p>}
  </Flex>;
};

export default List;
