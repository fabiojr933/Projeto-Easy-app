import React, { useState } from "react";
import {
  Button,
  HStack,
  VStack,
  Text,
  Link,
  Checkbox,
  Divider,
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
import { AntDesign, Entypo } from "@expo/vector-icons";
import IconGoogle from "./components/IconGoogle";
import IconFacebook from "./components/IconFacebook";
import FloatingLabelInput from "./components/FloatingLabelInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export function CartaoForm({ props }) {
 
  const [showModal, setShowModal] = useState(false);
  const [conta, setConta] = useState(""); 
  const [banco, setBanco] = useState("");
  const [nomeBanco, setNomeBanco] = useState('');
  
  
  const listaBanco = [
    { id: '77', banco: 'Banco Inter'},
    { id: '748', banco: 'Sicredi S.A'},
    { id: '735', banco: 'Neon Pagamentos'},
    { id: '290', banco: 'PagBank'},
    { id: '237', banco: 'Next'},
    { id: '260', banco: 'Nubank'},
    { id: '323', banco: 'Mercado Pago'},
    { id: '380', banco: 'PicPay'},
    { id: '237', banco: 'Banco Bradesco S.A'},
    { id: '104', banco: 'Caixa Econômica Federal'},
    { id: '756', banco: 'Sicoob'},
    { id: '1', banco: 'Banco do Brasil S.A'},    
    { id: '033', banco: 'Banco SANTANDER'},
  ] 

  function carregarBnaco(banco){   
    setBanco(banco);
    const bancoSelecionado = listaBanco.find((x) => x.id == banco);
    setNomeBanco(bancoSelecionado.banco);
  }

  function teste(){
    console.log(conta, banco, nomeBanco);
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
                 <Select placeholder="Selecione um Cartão" onValueChange={ carregarBnaco }>
           
                  <Select.Item label="Sicredi S.A." value="748" key="1" />
                  <Select.Item label="Banco Inter" value="77"key="2"/>
                  <Select.Item label="Neon Pagamentos" value="735" key="3" />
                  <Select.Item label="PagBank" value="290" key="4" />
                  <Select.Item label="Next" value="237" key="5" />
                  <Select.Item label="Nubank" value="260" key="6" />
                  <Select.Item label="Mercado Pago" value="323" key="7" />
                  <Select.Item label="PicPay" value="380" key="8" />
                  <Select.Item label="Banco SANTANDER" value="033" key="9" />
                  <Select.Item label="Banco Bradesco S.A" value="237" key="10" />
                  <Select.Item label="Caixa Econômica Federal" value="104" key="11" />
                  <Select.Item label="Sicoob" value="756" key="12"/>
                  <Select.Item label="Banco do Brasil S.A" value="1" key="13"/>
                </Select>     
                <FloatingLabelInput
                  isRequired
                  label="Numero da conta"
                  labelColor="#9ca3af"
                  labelBGColor={useColorModeValue("#fff", "#1f2937")}
                  borderRadius="4"
                  defaultValue={conta}
                  onChangeText={(conta) => setConta(conta)}
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
       onPress={() => setShowModal(true)}>Cadastrar</Button>
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
          O número da conta, tem que se o número real, pois se você usar a função da importação pelo 
           arquivo OFX, vai gerar inconsistência, se colocar um número fictício.
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setShowModal(false);
            }}>
                Cancelar
              </Button>
              <Button onPress={() => {
              teste()  
              setShowModal(false);
            }}>
                Cadastrar
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
                  onPress={() => { props.navigation.navigate('ListaCartao') }}                    
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
                Cadastro de Cartao
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
          <CartaoForm props={props} />
        </Stack>
      </Center>
    </>
  );
}
