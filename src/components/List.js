import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {Flex} from "@chakra-ui/react";
import {useLoadPhotos} from "../hooks/useLoadPhotos";

const List = () => {
  const photosList = useSelector(state => state.app.list)
  const isLoading = useSelector(state => state.app.isLoading)
  const loadPhotos = useLoadPhotos();

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
      loadPhotos();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    loadPhotos()
  }, []);

  return <Flex justify="space-around" grow="1" wrap="wrap" className="pt-10">
    {photosList?.map(photo => (
      <figure key={photo.slug} className="w-1/3 flex flex-col justify-start items-center">
        <img src={photo.urls.thumb} alt={photo.alt_description}/>
        <figcaption>{photo.user.name}</figcaption>
      </figure>
    ))}
    {isLoading && <p className="w-full">Loading photos...</p>}
  </Flex>;
};

export default List;
