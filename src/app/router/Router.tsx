import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RouterParams } from "./type";
import Home from "../page/home/Home";
import Details from "../page/details/Details";
import { Navigation, NavigationRef } from "./Navigation";
import Counter from "../page/Counter";

const Stack = createNativeStackNavigator<RouterParams>();

const Router: FC = () => {
    return (
        <NavigationContainer ref={(_: NavigationRef) => (Navigation.rootNavigator = _)}>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Details" component={Details} />
                <Stack.Screen name="Counter" component={Counter} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Router;
