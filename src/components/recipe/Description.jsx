import { Box, Divider, Heading, useColorMode } from '@chakra-ui/react';
import { FInput } from '../helpers/form/FInput';

export const Description = ({ editable, description, loading }) => {
  const { colorMode } = useColorMode();
  const mode = (lightValue, darkValue) =>
    colorMode == 'light' ? lightValue : darkValue;

  return (
    <Box
      align="start"
      mx={{ base: '4px', sm: '6px', md: '8px', xl: '10px' }}
      px={{ base: '4px', sm: '6px', md: '8px', xl: '10px' }}
    >
      <Box my={4}>
        <Heading
          width="full"
          textAlign="start"
          fontSize="3em"
          as="h3"
          fontFamily="heading"
          fontWeight="semibold"
          color={mode('pink.500', 'pink.300')}
        >
          Instructions
        </Heading>
        <Divider />
      </Box>
      <Box
        mt={4}
        borderRadius="lg"
        //borderWidth="thin"
        p={{ base: '0', sm: '0', md: '4', xl: '8' }}
        borderColor={mode('blackAlpha.200', 'whiteAlpha.200')}
      >
        {!editable ? (
          <Box>
            {/* <Box dangerouslySetInnerHTML={{__html: descriptionHtml}}/> */}
            <Box fontFamily="body" fontSize="1.1em" whiteSpace="pre-line">
              {description}
            </Box>
          </Box>
        ) : (
          <Box>
            <FInput
              type="area"
              fieldName={`description.text`}
              rules={{ required: 'This is required' }}
              label={null}
              helper={null}
              defaultValue={description}
              placeholder="Recipe text"
              disabled={loading}
              px={2}
              rows={20}
              fontFamily="body"
              fontSize="1.1em"
              whiteSpace="pre-line"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
