import React, { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Icon,
  Text,
  VStack,
  StatusBar,
  Avatar,
  Image,
  Input,
  useColorMode,
  ScrollView,
  Pressable,
  Center,
  Divider,
  Button,
  IconButton,
  Stack,
  Link,
  Hidden,
  Menu,
  Badge,
  Spacer,
  Modal,
  FormControl,
  Select,
  Flex
} from "native-base";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import SyncStorage from '@react-native-async-storage/async-storage';

const reviews = [
  {
    id: '1',
    imageUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    name: "Laura Jones",
    time: "12 May 2021",
    review:
      "I loved the quality of their products. Highly recommended to everyone who is looking for comfortable bodysuits for their kids.",
  },
  {
    id: '2',
    imageUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    name: "Laura Jones",
    time: "02 Jan 2021",
    review:
      "I loved the quality of their products. Highly recommended to everyone who is looking for comfortable bodysuits for their kids.",
  },
  {
    id: '3',
    imageUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    name: "Rati Agarwal",
    time: "31 Aug 2021",
    review:
      "I loved the quality of their products. Highly recommended to everyone who is looking for comfortable bodysuits for their kids.",
  },
];

const AddToCartButton = (props) => {

  return (
    <HStack
      mt="5"
      space="4"
      alignItems="center"
      display={{
        base: props.base,
        md: props.md,
      }}
    >
      <Center
        p="2"
        borderRadius="4"
        _light={{
          bg: "primary.100",
        }}
        _dark={{
          bg: "coolGray.900",
        }}
      >
        <Icon
          size="8"
          name="heart"
          as={EvilIcons}
          _dark={{
            color: "violet.500",
          }}
          _light={{
            color: "primary.900",
          }}
        />
      </Center>
      <Button
        flex={1}
        h="100%"
        py={3}
        borderRadius="4"
        _dark={{
          bg: "violet.700",
        }}
        _light={{
          bg: "primary.900",
        }}
        _text={{
          fontSize: "md",
          fontWeight: "semibold",
        }}
      >
        Add To Cart
      </Button>
    </HStack>
  );
};

export default function (props) {

  const navigate = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);
  let [service, setService] = React.useState("");
  const [tabName, setTabName] = React.useState("Reviews");
  const { colorMode } = useColorMode();
  const [autenticacao, setAutenticacao] = useState();

  useEffect(() => {
    async function loadData() {
      await SyncStorage.getItem('@user').then((value) => {
        setAutenticacao(JSON.parse(value).autorizacao);
        console.log(JSON.parse(value).autorizacao)
      });
    }
    loadData();
  }, []);

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
      <VStack
        flex={1}
        _light={{
          bg: "primary.50",
        }}
        _dark={{
          bg: "customGray",
        }}
      >
        <Box
          px={{
            base: "4",
            md: "8",
          }}
          pt={{
            base: "4",
            md: "3",
          }}
          pb={{
            base: "5",
            md: "3",
          }}
          borderBottomWidth={{
            md: "1",
          }}
          _dark={{
            bg: "coolGray.900",
            borderColor: "coolGray.700",
          }}
          _light={{
            bg: {
              base: "primary.900",
              md: "white",
            },
            borderColor: "coolGray.200",
          }}
        >
          {/* Mobile header */}
          <Hidden from="md">
            <HStack space="2" justifyContent="center">
              <HStack space="2" alignItems="center">






                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard justifyContent="center" bottom="8" size="xl"
                  _backdrop={{
                    _dark: {
                      bg: "violet.900"
                    },
                    bg: "muted.900"
                  }}
                >
                  <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Selecione o mes e ano</Modal.Header>
                    <Modal.Body>
                      <FormControl mt="3">
                        <FormControl.Label>Mes</FormControl.Label>



                        <Select onValueChange={itemValue => setService(itemValue)}>

                          <Select.Item label="Janeiro" value="Janeiro" key="1" />
                          <Select.Item label="Fevereiro" value="Fevereiro" key="2" />
                          <Select.Item label="Março" value="Março" key="3" />
                          <Select.Item label="Abril" value="Abril" key="4" />
                          <Select.Item label="Maio" value="Maio" key="5" />
                          <Select.Item label="Junho" value="Junho" key="6" />
                          <Select.Item label="Julho" value="Julho" key="7" />
                          <Select.Item label="Agosto" value="Agosto" key="8" />
                          <Select.Item label="Setembro" value="Setembro" key="9" />
                          <Select.Item label="Outubro" value="Outubro" key="10" />
                          <Select.Item label="Novembro" value="Novembro" key="11" />
                          <Select.Item label="Desembro" value="Desembro" key="12" />
                        </Select>


                        <FormControl.Label>Ano</FormControl.Label>

                        <Select onValueChange={itemValue => setService(itemValue)}>
                          <Select.Item label="2022" value="2022" key={1} />
                          <Select.Item label="2023" value="2023" key={2} />
                          <Select.Item label="2024" value="2024" key={3} />
                          <Select.Item label="2025" value="2025" key={4} />
                        </Select>




                      </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button backgroundColor='violet.800' flex="1" onPress={() => {
                        setModalVisible(false);
                      }}>
                        Processar
                      </Button>
                    </Modal.Footer>
                  </Modal.Content>
                </Modal>
                <VStack space={8} alignItems="center" justifyContent={"center"}>
                  <Button backgroundColor='#D1D95' w="300" h='10' onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                    Junho 2022
                  </Button>
                </VStack>









              </HStack>
            </HStack>
          </Hidden>
          {/* Desktop header */}
          <Hidden till="md">
            <HStack alignItems="center" justifyContent="space-between">
              <HStack space="8" alignItems="center">
                <IconButton
                  variant="ghost"
                  colorScheme="light"
                  onPress={props.toggleSidebar}
                  icon={
                    <Icon
                      size="6"
                      name="menu-sharp"
                      as={Ionicons}
                      _light={{
                        color: "coolGray.800",
                      }}
                      _dark={{
                        color: "coolGray.50",
                      }}
                    />
                  }
                />

                {colorMode == "light" ? (
                  <Image
                    h="10"
                    w="56"
                    alt="NativeBase Startup+"
                    resizeMode="contain"
                    source={require("./components/header_logo_light.png")}
                  />
                ) : (
                  <Image
                    h="10"
                    w="56"
                    alt="NativeBase Startup+"
                    resizeMode="contain"
                    source={require("./components/header_logo_dark.png")}
                  />
                )}
              </HStack>
              <HStack space="8" alignItems="center">
                <Input
                  px="4"
                  w="30%"
                  size="sm"
                  placeholder="Search"
                  InputLeftElement={
                    <Icon
                      px="2"
                      size="4"
                      name={"search"}
                      as={FontAwesome}
                      _light={{
                        color: "coolGray.400",
                      }}
                      _dark={{
                        color: "coolGray.100",
                      }}
                    />
                  }
                />

                <HStack space="5" alignItems="center">
                  <IconButton
                    icon={
                      <Icon
                        size="6"
                        _dark={{
                          color: "coolGray.50",
                        }}
                        _light={{
                          color: "coolGray.400",
                        }}
                        as={Entypo}
                        name={"share"}
                      />
                    }
                  />
                  <IconButton
                    icon={
                      <Icon
                        size="6"
                        name={"heart"}
                        as={FontAwesome}
                        _dark={{
                          color: "coolGray.50",
                        }}
                        _light={{
                          color: "coolGray.400",
                        }}
                      />
                    }
                  />
                  <IconButton
                    icon={
                      <Icon
                        size="6"
                        _dark={{
                          color: "coolGray.50",
                        }}
                        _light={{
                          color: "coolGray.400",
                        }}
                        as={Feather}
                        name={"shopping-cart"}
                      />
                    }
                  />
                </HStack>

                <Menu
                  closeOnSelect={false}
                  w="190"
                  onOpen={() => console.log("opened")}
                  onClose={() => console.log("closed")}
                  trigger={(triggerProps) => {
                    return (
                      <Pressable {...triggerProps}>
                        <Avatar
                          w="8"
                          h="8"
                          borderWidth="2"
                          _dark={{
                            borderColor: "primary.700",
                          }}
                          source={{
                            uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                          }}
                        />
                      </Pressable>
                    );
                  }}
                >
                  <Menu.Group title="Profile">
                    <Menu.Item>Account</Menu.Item>
                    <Menu.Item>Billing</Menu.Item>
                    <Menu.Item>Security</Menu.Item>
                  </Menu.Group>
                  <Divider mt="3" w="100%" />
                  <Menu.Group title="Shortcuts">
                    <Menu.Item>Settings</Menu.Item>
                    <Menu.Item>Logout</Menu.Item>
                  </Menu.Group>
                </Menu>
              </HStack>
            </HStack>
          </Hidden>
        </Box>

        <Box
          flex={1}
          flexDirection={{
            base: "column",
            md: "row",
          }}
          _light={{
            borderTopColor: "coolGray.200",
          }}
          _dark={{
            bg: "coolGray.800",
            borderTopColor: "coolGray.700",
          }}
        >
          <ScrollView
            flex={1}
            p={{
              md: 8,
            }}
            contentContainerStyle={{
              alignItems: "center",
              flex: 1,
            }}
          >
            <VStack maxW="1016px" flex={1} width="100%">
              <Hidden till="md">
                <HStack mb="4" space={2}>
                  <Pressable>
                    <Icon
                      size="6"
                      as={AntDesign}
                      name={"arrowleft"}
                      _light={{
                        color: "coolGray.800",
                      }}
                      _dark={{
                        color: "coolGray.50",
                      }}
                    />
                  </Pressable>
                  <Text
                    fontSize="lg"
                    _dark={{
                      color: "coolGray.50",
                    }}
                    _light={{
                      color: "coolGray.800",
                    }}
                  >
                    Body Suit
                  </Text>
                </HStack>
              </Hidden>

              <Stack
                flex={1}
                p={{
                  md: "8",
                }}
                _light={{
                  bg: "white",
                }}
                _dark={{
                  borderColor: "coolGray.700",
                  bg: {
                    md: "coolGray.900",
                    base: "coolGray.800",
                  },
                }}
                borderWidth={1}
                borderColor="#E5E7EB"
                borderRadius={8}
                direction={{
                  base: "column",
                  md: "row",
                }}
                space="6"
              >




                <Box
                  p="2"
                  bg="primary.100"
                  borderRadius="md"
                  alignItems="center"
                  w={{
                    base: "100%",
                    md: "50%",
                  }}
                  h={{
                    base: "30%",
                    md: "auto",
                  }}
                  pr={{
                    base: "2",
                    md: "4",
                  }}
                  justifyContent="center"
                >

















                  <ScrollView horizontal showsHorizontalScrollIndicator={false} backgroundColor='violet.800'>


                    <Pressable onPress={() => console.log("I'm Pressed")} style={{ paddingLeft: 8, paddingRight: 20 }} >
                      <Box height={190} width={350} marginTop={2.5} maxW="96" borderWidth="1" borderColor="coolGray.300" shadow="3" bg="coolGray.100" p="5" rounded="8">
                        <HStack alignItems="center">
                          <Badge backgroundColor={'rgb(77, 29 ,149)'} _text={{
                            color: "white"
                          }} variant="solid" rounded="4">
                            Saldo
                          </Badge>
                          <Spacer />
                          <Text fontSize={10} color="coolGray.800">
                            1 month ago
                          </Text>
                        </HStack>
                        <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                          R$ 1500,22
                        </Text>
                        <Text mt="2" fontSize="sm" color="coolGray.700">
                          Banco do brasil
                        </Text>
                        <Flex>
                          <Text mt="2" fontSize={12} fontWeight="medium" color="darkBlue.600">
                            Visualizar Lançamentos
                          </Text>
                        </Flex>
                      </Box>
                    </Pressable>


                    <Pressable onPress={() => console.log("I'm Pressed")} style={{ paddingLeft: 8, paddingRight: 20 }} >
                      <Box height={190} width={350} marginTop={2.5} maxW="96" borderWidth="1" borderColor="coolGray.300" shadow="3" bg="coolGray.100" p="5" rounded="8">
                        <HStack alignItems="center">
                          <Badge colorScheme="darkBlue" _text={{
                            color: "white"
                          }} variant="solid" rounded="4">
                            Saldo
                          </Badge>
                          <Spacer />
                          <Text fontSize={10} color="coolGray.800">
                            1 month ago
                          </Text>
                        </HStack>
                        <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                          R$ 1500,22
                        </Text>
                        <Text mt="2" fontSize="sm" color="coolGray.700">
                          Banco do brasil
                        </Text>
                        <Flex>
                          <Text mt="2" fontSize={12} fontWeight="medium" color="darkBlue.600">
                            Visualizar Lançamentos
                          </Text>
                        </Flex>
                      </Box>
                    </Pressable>



                    <Pressable onPress={() => console.log("I'm Pressed")} style={{ paddingLeft: 8, paddingRight: 20 }} >
                      <Box height={190} width={350} marginTop={2.5} maxW="96" borderWidth="1" borderColor="coolGray.300" shadow="3" bg="coolGray.100" p="5" rounded="8">
                        <HStack alignItems="center">
                          <Badge colorScheme="darkBlue" _text={{
                            color: "white"
                          }} variant="solid" rounded="4">
                            Saldo
                          </Badge>
                          <Spacer />
                          <Text fontSize={10} color="coolGray.800">
                            1 month ago
                          </Text>
                        </HStack>
                        <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                          R$ 1500,22
                        </Text>
                        <Text mt="2" fontSize="sm" color="coolGray.700">
                          Banco do brasil
                        </Text>
                        <Flex>
                          <Text mt="2" fontSize={12} fontWeight="medium" color="darkBlue.600">
                            Visualizar Lançamentos
                          </Text>
                        </Flex>
                      </Box>
                    </Pressable>



                  </ScrollView>
                </Box>





                <ScrollView showsVerticalScrollIndicator={false}  >
                  <Box
                    flex={1}
                    px={{
                      base: "4",
                    }}
                  >
                    <VStack space={1}>
                      <HStack
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text
                          fontSize="lg"
                          _light={{
                            color: "coolGray.800",
                          }}
                          _dark={{
                            color: "coolGray.50",
                          }}
                        >
                          Saldo:
                        </Text>
                        <HStack alignItems="center" space="1">

                          <Text
                            fontSize="xl"
                            fontWeight="medium"
                            _light={{
                              color: "green.500",
                            }}
                            _dark={{
                              color: "green.500",
                            }}
                          >
                            R$ 800,000
                          </Text>
                          <Text
                            fontSize="sm"
                            fontWeight="medium"
                            _light={{
                              color: "coolGray.400",
                            }}
                            _dark={{
                              color: "coolGray.300",
                            }}
                          >
                            ( Reais)
                          </Text>
                        </HStack>
                      </HStack>


                      <Text
                        fontSize="sm"
                        fontWeight="medium"
                        color="coolGray.400"
                      >
                        Total de entrada
                      </Text>
                      <Text
                        fontSize="xl"
                        fontWeight="medium"
                        _light={{
                          color: "blue.500",
                        }}
                        _dark={{
                          color: "blue.500",
                        }}
                      >
                        R$: 500,00
                      </Text>


                      <Text
                        fontSize="sm"
                        fontWeight="medium"
                        color="coolGray.400"
                      >
                        Total de saida
                      </Text>
                      <Text
                        fontSize="xl"
                        fontWeight="medium"
                        _light={{
                          color: "rose.500",
                        }}
                        _dark={{
                          color: "rose.500",
                        }}
                      >
                        R$: 500,00
                      </Text>
                    </VStack>











                    <HStack space="2" mt="5" alignItems="center">
                      <Text
                        fontSize="sm"
                        fontWeight="medium"
                        _dark={{
                          color: "coolGray.50",
                        }}
                        _light={{
                          color: "coolGray.800",
                        }}
                      >
                        Lançamentos
                      </Text>
                      <Text
                        fontSize="sm"
                        fontWeight="medium"
                        color="coolGray.400"
                      >
                        (Entrada, Saida e pelo arquivo OFX)
                      </Text>
                      <Link
                        ml="auto"
                        _text={{
                          textDecoration: "none",
                        }}
                        _light={{
                          _text: {
                            color: "primary.800",
                            fontSize: "sm",
                            fontWeight: "medium",
                          },
                        }}
                        _dark={{
                          _text: {
                            color: "primary.400",
                            fontSize: "sm",
                            fontWeight: "medium",
                          },
                        }}
                      >
                      </Link>
                    </HStack>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      <Button.Group space="2" mt={3} alignItems="center">
                        <Button backgroundColor={'rgb(77, 29 ,149)'}
                          onPress={() => { props.navigation.navigate('Saida') }}
                          py="4"
                          px="9"
                          borderRadius="4"
                          variant="subtle"
                          _text={{
                            _dark: {
                              color: "coolGray.50",
                            },
                            _light: {
                              color: "coolGray.100",
                            },
                            fontWeight: "normal",
                          }} //@ts-ignore
                          _light={{
                            colorScheme: "primary",
                          }}
                          _dark={{
                            bg: "coolGray.900",
                            //@ts-ignore
                            colorScheme: "dark",
                          }}
                        >
                          Saida
                        </Button>

                        <Button backgroundColor={'rgb(77, 29 ,149)'}
                          onPress={() => { props.navigation.navigate('Entrada') }}
                          py="4"
                          px="9"
                          borderRadius="4"
                          variant="subtle"
                          _text={{
                            _dark: {
                              color: "coolGray.50",
                            },
                            _light: {
                              color: "coolGray.100",
                            },
                            fontWeight: "normal",
                          }} //@ts-ignore
                          _light={{
                            colorScheme: "primary",
                          }}
                          _dark={{
                            bg: "coolGray.900",
                            //@ts-ignore
                            colorScheme: "dark",
                          }}
                        >
                          Entrada
                        </Button>

                        <Button backgroundColor={'rgb(77, 29 ,149)'}
                          onPress={() => { props.navigation.navigate('OFX') }}
                          py="4"
                          px="9"
                          borderRadius="4"
                          variant="subtle"
                          _text={{
                            _dark: {
                              color: "coolGray.50",
                            },
                            _light: {
                              color: "coolGray.100",
                            },
                            fontWeight: "normal",
                          }} //@ts-ignore
                          _light={{
                            colorScheme: "primary",
                          }}
                          _dark={{
                            bg: "coolGray.900",
                            //@ts-ignore
                            colorScheme: "dark",
                          }}
                        >
                          OFX
                        </Button>
                      </Button.Group>
                    </ScrollView>




                    <HStack space="2" mt="5" alignItems="center">
                      <Text
                        fontSize="sm"
                        fontWeight="medium"
                        _dark={{
                          color: "coolGray.50",
                        }}
                        _light={{
                          color: "coolGray.800",
                        }}
                      >
                        Cadastros
                      </Text>
                      <Text
                        fontSize="sm"
                        fontWeight="medium"
                        color="coolGray.400"
                      >
                        (de Despesas, receitas e Cartões)
                      </Text>
                      <Link
                        ml="auto"
                        _text={{
                          textDecoration: "none",
                        }}
                        _light={{
                          _text: {
                            color: "primary.800",
                            fontSize: "sm",
                            fontWeight: "medium",
                          },
                        }}
                        _dark={{
                          _text: {
                            color: "primary.400",
                            fontSize: "sm",
                            fontWeight: "medium",
                          },
                        }}
                      >
                      </Link>
                    </HStack>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      <Button.Group space="2" mt={3} alignItems="center">


                        <Button backgroundColor={'rgb(77, 29 ,149)'}
                          onPress={() => { props.navigation.navigate('ListaDespesa') }}
                          py="4"
                          px="9"
                          borderRadius="4"
                          variant="subtle"
                          _text={{
                            _dark: {
                              color: "coolGray.50",
                            },
                            _light: {
                              color: "coolGray.100",
                            },
                            fontWeight: "normal",
                          }} //@ts-ignore
                          _light={{
                            colorScheme: "primary",
                          }}
                          _dark={{
                            bg: "coolGray.900",
                            //@ts-ignore
                            colorScheme: "dark",
                          }}
                        >
                          Despesa
                        </Button>

                        <Button backgroundColor={'rgb(77, 29 ,149)'}
                          onPress={() => {
                            props.navigation.navigate("ListaReceita");
                          }}
                          py="4"
                          px="9"
                          borderRadius="4"
                          variant="subtle"
                          _text={{
                            _dark: {
                              color: "coolGray.50",
                            },
                            _light: {
                              color: "coolGray.100",
                            },
                            fontWeight: "normal",
                          }} //@ts-ignore
                          _light={{
                            colorScheme: "primary",
                          }}
                          _dark={{
                            bg: "coolGray.900",
                            //@ts-ignore
                            colorScheme: "dark",
                          }}
                        >
                          Receita
                        </Button>

                        <Button backgroundColor={'rgb(77, 29 ,149)'}
                          onPress={() => {
                            props.navigation.navigate('ListaCartao')
                          }}
                          py="4"
                          px="9"
                          borderRadius="4"
                          variant="subtle"
                          _text={{
                            _dark: {
                              color: "coolGray.50",
                            },
                            _light: {
                              color: "coolGray.100",
                            },
                            fontWeight: "normal",
                          }} //@ts-ignore
                          _light={{
                            colorScheme: "primary",
                          }}
                          _dark={{
                            bg: "coolGray.900",
                            //@ts-ignore
                            colorScheme: "dark",
                          }}
                        >
                          Cartões
                        </Button>


                      </Button.Group>
                    </ScrollView>











                    <AddToCartButton base="none" md="flex" />
                    <HStack mt="8" space="5">
                      <Pressable
                        onPress={() => {
                          setTabName("Description");
                        }}
                      >
                        <Text
                          fontSize="16"
                          fontWeight="medium"
                          letterSpacing="0.4"
                          _light={{
                            color:
                              tabName == "Description"
                                ? "primary.900"
                                : "coolGray.400",
                          }}
                          _dark={{
                            color:
                              tabName == "Description"
                                ? "coolGray.50"
                                : "coolGray.400",
                          }}
                        >
                          Description
                        </Text>
                        {tabName == "Description" ? (
                          <Box width="100%" py="1">
                            <Divider bg="primary.900" />
                          </Box>
                        ) : (
                          <></>
                        )}
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          setTabName("Reviews");
                        }}
                      >
                        <Text
                          fontSize="16"
                          fontWeight="medium"
                          letterSpacing="0.4"
                          _light={{
                            color:
                              tabName == "Reviews"
                                ? "primary.900"
                                : "coolGray.400",
                          }}
                          _dark={{
                            color:
                              tabName == "Reviews"
                                ? "coolGray.50"
                                : "coolGray.400",
                          }}
                        >
                          Reviews
                        </Text>
                        {tabName == "Reviews" ? (
                          <Box width="100%" py="1">
                            <Divider bg="primary.900" />
                          </Box>
                        ) : (
                          <></>
                        )}
                      </Pressable>
                    </HStack>


                    {  /*  

                    {tabName === "Description" ? (
                      <Text
                        mt="3"
                        fontSize="sm"
                        lineHeight="lg"
                        fontWeight="medium"
                        letterSpacing="0.3"
                        _light={{
                          color: "coolGray.800",
                        }}
                        _dark={{
                          color: "coolGray.50",
                        }}
                      >
                        Yellow bodysuit, has a round neck with envelope detail
                        along the shoulder, short sleeves and snap button
                        closures along the crotch.Your Body suit has a round
                        neck with detail along the shoulder,short sleeves and
                        snap button closer along the front.
                      </Text>
                    ) : (
                      reviews.map((item, idx) => {
                        return (
                          <VStack my="3" px="4" key={idx}>
                            <HStack justifyContent="space-between">
                              <HStack space="3">
                                <Avatar
                                  source={{
                                    uri: item.imageUrl,
                                  }}
                                  height="9"
                                  width="9"
                                />
                                <VStack space="1">
                                  <Text
                                    fontSize="sm"
                                    fontWeight="semibold"
                                    _dark={{
                                      color: "coolGray.50",
                                    }}
                                    _light={{
                                      color: "coolGray.800",
                                    }}
                                  >
                                    {item.name}
                                  </Text>
                                  <HStack space="1">
                                    <Icon
                                      size="4"
                                      name="star"
                                      as={AntDesign}
                                      color="amber.400"
                                    />
                                  </HStack>
                                </VStack>
                              </HStack>
                              <Text
                                fontSize="sm"
                                _light={{
                                  color: "coolGray.500",
                                }}
                                _dark={{
                                  color: "coolGray.300",
                                }}
                              >
                                {item.time}
                              </Text>
                            </HStack>
                            <Text
                              alignItems="center"
                              lineHeight="lg"
                              mt="4"
                              _light={{
                                color: "coolGray.500",
                              }}
                              _dark={{
                                color: "coolGray.300",
                              }}
                              fontSize="md"
                            >
                              {item.review}
                            </Text>
                          </VStack>
                        );
                      })
                    )}
                    <AddToCartButton base="flex" md="none" />
                    */ }
                  </Box>
                </ScrollView>
              </Stack>
            </VStack>
          </ScrollView>
        </Box>
      </VStack>
    </>
  );
}
