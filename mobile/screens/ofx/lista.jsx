import React, { useState, useEffect } from "react";
import {
  Button,
  HStack,
  VStack,
  Text,
  Image,
  Divider,
  IconButton,
  Icon,
  Heading,
  Center,
  Hidden,
  StatusBar,
  Stack,
  Select,
  Flex,
  Spinner,
  Box,
  Input,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import FloatingLabelInput from "./components/FloatingLabelInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import configuracao from "../../services/api";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import SyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, TextInput } from 'react-native';
import moment from 'moment';


export function OFXForm({ props }) {

  const [listaDados, setListaDados] = useState([]);
  const [nomeBanco, setNomeBanco] = useState('');
  const [numeroConta, setNumeroConta] = useState('');
  const [numeroBanco, setNumeroBanco] = useState('');
  const [tempo, setTempo] = useState(true);
  const [load, setLoad] = useState(true);
  const [listaDespesa, setListaDespesa] = useState([]);
  const [listaReceita, setListaReceita] = useState([]);
  const [idReceitaDespesa, setIdReceitaDespesa] = useState([]);
  const navigation = useNavigation();


  function updateOFX() {
    console.log(idReceitaDespesa);
  }

  function lancarOFX() {
    listaDados.map((v) => {
      console.log(v.DTPOSTED.trim())
       var ano = (v.DTPOSTED.substring(0 ,4));
       var mes = (v.DTPOSTED.substring(4 ,6));
       var dia = (v.DTPOSTED.substring(6 ,8));
        console.log(dia + ' - ' + mes + ' - '  + ano)
    });
   // console.log(.substring(0 ,3))
  }

  useEffect(() => {
    async function loadData() {
      setListaDados(props.route.params.dados.BANKTRANLIST.STMTTRN)
      setNomeBanco(props.route.params.dados.nomeBanco);
      setNumeroBanco(props.route.params.dados.numeroBanco);
      setNumeroConta(props.route.params.dados.numeroConta);
    }
    loadData();
  }, []);


  useEffect(() => {
    async function listar() {
      var configDespesa = {};
      var configReceita = {};
      await SyncStorage.getItem('@user').then((value) => {
        configDespesa = {
          method: "get",
          url: configuracao.url_base_api + "/despesa/listaAll",
          headers: {
            Authorization: "Bearer " + configuracao.token,
            autorizacao: JSON.parse(value).autorizacao,
          },
        };

        configReceita = {
          method: "get",
          url: configuracao.url_base_api + "/receita/listaAll",
          headers: {
            Authorization: "Bearer " + configuracao.token,
            autorizacao: JSON.parse(value).autorizacao,
          },
        };

        console.log(configDespesa)
        axios(configDespesa).then((resposta) => {
          console.log(resposta)
          setListaDespesa(resposta.data);
        });
        axios(configReceita).then((resposta) => {
          console.log(resposta)
          setListaReceita(resposta.data);
        });
      });
      setTempo(false);
    }
    //    setTempo(false);
    listar();
  }, []);



  function ReceitaDespesa(v, FITID, CHECKNUM) {


    if (v == 'DEBIT') {
      return (
        <Select placeholder="Selecione uma Despesa"
          onValueChange={(value) => { setIdReceitaDespesa([...idReceitaDespesa, { 'id_despesa': value, 'id': FITID, 'protocolo': CHECKNUM }]) }}>
          {listaDespesa.map((d) => (
            <Select.Item label={d.despesa} value={d.id} key={d.id} />
          ))}
        </Select>
      )
    } else {
      return (
        <Select placeholder="Selecione uma Receita"
          onValueChange={(value) => { setIdReceitaDespesa([...idReceitaDespesa, { 'id_receita': value, 'id': FITID, 'protocolo': CHECKNUM }]) }}>
          {listaReceita.map((d) => (
            <Select.Item label={d.receita} value={d.id} key={d.id} />
          ))}
        </Select>
      )
    }
  }





  if (tempo == true) {
    return (
      <HStack space={2} justifyContent="center" marginTop='200'>
        <Spinner size="sm" color="#ffffff" />
        <Heading color="#ffffff" fontSize="21">
          Processando os dados...
        </Heading>
      </HStack>
    )
  } else {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}
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
                  <Button
                    onPress={lancarOFX}

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
                  >
                    Fazer os Lançamento
                  </Button>
                </VStack>
              </VStack>
            </VStack>


            {listaDados.map((v, k) => (

              <>
                <Divider bg="primary.700" thickness="2" mx="2" />
                <HStack >

                  <Divider bg="primary.700" thickness="2" mx="2" orientation="vertical" />
                  <TextInput fontSize={10} variant="unstyled" placeholder="Unstyled" color="coolGray.800" textAlign='center' justifyContent='center' editable={false} selectTextOnFocus={false} >
                  { (v.DTPOSTED.substring(6 ,8)) } { (v.DTPOSTED.substring(4 ,6)) } { (v.DTPOSTED.substring(0 ,4)) }
                  </TextInput >
                  <Divider bg="primary.700" thickness="2" mx="2" orientation="vertical" />
                  <TextInput fontSize={10} color="coolGray.800" textAlign='center' justifyContent='center' editable={false} selectTextOnFocus={false}>
                    Id: {v.FITID}
                  </TextInput>
                  <Divider bg="primary.700" thickness="2" mx="2" orientation="vertical" />
                  <TextInput fontSize={10} color="coolGray.800" textAlign='center' justifyContent='center' editable={false} selectTextOnFocus={false}>
                    Protocolo {v.CHECKNUM}
                  </TextInput>
                </HStack>
                <HStack space={2} justifyContent="center">

                  {(() => {
                    if (v.TRNTYPE == 'DEBIT') {
                      return (
                        <TextInput color='#be1c16' fontSize={16} mt="1" fontWeight="medium" textAlign='center' editable={false} selectTextOnFocus={false}>
                          {v.TRNTYPE}
                        </TextInput>
                      )
                    } else {
                      return (
                        <TextInput color='#050f9c' fontSize={16} mt="1" fontWeight="medium" textAlign='center' editable={false} selectTextOnFocus={false}>
                          {v.TRNTYPE}
                        </TextInput>
                      )
                    }
                  })()}

                  {(() => {
                    if (v.TRNTYPE == 'DEBIT') {
                      return (
                        <TextInput color='#be1c16' mt="1" fontWeight="medium" fontSize={16} textAlign='center' editable={false} selectTextOnFocus={false}>
                          R$ {v.TRNAMT}
                        </TextInput>
                      )
                    } else {
                      return (
                        <TextInput color='#050f9c' mt="1" fontWeight="medium" fontSize={16} textAlign='center' editable={false} selectTextOnFocus={false}>
                          R$ {v.TRNAMT}
                        </TextInput>
                      )
                    }
                  })()}

                </HStack>
                <TextInput mt="2" fontSize={12} color="gray.800" textAlign='center' editable={false} selectTextOnFocus={false}>
                  {nomeBanco}
                </TextInput>
                <Flex>
                  <TextInput mt="2" fontSize={12} fontWeight="medium" color="gray.800" editable={false} selectTextOnFocus={false}>
                    {v.MEMO}
                  </TextInput>
                </Flex>
                {ReceitaDespesa(v.TRNTYPE, v.FITID, v.CHECKNUM)}
              </>
            ))}

          </VStack>
        </VStack>
      </KeyboardAwareScrollView>
    )
  };
}
export default function ofx(props) {
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
                  onPress={() => {
                    props.navigation.navigate("ProductScreen");
                  }}
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
                <Text
                  fontSize="3xl"
                  fontWeight="bold"
                  color="coolGray.50"
                  textAlign="center"
                >
                  Falta pouco para fazer o lançamento
                </Text>
                <Text
                  textAlign="center"
                  fontSize="md"
                  fontWeight="normal"
                  _dark={{
                    color: "coolGray.400",
                  }}
                  _light={{
                    color: "primary.300",
                  }}
                >
                  Agora você precisa vincular os lançamentos com seu devidos fluxo financeiro(tipos de despesa e receita);
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
          <OFXForm props={props} />
        </Stack>
      </Center>
    </>
  );
}
