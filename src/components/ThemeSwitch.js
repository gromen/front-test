import React from "react";
import { Switch, VStack } from "@chakra-ui/react";

const ThemeSwitch = () => {
  return (
    <VStack>
      <p>Dark theme</p>
      <Switch colorScheme="teal" size="lg" />
    </VStack>
  );
};

export default ThemeSwitch;
