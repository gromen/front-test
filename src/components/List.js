import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {Flex} from "@chakra-ui/react";
import {useLoadPhotos} from "../hooks/useLoadPhotos";

const List = () => {
  const photosList = useSelector(state => state.app.list)
  const isLoading = useSelector(state => state.app.isLoading)
  const loadMorePhotos = useLoadPhotos();

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
    loadMorePhotos()
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
