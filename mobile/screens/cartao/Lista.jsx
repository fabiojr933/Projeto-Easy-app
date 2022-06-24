import React, { useState, useEffect } from "react";
import { Button, HStack, VStack, Text, Image, IconButton, Icon, Center, Hidden, StatusBar, Stack, Box, Spinner, Heading } from "native-base";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from '@react-navigation/native';
import DataTable, { COL_TYPES } from 'react-native-datatable-component';
import SyncStorage from "@react-native-async-storage/async-storage";
import configuracao from "../../services/api";
import axios from "axios";
import { Alert } from 'react-native'

export function CartaoForm({ props }) {

  const [tempo, setTempo] = useState(true);
  const [conta, setConta] = useState("");
  const [mensagem, setMensagem] = useState();
  const [autenticacao, setAutenticacao] = useState("");
  const [contaSelecionada, setContaSelecionada] = useState([]);
  const [load, setLoad] = useState(true)
  const navigation = useNavigation();

  function Carregamento() {
    var config = {};
    navigation.addListener('focus', () => setLoad(!load))
    async function loadData() {
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
          setConta(resposta.data);
        })
      setTimeout(() => {
        setTempo(false)
      }, 3000)
        .catch((error) => {
          console.log(error.response);
        });
    }
    loadData();
  }

  useEffect(() => {
    Carregamento();
  }, [load, navigation]);


  async function deletarConta() {
    if (contaSelecionada == [] || contaSelecionada.length == 0 || contaSelecionada == undefined) {
      Alert.alert('Atenção', 'Para excluir precisa selecionar alguma conta');
      return;
    } else {
      await SyncStorage.getItem("@user").then((value) => {
        contaSelecionada.map((v, k) => {
          var config = {
            method: 'PUT',
            url: configuracao.url_base_api + '/conta/desativar/' + v.id,
            headers: {
              Authorization: "Bearer " + configuracao.token,
              autorizacao: JSON.parse(value).autorizacao,
            },
          }
          axios(config).then((response) => {
          });
        })
      })
      setMensagem('Conta excluir com sucesso')
      Carregamento();
    }
  }
  if (tempo == true) {
    return (
      <HStack space={2} justifyContent="center" marginTop='200'>
        <Spinner size="sm" color="#ffffff" />
        <Heading color="#ffffff" fontSize="21">
          Carregando
        </Heading>
        <Heading color="#ffffff" fontSize="21">
          Aguarde....
        </Heading>
      </HStack>
    )
  } else {
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
                Contas cadastradas
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


                  <Text fontSize="sm" color="violet.800" pl="2" textAlign={"center"} marginTop={-10} >
                    {mensagem}
                  </Text>
                  <Button backgroundColor={'rgb(77, 29 ,149)'} onPress={() => { props.navigation.navigate('Cartao') }}>Novo</Button>

                  <Text textAlign={"center"}
                    fontSize="md"
                    fontWeight="normal"
                    _light={{
                      color: "muted.900",
                    }}
                  >
                    Selecione abaixo para poder excluir
                  </Text>

                  <DataTable
                    onRowSelect={(row) => { setContaSelecionada([contaSelecionada, row]) }}
                    data={conta} // list of objects
                    colNames={['nome', 'Excluir']} //List of Strings
                    colSettings={[
                      { name: 'nome', type: COL_TYPES.STRING, width: '70%' },
                      { name: 'Excluir', type: COL_TYPES.CHECK_BOX }
                    ]}//List of Objects
                    noOfPages={1} //number
                    backgroundColor={'#aaa8a833'} //Table Background Color
                    headerLabelStyle={{ color: 'rgb(77, 29 ,149)', fontSize: 12 }} //Text Style Works
                  />

                  <Button backgroundColor={'rgb(77, 29 ,149)'} onPress={deletarConta}>Excluir</Button>


                </VStack>
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </KeyboardAwareScrollView>
    )
  };
}
export default function Cartao(props) {
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
                <Text fontSize="3xl" fontWeight="bold" color="coolGray.50" textAlign={"center"}>
                Contas cadastradas
                </Text >
                <Text textAlign={"center"}
                  fontSize="md"
                  fontWeight="normal"
                  _dark={{
                    color: "coolGray.400",
                  }}
                  _light={{
                    color: "primary.300",
                  }}
                >
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
          <CartaoForm props={props} />
        </Stack>
      </Center>
    </>
  );
}
