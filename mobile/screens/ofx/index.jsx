import React, { useState, useEffect } from "react";
import {
  Button,
  HStack,
  VStack,
  Text,
  Image,
  useColorModeValue,
  IconButton,
  Icon,
  Pressable,
  Center,
  Hidden,
  StatusBar,
  Stack,
  Select,
  Modal,
  Box,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import FloatingLabelInput from "./components/FloatingLabelInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import configuracao from "../../services/api";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import SyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";

export function OFXForm({ props }) {
  const [showModal, setShowModal] = useState(false);
  const [valor, setValor] = useState("");
  const [name, setName] = useState("");
  const [validacao, setValidacao] = useState("");
  const [caminho, setCaminho] = useState("");
  //const [listaDados, setListaDados] = useState([]);
  const [load, setLoad] = useState(true);
  const navigation = useNavigation();

  async function openDocumentFile() {
    try {
      const doc = await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });
      setCaminho(doc);
      setName(doc.name);
      // lancamentoOFX(doc);
    } catch (error) {
      console.error(error);
    }
  }

  async function lancamentoOFX() {
    var token = "";
    await SyncStorage.getItem("@user").then((value) => {
      token = JSON.parse(value).autorizacao;
    });
    var formData = new FormData();
    formData.append("file", {
      uri: caminho.uri,
      type: caminho.mimeType,
      name: caminho.name,
    });

    var config = {
      method: "POST",
      url: configuracao.url_base_api + "/lancamento/LancOFX",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + configuracao.token,
        autorizacao: token,
      },
    };
    console.log(formData);
    console.log(config);

    axios(config)
      .then((resposta) => {
        if (resposta.status == 200) {
         // console.log(resposta.data);
          navigation.navigate("ListaLancamento", { dados: resposta.data });
        }
      })
      .catch((error) => {
        console.log(error);
        setValidacao(error.response.data.error);
      });
  }

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
              Faça a importação do arquivo abaixo
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
                <Text fontSize="sm" color="#d61212" pl="2" textAlign={"center"}>
                  {validacao}
                </Text>

                <Button
                  // onPressOut={openDocumentFile}
                  onPress={openDocumentFile}
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
                  Importar arquivo OFX
                </Button>
              </VStack>

              <Text color="coolGray.500" fontSize="sm" textAlign="center">
                {name}
              </Text>
              <Center>
                <Button
                  mt="155"
                  size="lg"
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
                  onPress={() => setShowModal(true)}
                >
                  Processar
                </Button>
                <Modal
                  isOpen={showModal}
                  onClose={() => setShowModal(false)}
                  _backdrop={{
                    _dark: {
                      bg: "coolGray.800",
                    },
                    bg: "muted.900",
                  }}
                >
                  <Modal.Content maxWidth="350" maxH="260">
                    <Modal.CloseButton />
                    <Modal.Header>Atenção!</Modal.Header>
                    <Modal.Body>
                      Tem certeza que deseja fazer a importação desse arquivo?.
                    </Modal.Body>
                    <Modal.Footer>
                      <Button.Group space={2}>
                        <Button
                          variant="ghost"
                          colorScheme="blueGray"
                          onPress={() => {
                            setShowModal(false);
                          }}
                        >
                          Cancelar
                        </Button>
                        <Button
                          onPress={() => {
                            lancamentoOFX(), setShowModal(false);
                          }}
                        >
                          Processar
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
                  Lançamento via arquivo OFX
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
                  Faça a importação do arquivo abaixo
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
