import React, { useState, useEffect } from "react";
import { Button, Checkbox, Image, Modal, HStack, VStack, Text, Link, Divider, Icon, IconButton, useColorModeValue, Pressable, Hidden, Center, StatusBar, Box, Stack, } from "native-base";
import { AntDesign, Entypo } from "@expo/vector-icons";
import FloatingLabelInput from "./components/FloatingLabelInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from 'axios';
import configuracao from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

function SignUpForm({ props }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [validacao, setValidacao] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [ischecked, setChecked] = useState(false);
  const [load, setLoad] = useState(true);
  const navigation = useNavigation();

  async function salvarUsuario() {
    if (ischecked != true) {
      return Alert.alert('Atenção', 'É preciso aceitar os termos de uso');
    } else {
      const data = { 'email': email, 'senha': senha, 'nome': nome };
      var config = {
        method: 'post',
        url: configuracao.url_base_api + '/usuario/salvar',
        headers: {
          'Authorization': 'Bearer ' + configuracao.token,
        },
        data: data
      }
      try {
        var api = await axios(config);
        if (api.status == 201) {
          navigation.navigate('SignIn', { mensagem: 'Cadastro realizado com sucesso' });
        }
        if (api.status == 400) {
          setValidacao(error.response.data.error)
        }
      } catch (error) {
        setValidacao(error.response.data.error)
      }
    }''
  }

  async function Checked() {
    setChecked(true);
  }






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
        justifyContent="space-between"
        space="3"
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

            </Text>
          </Hidden>
          <VStack>
            <VStack space="8" >
              <VStack
                space={{
                  base: "7",
                  md: "4",
                }}
              >
                <Text fontSize="sm" color="#d61212" pl="2" textAlign={"center"}  >
                  {validacao}
                </Text>
                <FloatingLabelInput
                  isRequired={true}
                  label="Email"
                  labelColor="#9ca3af"
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
                  label="Senha"
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
                        setShowPass(!showPass);
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

                <FloatingLabelInput
                  isRequired
                  label="Nome"
                  labelColor="#9ca3af"
                  labelBGColor={useColorModeValue("#fff", "#1f2937")}
                  borderRadius="4"
                  defaultValue={nome}
                  onChangeText={(nome) => setNome(nome)}
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
              <Checkbox
                alignItems="flex-start"
                isChecked={ischecked}
                onChange={Checked}
                value="demo"
                colorScheme="primary"
                accessibilityLabel="Remember me" >


                <HStack alignItems="center">
                  <Link fontSize="sm" color="coolGray.400" pl="2" onPress={() => setShowModal(true)}>Eu aceito termos de uso</Link>
                  <Modal isOpen={showModal} onClose={() => setShowModal(false)} _backdrop={{
                    _dark: {
                      bg: "coolGray.800"
                    },
                    bg: "warmGray.900"
                  }}>
                    <Modal.Content maxWidth="450" maxH="412" >
                      <Modal.CloseButton />
                      <Modal.Header>Política de Privacidade</Modal.Header>
                      <Modal.Body>
                        Esse aplicativo está sendo distribuído na licença: "ISC" em 2022, quando todos os módulos estiverem prontos principalmente o modulo OFX
                        será cobrado um valor simbólico de R$: 9,99, para ajuda de custo.
                        Modulo OFX vai ser um modulo onde vai importar todo o extrato bancário, independente da conta bancaria, até hoje nenhum aplicativo possuem essa função.
                      </Modal.Body>
                      <Modal.Footer>
                        <Button.Group space={2}>
                          <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                            setShowModal(false);
                          }}>
                            Não aceito
                          </Button>
                          <Button onPress={() => {
                            Checked();
                            setShowModal(false);
                          }}>
                            Aceito
                          </Button>
                        </Button.Group>
                      </Modal.Footer>
                    </Modal.Content>
                  </Modal>
                </HStack>


              </Checkbox>
              <Button
                size="md"
                borderRadius="4"
                _text={{
                  fontSize: "sm",
                  fontWeight: "medium",
                }}
                _light={{
                  bg: "primary.900",
                }}
                _dark={{
                  bg: "primary.700",
                }}
                onPress={salvarUsuario}
              >

                INSCREVER-SE
              </Button>
              <HStack
                space="2"
                mb={{
                  base: "6",
                  md: "7",
                }}
                alignItems="center"
                justifyContent="center"
              >
              </HStack>
            </VStack>           
          </VStack>
        </VStack>
        <HStack
          mb="10"
          space="1"
          alignItems="center"
          justifyContent="center"
          mt={{
            base: "auto",
            md: "8",
          }}
        >
          <Text
            fontSize="sm"
            _light={{
              color: "coolGray.800",
            }}
            _dark={{
              color: "coolGray.400",
            }}
          >
            já tem uma conta?
          </Text>
          {/* Opening Link Tag navigateTo:"SignIn" */}
          <Link
            _text={{
              fontSize: "sm",
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
              props.navigation.navigate("SignIn");
            }}
          >
            Entrar
          </Link>
          {/* Closing Link Tag */}
        </HStack>
      </VStack>
    </KeyboardAwareScrollView>
  );
}

export default function SignUp(props) {
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
                  pl="0"
                  variant="unstyled"
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
                  Inscrever-se
                </Text>
              </HStack>
              <VStack space="2">
                <Text fontSize="3xl" fontWeight="bold" color="coolGray.50">
                  Bem-vindo
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
                  Inscreva-se para continuar
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
          <SignUpForm props={props} />
        </Stack>
      </Center>
    </>
  );
}
