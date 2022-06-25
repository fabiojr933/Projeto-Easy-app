import React, { useState, useEffect } from "react";
import { Button, HStack, VStack, Text, Image, useColorModeValue, IconButton, Icon, Pressable, Center, Hidden, StatusBar, Stack, Select, Modal, Box, } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import FloatingLabelInput from "./components/FloatingLabelInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import configuracao from "../../services/api";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import SyncStorage from "@react-native-async-storage/async-storage";

export function EntradaForm({ props }) {

  const [showModal, setShowModal] = useState(false);
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [validacao, setValidacao] = useState('');
  const [autenticacao, setAutenticacao] = useState("");
  const [receita, setReceita] = useState([]);
  const [conta, setConta] = useState([]);
  const [load, setLoad] = useState(true)
  const navigation = useNavigation();
  const [contaSelecionada, setContaSelecionada] = useState("");
  const [receitaSelecionada, setReceitaSelecionada] = useState("");


  async function lancamentoEntrada() {
    const data = {
      trnamt: valor,
      id_receita: receitaSelecionada,
      id_conta: contaSelecionada,
      descricao: descricao,
    };

    var token = "";
    await SyncStorage.getItem("@user").then((value) => {
      token = JSON.parse(value).autorizacao;
    });
    var config = {
      method: "POST",
      url: configuracao.url_base_api + "/lancamento/LancEntrada",
      headers: {
        Authorization: "Bearer " + configuracao.token,
        autorizacao: token,
      },
      data: data,
    };
    console.log(config)
    axios(config)
      .then((resposta) => {
        if (resposta.status == 201) {
          navigation.navigate("ProductScreen");
        }
      })
      .catch((err) => {
        setValidacao(err.response.data.error);
      });
  }


  function carregaReceita() {
    var config = {};
    navigation.addListener('focus', () => setLoad(!load))
    async function receita() {
      await SyncStorage.getItem("@user").then((value) => {
        setAutenticacao(JSON.parse(value).autorizacao);
        config = {
          method: "get",
          url: configuracao.url_base_api + "/receita/listaAll",
          headers: {
            Authorization: "Bearer " + configuracao.token,
            autorizacao: JSON.parse(value).autorizacao,
          },
        };
      });
      axios(config)
        .then((resposta) => {
          setReceita(resposta.data);
        });
    }
    receita();
  }


  function carregaConta() {
    var config = {};
    navigation.addListener('focus', () => setLoad(!load))
    async function conta() {
      await SyncStorage.getItem("@user").then((value) => {
        setAutenticacao(JSON.parse(value).autorizacao);
        config = {
          method: "get",
          url: configuracao.url_base_api + "/conta/listaAll",
          headers: {
            Authorization: "Bearer " + configuracao.token,
            autorizacao: JSON.parse(value).autorizacao,
          },
        };
      });
      axios(config)
        .then((resposta) => {
          console.log(resposta.data)
          setConta(resposta.data);
        });
    }
    conta();
  }

  useEffect(() => {
    carregaReceita();
    carregaConta();
  }, [load, navigation]);


  /*
    async function salvarConta() {
      var token = "";
      await SyncStorage.getItem("@user").then((value) => {
        token = JSON.parse(value).autorizacao;
      });
      const data = { 'banco': banco, 'conta': conta, 'nome': nomeBanco };
      var config = {
        method: "POST",
        url: configuracao.url_base_api + "/conta/salvar",
        headers: {
          Authorization: "Bearer " + configuracao.token,
          autorizacao: token,
        },
        data: data,
      };
      console.log(data)
      console.log(config)
  
      axios(config).then((resposta) => {
        if (resposta.status == 201 || resposta.status == 200) {
          navigation.navigate('ListaCartao');
        }
        if (resposta.status == 400) {
          setValidacao(error.response.data.error)
        }
      }).catch((error) => {
        setValidacao(error.response.data.error);
      })
    }
  */
  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, }} style={{ flex: 1, }} >
      <VStack flex="1" px="6" py="9"
        _light={{
          bg: "white",
        }}
        _dark={{
          bg: "coolGray.800",
        }}
        space="3" justifyContent="space-between" borderTopRightRadius={{
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
              Faça seu lançamento abaixo
            </Text>
          </Hidden>
          <VStack>
            <VStack space="3">
              <VStack
                space={{
                  base: "7",
                  md: "4",
                }}>
                <Text fontSize="sm" color="#d61212" pl="2" textAlign={"center"}  >
                  {validacao}
                </Text>

                <FloatingLabelInput
                  isRequired
                  label="Digite o valor"
                  labelColor="#9ca3af"
                  labelBGColor={useColorModeValue("#fff", "#1f2937")}
                  borderRadius="4"
                  keyboardType={"decimal-pad"}
                  defaultValue={valor}
                  onChangeText={(valor) => setValor(valor)}
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


                <Select placeholder="Selecione uma Receita" 
                  onValueChange={setReceitaSelecionada}
                >
                  { receita.map((v) =>( 
                     <Select.Item label={v.receita} value={v.id} key={v.id}/>        
                 ) )}                    
                </Select>

                <Select placeholder="Selecione uma conta" 
                  onValueChange={setContaSelecionada}
                >
                  { conta.map((v) =>( 
                     <Select.Item label={v.nome} value={v.id} key={v.id}/>        
                 ) )}                    
                </Select>


                <FloatingLabelInput
                  isRequired
                  label="Observacao"
                  labelColor="#9ca3af"
                  labelBGColor={useColorModeValue("#fff", "#1f2937")}
                  borderRadius="4"
                  defaultValue={descricao}
                  onChangeText={(descricao) => setDescricao(descricao)}
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

              <Center>
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
                  onPress={() => setShowModal(true)}>Salvar</Button>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)} _backdrop={{
                  _dark: {
                    bg: "coolGray.800"
                  },
                  bg: "muted.900"
                }}>
                  <Modal.Content maxWidth="350" maxH="260">
                    <Modal.CloseButton />
                    <Modal.Header>Atenção!</Modal.Header>
                    <Modal.Body>
                      Tem certeza que deseja fazer esse lançamento?.
                    </Modal.Body>
                    <Modal.Footer>
                      <Button.Group space={2}>
                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                          setShowModal(false);
                        }}>
                          Cancelar
                        </Button>
                        <Button onPress={() => {
                          lancamentoEntrada()
                          setShowModal(false);
                        }}>
                          Salvar
                        </Button>
                      </Button.Group>
                    </Modal.Footer>
                  </Modal.Content>
                </Modal>
              </Center>

            </VStack>
          </VStack>
        </VStack>
      </VStack>
    </KeyboardAwareScrollView>
  );
}
export default function Receita(props) {
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
                  onPress={() => { props.navigation.navigate('ProductScreen') }}
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
                  Voltar
                </Text>
              </HStack>
              <VStack space="2">
                <Text fontSize="3xl" fontWeight="bold" color="coolGray.50" textAlign='center'>
                  Lançamento de entrada
                </Text>
                <Text
                  textAlign='center'
                  fontSize="md"
                  fontWeight="normal"
                  _dark={{
                    color: "coolGray.400",
                  }}
                  _light={{
                    color: "primary.300",
                  }}
                >
                  Faça seu lançamento abaixo
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
          <EntradaForm props={props} />
        </Stack>
      </Center>
    </>
  );
}
