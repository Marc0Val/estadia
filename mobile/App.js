import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ClientsScreen from "./src/screens/ClientsScreen";
import ServiceOrdersScreen from "./src/screens/ServiceOrdersScreen";
import ProductsScreen from "./src/screens/ProductsScreen";
import ServicesScreen from "./src/screens/ServicesScreen";
import PhotosScreen from "./src/screens/PhotosScreen";
import AddTask from "./src/screens/AddScreens/AddTask";
import AddClient from "./src/screens/AddScreens/AddClient";
import AddProduct from "./src/screens/AddScreens/AddProduct";
import AddService from "./src/screens/AddScreens/AddService";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    drawerStyle={{
      width: "50%",
    }}
  >
    <Drawer.Screen
      name="Inicio"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Drawer.Screen
      name="Perfil"
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
    <Drawer.Screen
      name="Clientes"
      component={ClientsScreen}
      options={{ headerShown: false }}
    />
    <Drawer.Screen
      name="Ordenes de servicio"
      component={ServiceOrdersScreen}
      options={{ headerShown: false }}
    />
    <Drawer.Screen
      name="Productos"
      component={ProductsScreen}
      options={{ headerShown: false }}
    />
    <Drawer.Screen
      name="Servicios"
      component={ServicesScreen}
      options={{ headerShown: false }}
    />
    <Drawer.Screen
      name="Fotos"
      component={PhotosScreen}
      options={{ headerShown: false }}
    />
  </Drawer.Navigator>
);

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          options={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="Home"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="AddTask" component={AddTask} />
          <Stack.Screen name="AddClient" component={AddClient} />
          <Stack.Screen name="AddProduct" component={AddProduct} />
          <Stack.Screen name="AddService" component={AddService} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
