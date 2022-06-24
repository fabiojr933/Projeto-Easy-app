import React, { useState } from "react";
import { Button, HStack, VStack, Text, Image, useColorModeValue, IconButton, Icon, Pressable, Center, Hidden, StatusBar, Stack, Box,} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import FloatingLabelInput from "./components/FloatingLabelInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SyncStorage from "@react-native-async-storage/async-storage";
import configuracao from "../../services/api";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export function Receita({ props }) {
  const [nome, setNome] = useState(""); 
  const [validacao, setValidacao] = useState('');
  const navigation = useNavigation();

  async function salvarReceita() {
    var token = "";
    await SyncStorage.getItem("@user").then((value) => {
      token = JSON.parse(value).autorizacao;
    });
    const data = { 'receita': nome };
    var config = {
      method: "POST",
      url: configuracao.url_base_api + "/receita/salvar",
      headers: {
        Authorization: "Bearer " + configuracao.token,
        autorizacao: token,
      },
      data: data,
    };
    console.log(config)
    axios(config).then((resposta) => {
      if (resposta.status == 201 || resposta.status == 200) {
        navigation.navigate('ListaReceita');
      }
      if(resposta.status == 400){
        setValidacao(error.response.data.error)
      }
    }).catch((error) => {
      setValidacao(error.response.data.error);
    })
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
            Faça seu cadastro abaixo
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
                 <Text fontSize="sm" color="#d61212" pl="2" textAlign={"center"}  >
              {validacao}
                  </Text> 
                <FloatingLabelInput
                  isRequired
                  label="Descrição"
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
                onPress={ salvarReceita }
              >
                CADASTRAR
              </Button>
            </VStack>           
          </VStack>
        </VStack>
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
                <Text fontSize="3xl" fontWeight="bold" color="coolGray.50">                  
                Cadastro de Receita
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
                  Faça seu cadastro abaixo
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
          <Receita props={props} />
        </Stack>
      </Center>
    </>
  );
}
