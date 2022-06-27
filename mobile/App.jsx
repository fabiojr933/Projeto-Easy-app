
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, extendTheme, theme as nbTheme } from "native-base";
import StarterIntro from "./screens/StarterIntro";
import SignUp from "./screens/SignUp"
import SignIn from "./screens/SignIn"
import OTP from "./screens/OTP"
import ProductScreen from "./screens/ProductScreen"
import Receita from "./screens/receita"
import Despesa from "./screens/despesa"
import Cartao from "./screens/cartao"
import ListaCartao from './screens/cartao/Lista';
import ListaDespesa from './screens/despesa/Lista';
import ListaReceita from './screens/receita/Lista';
import Saida from './screens/saida';
import Entrada from './screens/entrada';
import OFX from './screens/ofx';
import ListaLancamento from './screens/ofx/lista';
import { LogBox } from "react-native"

const theme = extendTheme({
  colors: {
    primary: nbTheme.colors.violet,
  },
});

const Drawer = createDrawerNavigator();
const stack = createNativeStackNavigator();
LogBox.ignoreAllLogs(true)

export default function App() {
	return (
		<NativeBaseProvider theme={theme}>
			<NavigationContainer>
				<stack.Navigator screenOptions={{ headerShown: false }}>
					<stack.Screen name={"SignIn"} component={SignIn} />
					<stack.Screen name={"SignUp"} component={SignUp} />				
					<stack.Screen name={"OTP"} component={OTP} />
					<stack.Screen name={"ProductScreen"} component={ProductScreen} />
					<stack.Screen name={"Receita"} component={Receita} />
					<stack.Screen name={"Despesa"} component={Despesa} />
					<stack.Screen name={"Cartao"} component={Cartao} />
					<stack.Screen name={"ListaCartao"} component={ListaCartao} />
					<stack.Screen name={"ListaDespesa"} component={ListaDespesa} />
					<stack.Screen name={"ListaReceita"} component={ListaReceita} />
					<stack.Screen name={"Saida"} component={Saida} />
					<stack.Screen name={"Entrada"} component={Entrada} />
					<stack.Screen name={"OFX"} component={OFX} />
					<stack.Screen name={"ListaLancamento"} component={ListaLancamento} />
				</stack.Navigator>
			</NavigationContainer>
		</NativeBaseProvider>
	);
}
