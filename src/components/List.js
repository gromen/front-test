import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {incrementPage, setPhotos, setIsLoading} from "../reducers/app";
import {Flex} from "@chakra-ui/react";

const List = () => {
  const dispatch = useDispatch();
  const photos = useSelector(state => state.list)
  const isLoading = useSelector(state => state.isLoading)
  const page = useSelector(state => state.pageCurrent)
  const [images, setImages] = useState([]);
  const API_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_CLIENT_ID;

  const fetchMorePhotos = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await fetch(
        `https://api.unsplash.com/photos?per_page=30&=page=${page}&client_id=${API_ACCESS_KEY}`,
        { method: 'GET' }
      );
      debugger;
      const newPhotos = await response.json();
      dispatch(setPhotos(newPhotos));
      dispatch(incrementPage());
    } catch (error) {
      console.error('Error fetching more photos:', error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, page]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
      fetchMorePhotos();
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
        const response = await axios('https://api.unsplash.com/photos', {
          method: 'GET',
          headers: {
            'Authorization': `Client-ID ${API_ACCESS_KEY}`,
          },
        })
        console.log(response.data)
        dispatch(setPhotos())
        setImages(response.data)

      } catch(error) {
        console.error('Error fetching images from Unsplash:', error);
      }
    }
    getImages()
  }, []);

  return <Flex justify="space-around" grow="1" wrap="wrap" className="mt-10 gap-4">
    {images?.map(image => (
      <div key={image.slug} className="w-[25%]">
        <img src={image.urls.small} alt={image.alt_description}/>
      </div>
    ))}
    {isLoading && <p className="w-full">Loading photos...</p>}
  </Flex>;
};

export default List;
