import {
  Box,
  Flex,
  Icon,
  IconButton,
  Image,
  Input,
  useColorMode,
} from '@chakra-ui/react';
import { Camera } from '@styled-icons/feather';
import ImageNext from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { supabase } from '../../lib/supabase';

import { FFileUpload } from '../helpers/form/FFileUpload';
import { OverlayFader } from '../helpers/OverlayFader';

export const Photo = ({ photoUrl, user, editable, recipeId }) => {
  const uploadRef = useRef();
  const { colorMode } = useColorMode();
  const [imageUrl, setImageUrl] = useState(photoUrl);
  const [loading, setLoading] = useState(false);

  const getFileName = useCallback(() => {
    if (!user || !recipeId) {
      return null;
    }
    const rand = uuidv4();
    return `${user.id}_${recipeId}_${rand}.png`;
  }, [user, recipeId]);

  const mode = (lightValue, darkValue) =>
    colorMode == 'light' ? lightValue : darkValue;

  const _uploadPicture = () => {
    uploadRef.current.click();
  };

  const _handleUploadPicture = async () => {
    setLoading(true);
    const fileName = getFileName();
    const oldFileName = imageUrl?.split('/').pop();
    if (!fileName) return;
    const file = uploadRef.current.files[0];
    const { data1, error1 } = await supabase.storage
      .from('recipe-photos')
      .upload(`public/${fileName}`, file, {
        cacheControl: '1',
        upsert: true,
      });
    console.log('removing old image: ' + oldFileName);
    if (oldFileName) {
      const { data2, error2 } = await supabase.storage
        .from('recipe-photos')
        .remove([`public/${oldFileName}`]);
    }
    const { publicURL, error3 } = supabase.storage
      .from('recipe-photos')
      .getPublicUrl(`public/${fileName}`);

    setImageUrl(publicURL);
    const saveImageUrl = async () => {
      if (!recipeId || !publicURL) return;
      const fetchUrl = `/api/recipes/${recipeId}`;
      console.log(`patching ${fetchUrl} for photo upload`);
      const response = await fetch(fetchUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patchType: 'photo',
          photo: publicURL,
        }),
      });
      console.log('patched.');

      if (!response.ok) {
        // throw new Error(`Error: ${response.status}`);
        console.log('photo useEffect response not ok', response.status);
      }
      let res = await response.json();
    };

    saveImageUrl();
  };

  return (
    <Flex
      flexDir="column"
      borderRadius="lg"
      align="center"
      justify="center"
      boxShadow={mode('inner', 'innerWhite')}
      bgGradient={mode(
        'linear(to-b, pink.200, purple.200)',
        'linear(to-b, pink.800, purple.800)'
      )}
      p={{ base: '2px', sm: '4px', md: '6px', xl: '8px' }}
      mb={4}
      minHeight={'20rem'}
      position="relative"
    >
      {/* <FFileUpload
        fieldName={`Photo`}
        acceptedFileTypes="image/*"
        placeholder="Your avatar"
        rules={{ required: 'This is required' }}
        label={null}
        helper={null}
        //defaultValue={shortDesc}
        //disabled={loading}
        //px={2}
        //py={4}
        //m={0}
        //rows={3}
        //fontStyle="italic"
        //fontSize="1.5em"
        //fontFamily="quote"
        //fontWeight="regular"
        //textAlign="center"
      /> */}
      <OverlayFader active={loading} />
      {photoUrl && (
        <Flex
          my={{ base: '2px', sm: '2px', md: '4px', xl: '10px' }}
          align="center"
          justify="center"
          /* w={{
                      xl: '100%',
                      '2xl': '80%',
                      '3xl': '75%',
                    }} */
        >
          <Box
            //m={{ sm: '2px', md: '4px', xl: '6px' }}
            borderRadius="lg"
            //bgColor={mode('whiteAlpha.900', 'blackAlpha.500')}
          >
            <Flex
              align="center"
              justify="center"
              grow="1"
              //bgColor="orange"
              //display="flex"
              //flex="1"
              //pos="relative"
              //css="aspect-ratio: 1 / 1"
              overflow="hidden"
              borderRadius="lg"
              height="auto"
              position="relative"
            >
              {editable && (
                <Box
                  m="2"
                  position="absolute"
                  right="0px"
                  bottom="0px"
                  top="unset"
                  left="unset"
                  zIndex="1000"
                  p={{ base: '2', sm: '2', md: '4', xl: '5', '2xl': '5' }}
                >
                  <IconButton
                    // width="1.4em"
                    // height="1.4em"
                    // colorScheme="pink"
                    // isRound
                    aria-label="Edit Recipe"
                    variant="solid"
                    icon={<Icon as={Camera} />}
                    _hover={{
                      bgColor: mode('pink.500', 'purple.500'),
                      //color: mode('white', 'white'),
                    }}
                    bgColor={mode('whiteAlpha.500', 'whiteAlpha.500')}
                    //color={mode('pink.900', 'pink.900')}
                    onClick={(e) => _uploadPicture(e)}
                    // textAlign="center"
                    //fontFamily="heading"
                    fontSize={{
                      base: '2em',
                      md: '2em',
                      lg: '2em',
                      xl: '3em',
                    }}
                    width="1.2em"
                    height="1.1em"
                  />
                  <Input
                    ref={uploadRef}
                    type="file"
                    onChange={_handleUploadPicture}
                    onClick={(e) => {
                      e.target.value = null;
                    }}
                    accept="image/png, image/jpeg"
                    hidden
                  />
                </Box>
              )}
              {/* <ImageNext
                //size="100vw"
                //loading="lazy"
                src={photoUrl}
                alt={'Recipe Photo'}
                //layout="fill"
                width="500"
                height="500"
                //fit="cover"
                //htmlHeight="100%"
                //htmlWidth="100%"
                //objectPosition={'50% 50%'}
                //sx={{ aspectRatio: '16 / 9' }}
                style={{ objectFit: 'cover', aspectRatio: 0.5 }}
              /> */}

              <Image
                src={imageUrl}
                alt={'Recipe Photo'}
                layout="fill"
                fit="cover"
                width="100%"
                //height="40vh"
                minH="20rem"
                maxH="30rem"
                //htmlHeight="100%"
                //htmlWidth="100%"
                //objectPosition={'50% 50%'}
                sx={
                  {
                    // aspectRatio: '16 / 9',
                  }
                }
                onLoad={() => {
                  setLoading(false);
                }}
              />
            </Flex>
          </Box>
        </Flex>
      )}
    </Flex>
  );
};
