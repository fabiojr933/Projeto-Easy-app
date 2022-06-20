import React, { useState } from "react";
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
import  { useNavigation } from '@react-navigation/native';
import DataTable, { COL_TYPES } from 'react-native-datatable-component';

export function CartaoForm({ props }) { 

  const [conta, setConta] = useState(""); 
  const [banco, setBanco] = useState("");
  const [nomeBanco, setNomeBanco] = useState('');  
  const navigation = useNavigation();

  
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
            Cartões cadastrados
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



      <Button backgroundColor={'rgb(77, 29 ,149)'}  onPress={ () => { props.navigation.navigate('Cartao') }}>Novo</Button>

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
        onRowSelect={(row) => { console.log(row)}}
            data={[ 
                {id: 1, Cartao: 'Sicred', Excluir: false},
                {id: 2, Cartao: 'Muhammad Akif', Excluir: false },
                {id: 3, Cartao: 'Muhammad Umar', Excluir: false },
                {id: 4, Cartao: 'Amna Shakeel', Excluir: false},
                {id: 5, Cartao: 'Muhammad Ammar', Excluir: false },
                {id: 6, Cartao: 'Muhammad Moiz', Excluir: false }
            ]} // list of objects
            colNames={['Cartao', 'Excluir']} //List of Strings
            colSettings={[
              { name: 'Cartao', type: COL_TYPES.STRING, width: '70%' }, 
              { name: 'Excluir', type: COL_TYPES.CHECK_BOX }
            ]}//List of Objects
            noOfPages={2} //number
            backgroundColor={'#aaa8a833'} //Table Background Color
            headerLabelStyle={{ color: 'rgb(77, 29 ,149)', fontSize: 12 }} //Text Style Works
        />

<Button backgroundColor={'rgb(77, 29 ,149)'}  onPress={ () => { props.navigation.navigate('Cartao') }}>Excluir</Button>
               
               
              </VStack>               
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
                Cartões cadastrados
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
