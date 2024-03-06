import React, { FC } from "react";
import { View, StyleSheet, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouterParams } from "@/app/router/type";

export interface HomeProps extends NativeStackScreenProps<RouterParams, "Home"> {}

const Home: FC<HomeProps> = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Button
                title="Go Details"
                onPress={() => {
                    navigation.navigate("Details", { id: "abc123" });
                }}
            />
            <Button
                title="Go Counter"
                onPress={() => {
                    navigation.navigate("Counter");
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default Home;
