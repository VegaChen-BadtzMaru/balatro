import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RouterParams } from "./type";
import { Navigation, NavigationRef } from "./Navigation";
import Landing from "../page/Landing";
import TestHands from "../page/TestHands";
import { resetTestHandsState } from "@/module/testHands/testHandsSlice";
import { useAppDispatch } from "@/store/hooks";

const Stack = createNativeStackNavigator<RouterParams>();

const Router: FC = () => {
    const dispatch = useAppDispatch();
    return (
        <NavigationContainer ref={(_: NavigationRef) => (Navigation.rootNavigator = _)}>
            <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Landing" component={Landing} />
                <Stack.Screen
                    name="TestHands"
                    component={TestHands}
                    listeners={{
                        beforeRemove: () => {
                            dispatch(resetTestHandsState());
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Router;
