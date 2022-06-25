import React, { useState, useEffect } from "react";
import { Button, HStack, VStack, Text, Link, Checkbox, Divider, Image, useColorModeValue, IconButton, Icon, Pressable, Center, Hidden, StatusBar, Stack, Box, } from "native-base";
import { AntDesign, Entypo } from "@expo/vector-icons";
import FloatingLabelInput from "./components/FloatingLabelInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from 'axios';
import configuracao from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import SyncStorage from '@react-native-async-storage/async-storage';

export function SignInForm({ props }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [validacao, setValidacao] = useState('');
  const navigation = useNavigation();

  async function login() {
    const data = { 'email': email, 'senha': senha };
    const config = {
      method: 'post',
      url: configuracao.url_base_api + '/login/autenticar',
      headers: {
        'Authorization': 'Bearer ' + configuracao.token,
      },
      data, data
    }
    try {
      var api = await axios(config);
      if (api.status == 200) {
        const token = {
          'autorizacao': api.data.autorizacao,
          'email': api.data.email,
          'id_cliente': api.data.id,
        }
        const jsonValue = JSON.stringify(token)
        console.log(jsonValue);
        await SyncStorage.setItem('@user', jsonValue);
        navigation.navigate('ProductScreen');
      }
    } catch (error) {
      console.log(error.response)
      setValidacao(error.response.data.error)
    }
  }

  useEffect(() => {
    async function loadData() {
      await SyncStorage.getItem("@user").then((value) => {
        setAutenticacao(JSON.parse(value).autorizacao);
        setEmail(JSON.parse(value).email)
      });
    }
    loadData();
  }, [])

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={{
        flex: 1,
      }}
    >
      <VStack
        flex="1"
        px="6"
        py="9"
        _light={{
          bg: "white",
        }}
        _dark={{
          bg: "coolGray.800",
        }}
        space="3"
        justifyContent="space-between"
        borderTopRightRadius={{
          base: "2xl",
          md: "xl",
        }}
        borderBottomRightRadius={{
          base: "0",
          md: "xl",
        }}
        borderTopLeftRadius={{
          base: "2xl",
          md: "0",
        }}
      >
        <VStack space="7">
          <Hidden till="md">
            <Text fontSize="lg" fontWeight="normal">
              Faça login para continuar!
            </Text>
          </Hidden>
          <VStack>
            <VStack space="3">
              <VStack
                space={{
                  base: "7",
                  md: "4",
                }}
              >
                <Text fontSize="sm" color="violet.800" pl="2" textAlign={"center"}  >
                  {props.route.params?.mensagem}
                  {validacao}
                </Text>
                <FloatingLabelInput
                  isRequired
                  label="Email"
                  labelColor="#9ca3af"
                  keyboardType={"email-address"}
                  labelBGColor={useColorModeValue("#fff", "#1f2937")}
                  borderRadius="4"
                  defaultValue={email}
                  onChangeText={(email) => setEmail(email)}
                  _text={{
                    fontSize: "sm",
                    fontWeight: "medium",
                  }}
                  _dark={{
                    borderColor: "coolGray.700",
                  }}
                  _light={{
                    borderColor: "coolGray.300",
                  }}
                />
                <FloatingLabelInput
                  isRequired
                  type={showPass ? "" : "password"}
                  label="Password"
                  borderRadius="4"
                  labelColor="#9ca3af"
                  labelBGColor={useColorModeValue("#fff", "#1f2937")}
                  defaultValue={senha}
                  onChangeText={(senha) => setSenha(senha)}
                  InputRightElement={
                    <IconButton
                      variant="unstyled"
                      icon={
                        <Icon
                          size="4"
                          color="coolGray.400"
                          as={Entypo}
                          name={showPass ? "eye-with-line" : "eye"}
                        />
                      }
                      onPress={() => {
                        setShowPass(true);
                      }}
                    />
                  }
                  _text={{
                    fontSize: "sm",
                    fontWeight: "medium",
                  }}
                  _dark={{
                    borderColor: "coolGray.700",
                  }}
                  _light={{
                    borderColor: "coolGray.300",
                  }}
                />
              </VStack>
              <Link
                ml="auto"
                _text={{
                  fontSize: "xs",
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
                    color: "primary.500",
                  },
                }}
              >
                Esqueceu a senha?
              </Link>
              <Checkbox
                alignItems="flex-start"
                mt="5"
                defaultIsChecked
                value="demo"
                colorScheme="primary"
                accessibilityLabel="Remember me"
              >
                <Text
                  pl="3"
                  fontWeight="normal"
                  _light={{
                    color: "coolGray.800",
                  }}
                  _dark={{
                    color: "coolGray.400",
                  }}
                >
                  Lembre-se da minha senha
                </Text>
              </Checkbox>
              <Button
                mt="5"
                size="md"
                borderRadius="4"
                _text={{
                  fontWeight: "medium",
                }}
                _light={{
                  bg: "primary.900",
                }}
                _dark={{
                  bg: "primary.700",
                }}
                onPress={login}
              >
                ENTRAR
              </Button>             
            </VStack>            
          </VStack>
        </VStack>
        <HStack     
          mb="10"
          space="1"
          safeAreaBottom
          alignItems="center"
          justifyContent="center"
          mt={{
            base: "auto",
            md: "8",
          }}
        >
          <Text
            _light={{
              color: "coolGray.800",
            }}
            _dark={{
              color: "coolGray.400",
            }}
          >
            Não tem uma conta?
          </Text>
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
                color: "primary.500",
              },
            }}
            onPress={() => {
              props.navigation.navigate("SignUp");
            }}
          >
            Inscrever-se
          </Link>   
        </HStack>
      </VStack>
    </KeyboardAwareScrollView>
  );
}
export default function SignIn(props) {
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
            <VStack px="4" mt="4" mb="5" space="9">
              <HStack space="2" alignItems="center">
                <IconButton
                  variant="unstyled"
                  pl="0"
                  onPress={() => { }}
                  icon={
                    <Icon
                      size="6"
                      as={AntDesign}
                      name="arrowleft"
                      color="coolGray.50"
                    />
                  }
                />
                <Text color="coolGray.50" fontSize="lg">
                  Entrar
                </Text>
              </HStack>
              <VStack space="2">
                <Text fontSize="3xl" fontWeight="bold" color="coolGray.50">
                  Bem vindo de volta,
                </Text>
                <Text
                  fontSize="md"
                  fontWeight="normal"
                  _dark={{
                    color: "coolGray.400",
                  }}
                  _light={{
                    color: "primary.300",
                  }}
                >
                  Faça login para continuar
                </Text>
              </VStack>
            </VStack>
          </Hidden>
          <Hidden till="md">
            <Center
              flex="1"
              bg="primary.700"
              borderTopLeftRadius={{
                base: "0",
                md: "xl",
              }}
              borderBottomLeftRadius={{
                base: "0",
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
          <SignInForm props={props} />
        </Stack>
      </Center>
    </>
  );
}
