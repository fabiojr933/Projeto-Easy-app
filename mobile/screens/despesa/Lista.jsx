import React, { useState, useEffect } from "react";
import {
  Button,
  HStack,
  VStack,
  Text,
  Image,
  IconButton,
  Icon,
  Center,
  Hidden,
  StatusBar,
  Stack,
  Box,
} from "native-base";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import DataTable, { COL_TYPES } from "react-native-datatable-component";
import SyncStorage from "@react-native-async-storage/async-storage";
import configuracao from "../../services/api";
import axios from "axios";

export function DespesaForm({ props }) {
  const [conta, setConta] = useState("");
  const [banco, setBanco] = useState("");
  const [nomeBanco, setNomeBanco] = useState("");
  const navigation = useNavigation();
  const [autenticacao, setAutenticacao] = useState("");
  const [despesa, setDespesa] = useState([]);
  const [validacao, setValidacao] = useState('');

  useEffect(() => {
    var config = {};
    async function loadData() {
      await SyncStorage.getItem("@user").then((value) => {
        setAutenticacao(JSON.parse(value).autorizacao);
        config = {
          method: "get",
          url: configuracao.url_base_api + "/despesa/listaAll",
          headers: {
            Authorization: "Bearer " + configuracao.token,
            autorizacao: JSON.parse(value).autorizacao,
          },
        };
      });
      axios(config)
        .then((resposta) => {
          setDespesa(resposta.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
    loadData();
  }, []);

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
              Despesas cadastrados
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
                    {props.route.params?.mensagem}           
                  </Text> 
                <Button
                  backgroundColor={"rgb(77, 29 ,149)"}
                  onPress={() => {
                    props.navigation.navigate("Despesa");
                  }}
                >
                  Novo
                </Button>

                <Text
                  textAlign={"center"}
                  fontSize="md"
                  fontWeight="normal"
                  _light={{
                    color: "muted.900",
                  }}
                >
                  Selecione abaixo para poder excluir
                </Text>

                <DataTable
                   onRowSelect={(row) => { console.log(row) }}
                  data={despesa} // list of objects
                  colNames={["despesa", "Excluir"]} //List of Strings
                  colSettings={[
                    { name: "despesa", type: COL_TYPES.STRING, width: "70%" },
                    { name: "Excluir", type: COL_TYPES.CHECK_BOX },
                  ]} //List of Objects
                  noOfPages={2} //number
                  backgroundColor={"#aaa8a833"} //Table Background Color
                  headerLabelStyle={{ color: "rgb(77, 29 ,149)", fontSize: 12 }} //Text Style Works
                />

                <Button
                  backgroundColor={"rgb(77, 29 ,149)"}
                  onPress={() => {
                    props.navigation.navigate("Despesa");
                  }}
                >
                  Excluir
                </Button>
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </VStack>
    </KeyboardAwareScrollView>
  );
}
export default function Despesa(props) {
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
                    props.navigation.goBack();
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
                  textAlign={"center"}
                >
                  Despesas cadastrados
                </Text>
                <Text
                  textAlign={"center"}
                  fontSize="md"
                  fontWeight="normal"
                  _dark={{
                    color: "coolGray.400",
                  }}
                  _light={{
                    color: "primary.300",
                  }}
                ></Text>
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
          <DespesaForm props={props} />
        </Stack>
      </Center>
    </>
  );
}
