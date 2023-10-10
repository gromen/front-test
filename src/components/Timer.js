import { HStack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const date = new Date().toTimeString();

  return (
    <VStack gap="10px" align="left">
      <HStack>
        <Text fontWeight="bold">Seconds spend on page:</Text>
        <p>{`${seconds} s`}</p>
      </HStack>
      <HStack>
        <Text fontWeight="bold">Time of entering the website:</Text>
        <p>{date}</p>
      </HStack>
    </VStack>
  );
};

export default Timer;
