import React from "react";
import { Switch, VStack } from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {toggleTheme} from "../reducers/app";

const ThemeSwitch = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.isDarkMode)

  const onChangeMode = () => {
    dispatch(toggleTheme())
    localStorage.setItem('isDarkMode', `${!isDarkMode}`)
  }

  return (
    <VStack>
      <p>Dark theme</p>
      <Switch colorScheme="teal" size="lg" checked={isDarkMode} onChange={onChangeMode}/>
    </VStack>
  );
};

export default ThemeSwitch;
