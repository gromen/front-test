import React, {useEffect, useState} from "react";
import axios from "axios";

const List = () => {
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
        setImages(response.data)

      } catch(error) {
        console.error('Error fetching images from Unsplash:', error);
      }
    }
    getImages()
  }, []);

  return <div style={{ minHeight: "90vh", width: "100%" }}>
    {images?.map(image=>(
      <img key={image.slug} src={image.urls.small} alt={image.alt_description}/>
    ))}
  <
  /div>;
};

export default List;
