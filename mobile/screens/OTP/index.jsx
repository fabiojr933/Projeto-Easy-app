import React from "react";
import {
  VStack,
  Box,
  HStack,
  Icon,
  Text,
  Link,
  Button,
  Image,
  Hidden,
  IconButton,
  Center,
  FormControl,
  StatusBar,
  Stack,
  Input,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";

function PinInput() {
  return (
    <HStack space="2">
      {[1, 2, 3, 4, 5, 6].map((e, i) => (
        <Input
          key={i}
          variant="underlined"
          boxSize="12"
          textAlign="center"
          borderBottomWidth="2"
          fontSize="lg"
        />
      ))}
    </HStack>
  );
}

export default function OtpVerification(props) {
  // const router = useRouter(); //use incase of Nextjs
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Box
        safeAreaTop
        _light={{
          bg: "primary.900",
        }}
        _dark={{
          bg: "coolGray.900",
        }}
      />
      <Center
        my="auto"
        _dark={{
          bg: "coolGray.900",
        }}
        _light={{
          bg: "primary.900",
        }}
        flex="1"
      >
        <Stack
          flexDirection={{
            base: "column",
            md: "row",
          }}
          w="100%"
          maxW={{
            md: "1016px",
          }}
          flex={{
            base: "1",
            md: "none",
          }}
        >
          <Hidden from="md">
            <HStack space="2" px="4" mt="4" mb="5" alignItems="center">
              <IconButton
                variant="unstyled"
                onPress={() => {}}
                icon={
                  <Icon
                    alignItems="center"
                    justifyContent="center"
                    size="6"
                    as={AntDesign}
                    name="arrowleft"
                    color="coolGray.50"
                  />
                }
              />
              <Text color="coolGray.50" fontSize="lg">
                Create Password
              </Text>
            </HStack>
          </Hidden>
          <Hidden till="md">
            <Center
              flex="1"
              bg="primary.700"
              px={{
                base: "4",
                md: "8",
              }}
              borderTopLeftRadius={{
                md: "xl",
              }}
              borderBottomLeftRadius={{
                md: "xl",
              }}
            >
              <Image
                h="24"
                size="80"
                alt="NativeBase Startup+ "
                resizeMode={"contain"}
                source={require("./components/logo.png")}
              />
            </Center>
          </Hidden>
          <Box
            py={{
              base: "6",
              md: "12",
            }}
            px={{
              base: "4",
              md: "10",
            }}
            _light={{
              bg: "white",
            }}
            _dark={{
              bg: "coolGray.800",
            }}
            flex="1"
            borderTopRightRadius={{
              md: "xl",
            }}
            borderBottomRightRadius={{
              md: "xl",
            }}
          >
            <VStack justifyContent="space-between" flex="1" space="24">
              <Box>
                <VStack
                  space={{
                    base: "4",
                    md: "5",
                  }}
                >
                  <Text
                    fontSize="xl"
                    fontWeight="bold"
                    _dark={{
                      color: "coolGray.50",
                    }}
                    _light={{
                      color: "coolGray.800",
                    }}
                  >
                    Enter OTP
                  </Text>
                  <HStack space="2" alignItems="center">
                    <Text
                      _light={{
                        color: "coolGray.800",
                      }}
                      _dark={{
                        color: "coolGray.400",
                      }}
                    >
                      We have sent the OTP code to
                    </Text>
                    <Text
                      fontWeight="bold"
                      _light={{
                        color: "coolGray.800",
                      }}
                      _dark={{
                        color: "coolGray.300",
                      }}
                    >
                      87******47
                    </Text>
                  </HStack>
                </VStack>
                <VStack space="12" mt="6">
                  <FormControl>
                    <PinInput />
                    <FormControl.HelperText mt="7">
                      <HStack>
                        <Text
                          _light={{
                            color: "coolGray.800",
                          }}
                          _dark={{
                            color: "coolGray.400",
                          }}
                        >
                          Didn’t receive the OTP?
                        </Text>
                        <Link
                          _text={{
                            _light: {
                              color: "primary.900",
                            },
                            _dark: {
                              color: "violet.500",
                            },
                            fontWeight: "bold",
                            color: "violet.700",
                            textDecoration: "none",
                          }}
                        >
                          {" "}
                          RESEND OTP
                        </Link>
                      </HStack>
                    </FormControl.HelperText>
                  </FormControl>
                  <Button
                    size="md"
                    _light={{
                      bg: "primary.900",
                    }}
                    _dark={{
                      bg: "primary.700",
                    }}
                    onPress={() => {
                      props.navigation.navigate("ProductScreen");
                    }}
                  >
                    PROCEED
                  </Button>
                </VStack>
              </Box>
              <HStack
                mt="28"
                mb="4"
                space="1"
                safeAreaBottom
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  _light={{
                    color: "coolGray.800",
                  }}
                  _dark={{
                    color: "coolGray.400",
                  }}
                >
                  Already have an account?
                </Text>
                {/* Opening Link Tag navigateTo:"SignUp" */}
                <Link
                  _text={{
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                  _light={{
                    _text: {
                      color: "primary.900",
                    },
                  }}
                  _dark={{
                    _text: {
                      color: "violet.500",
                    },
                  }}
                  onPress={() => {
                    props.navigation.navigate("SignUp");
                  }}
                >
                  Sign up
                </Link>
                {/* Closing Link Tag */}
              </HStack>
            </VStack>
          </Box>
        </Stack>
      </Center>
    </>
  );
}
