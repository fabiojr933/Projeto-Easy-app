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

export function ReceitaForm({ props }) { 

  const [conta, setConta] = useState(""); 
  const [banco, setBanco] = useState("");
  const [nomeBanco, setNomeBanco] = useState('');  
  const navigation = useNavigation();


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
            Receitas cadastrados
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



      <Button backgroundColor={'rgb(77, 29 ,149)'}  onPress={ () => { props.navigation.navigate('Receita') }}>Novo</Button>

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
                {id: 1, Receita: 'Salario', Excluir: false},
                {id: 2, Receita: 'Muhammad Akif', Excluir: false },
                {id: 3, Receita: 'Muhammad Umar', Excluir: false },
                {id: 4, Receita: 'Amna Shakeel', Excluir: false},
                {id: 5, Receita: 'Muhammad Ammar', Excluir: false },
                {id: 6, Receita: 'Muhammad Moiz', Excluir: false }
            ]} // list of objects
            colNames={['Receita', 'Excluir']} //List of Strings
            colSettings={[
              { name: 'Receita', type: COL_TYPES.STRING, width: '70%' }, 
              { name: 'Excluir', type: COL_TYPES.CHECK_BOX }
            ]}//List of Objects
            noOfPages={2} //number
            backgroundColor={'#aaa8a833'} //Table Background Color
            headerLabelStyle={{ color: 'rgb(77, 29 ,149)', fontSize: 12 }} //Text Style Works
        />

<Button backgroundColor={'rgb(77, 29 ,149)'}  onPress={ () => { props.navigation.navigate('Receita') }}>Excluir</Button>
               
               
              </VStack>               
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
                <Text fontSize="3xl" fontWeight="bold" color="coolGray.50" textAlign={"center"}>                  
                Receitas cadastrados
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
          <ReceitaForm props={props} />
        </Stack>
      </Center>
    </>
  );
}
