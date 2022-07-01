import { Box, Divider, Text, useColorMode } from '@chakra-ui/react';
import { OrnamentDivider } from '../../resources/svgs';
import { FInput } from '../helpers/form/FInput';

export const ShortDesc = ({ shortDesc, editable, loading }) => {
  const { colorMode } = useColorMode();
  const mode = (lightValue, darkValue) =>
    colorMode == 'light' ? lightValue : darkValue;

  return (
    <Box align="center" justify="center" mb={8} maxWidth="60em">
      <Divider />
      {!editable ? (
        <Text
          py={4}
          sx={{
            '&::first-letter': {
              fontSize: '1.3em',
              //color: mode('pink.500', 'pink.200'),
              fontFamily: 'title',
              fontWeight: 'thin',
              //textShadow: '0px 0px 2px rgba(120,120,120,0.8)',
              letterSpacing: '3px',
            },
            //textIndent: '1em',
          }}
          fontStyle="italic"
          fontSize="1.5em"
          fontFamily="quote"
          fontWeight="regular"
          textAlign="center"
        >
          {shortDesc}
        </Text>
      ) : (
        <Box>
          <FInput
            type="area"
            fieldName={`shortDesc`}
            rules={{ required: 'This is required' }}
            label={null}
            helper={null}
            defaultValue={shortDesc}
            placeholder="Short description"
            disabled={loading}
            px={2}
            py={4}
            m={0}
            rows={3}
            fontStyle="italic"
            fontSize="1.5em"
            fontFamily="quote"
            fontWeight="regular"
            textAlign="center"
          />
        </Box>
      )}
      <Divider />
      <Box width="full" align="center" justify="center" mt="8">
        <OrnamentDivider
          height="5em"
          fill={mode(
            'var(--chakra-colors-pink-400)',
            'var(--chakra-colors-pink-500)'
          )}
        />
      </Box>
    </Box>
  );
};
