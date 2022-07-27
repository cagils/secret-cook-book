import {
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { FileMinus } from '@styled-icons/feather';

import { FInput } from '@/components/helpers/form/FInput';

export const GroupHeading = ({
  groupName,
  editable,
  groupId,
  loading,
  handleDeleteGroup,
}) => {
  const { colorMode } = useColorMode();

  const mode = (lightValue, darkValue) =>
    colorMode == 'light' ? lightValue : darkValue;

  return (
    <HStack
      //borderBottomWidth="thin"
      borderColor={mode('pink.500', 'pink.300')}
    >
      <Heading
        size="lg"
        fontWeight="normal"
        fontSize={{
          base: '1.8em',
          sm: '2.3em',
          md: '2.8em',
          lg: '2.8em',
          xl: '3em',
        }}
        fontFamily="heading"
        color={mode('pink.500', 'pink.300')}
      >
        {!editable ? (
          groupName ? (
            groupName
          ) : (
            <Text color="whiteAlpha.400">{`unnamed`}</Text>
          )
        ) : (
          <FInput
            type="editable" /* NOTE: Refers to Chakra editable component, not related to editable prop! */
            startWithEditView={groupName === ''}
            fieldName={`group.${groupId}`}
            rules={{ required: 'This is required' }}
            label={null}
            helper={null}
            defaultValue={groupName}
            placeholder="group name"
            disabled={loading}
            // rest...
            // bg="purple.300"
            // minWidth={{ base: '100px', md: '300px' }}
            px={4}
          />
        )}
      </Heading>
      {editable && (
        <IconButton
          isRound
          aria-label="Delete Group"
          fontSize="1.2rem"
          variant="ghost"
          icon={<Icon as={FileMinus} />}
          onClick={() => handleDeleteGroup(groupId)}
        />
      )}
    </HStack>
  );
};
