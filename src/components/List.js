import React, {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setPhotos} from "../reducers/app";
import {Grid, GridItem} from "@chakra-ui/react";

const List = () => {
  const dispatch = useDispatch();
  const photos = useSelector(state => state.list)
  const [images, setImages] = useState([]);

  const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_CLIENT_ID;

  useEffect(() => {
    const getImages = async()=> {
      try {
        const response = await axios('https://api.unsplash.com/photos', {
          method: 'GET',
          headers: {
            'Authorization': `Client-ID ${ACCESS_KEY}`,
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

  return <Grid templateColumns='repeat(3, 1fr)' gap={40} className="mt-10">
    {images?.map(image => (
      <GridItem key={image.slug}>
        <GridItem>
          <img src={image.urls.small} alt={image.alt_description}/>
        </GridItem>
      </GridItem>
    ))}
  </Grid>;
};

export default List;
