import { Text } from '@chakra-ui/react';
import React, { useRef } from 'react';

const useRenderCounter = () => {
  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;

  return <Text>{renderCount.current}</Text>;
};

export default useRenderCounter;
