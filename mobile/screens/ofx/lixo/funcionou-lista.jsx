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
import FloatingLabelInput from "../components/FloatingLabelInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import configuracao from "../../../services/api";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import SyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from 'react-native';

export function OFXForm({ props }) {
 
  const [listaDados, setListaDados] = useState([]);
  const [nomeBanco, setNomeBanco] = useState('');
  const [numeroConta, setNumeroConta] = useState('');
  const [numeroBanco, setNumeroBanco] = useState('');
  const [tempo, setTempo] = useState(false);
  const [load, setLoad] = useState(true);
  const [listaDespesa, setListaDespesa] = useState([]);
  const [listaReceita, setListaReceita] = useState([]);
  const navigation = useNavigation();


  
  useEffect(() => {    
    async function loadData() {
      setListaDados(props.route.params.dados.BANKTRANLIST.STMTTRN)    
      setNomeBanco(props.route.params.dados.nomeBanco);
      setNumeroBanco(props.route.params.dados.numeroBanco);
      setNumeroConta(props.route.params.dados.numeroConta);
    }
    loadData();   
  },[]);


  useEffect(() => {    
    async function listar(){
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

      });
      console.log(configDespesa)   
      axios(configDespesa).then((resposta) => {
        console.log(resposta)
        setListaDespesa(resposta.data);
      });
      axios(configReceita).then((resposta) => {
        console.log(resposta)
        setListaReceita(resposta.data);
      });
    }
    listar();
  },[]);

 


  function ReceitaDespesa(v) { 
    if (v == 'DEBIT') {
      return (
        <Select placeholder="Selecione uma Despesa">
        { listaDespesa.map((d) =>(         
        <Select.Item label={d.despesa} value={d.id} key={d.id}/>        
       ) )}                    
  </Select>
      )
    }else{
      return (
        <Select placeholder="Selecione uma Receita">
        { listaReceita.map((d) =>(                   
         <Select.Item label={d.receita} value={d.id} key={d.id}/>        
         ) )}                    
      </Select>
      )
      
    }   
  }





if(tempo == true){
  return ( 
  <HStack space={2} justifyContent="center" marginTop='200'>
        <Spinner size="sm" color="#ffffff" />
        <Heading color="#ffffff" fontSize="21">
          Processando os dados...
        </Heading>        
      </HStack>
      )
}else{
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
                 // onPressOut={openDocumentFile}
               
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
                 Fazer os Lan??amento
                </Button>
              </VStack>                  
            </VStack>
          </VStack>

                  

{ listaDados.map((v, k) => ( 
 
<>
<Divider my="2" _light={{ bg: "muted.800" }} _dark={{  bg: "muted.50"  }} />
    <HStack > 
    
    <Divider bg="emerald.500" thickness="2" mx="2" orientation="vertical" />
      <Text fontSize={10} color="coolGray.800" textAlign='center' justifyItems='center' >
        {v.DTPOSTED}  
      </Text>
      <Divider bg="emerald.500" thickness="2" mx="2" orientation="vertical" />
      <Text fontSize={10} color="coolGray.800" textAlign='center' justifyItems='center'>
        Id: {v.FITID}  
      </Text>
      <Divider bg="emerald.500" thickness="2" mx="2" orientation="vertical" />
      <Text fontSize={10} color="coolGray.800" textAlign='center' justifyItems='center'>
        Protocolo {v.CHECKNUM}  
      </Text>
    </HStack>
    <HStack space={2} justifyContent="center">

    {(() => {
         if(v.TRNTYPE == 'DEBIT') {
          return (
          <Text color='#be1c16'  mt="1" fontWeight="medium" fontSize="md" textAlign='center'>
          {v.TRNTYPE}
        </Text>
          )
        }else{
          return (
          <Text color='#050f9c'  mt="1" fontWeight="medium" fontSize="md" textAlign='center'>
      {v.TRNTYPE}
    </Text>
          )
        }
      })()}
     
    {(() => {
      if(v.TRNTYPE == 'DEBIT'){
        return(
          <Text color='#be1c16' mt="1" fontWeight="medium" fontSize="md" textAlign='center'>
          R$ {v.TRNAMT} 
          </Text>
        )
      }else{
        return(
          <Text color='#050f9c' mt="1" fontWeight="medium" fontSize="md" textAlign='center'>
          R$ {v.TRNAMT} 
          </Text>
        )
      }
    })()}
    
    </HStack>
    <Text mt="2" fontSize="sm" color="coolGray.700" textAlign='center'>
      {nomeBanco}
    </Text>
    <Flex>
      <Text mt="2" fontSize={12} fontWeight="medium" color="coolGray.600">
      {v.MEMO}
      </Text>     
    </Flex> 
    {ReceitaDespesa(v.TRNTYPE)}   
  </>
))}

        </VStack>
      </VStack>
    </KeyboardAwareScrollView>
  )};
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
                  Falta pouco para fazer o lancamento
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
                   Agora voc?? precisa vincular os lan??amentos com seu devidos fluxo financeiro(tipos de despesa e receita);
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
