import { RouterParams } from "@/app/router/type";
import { Suits } from "@/module/basic/type";
import { PokerUtil } from "@/util/PokerUtil";
import { StyleUtil } from "@/util/StyleUtil";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { View, StyleSheet, Button } from "react-native";

export interface LandingProps extends NativeStackScreenProps<RouterParams, "Landing"> {}

const Landing: FC<LandingProps> = ({ navigation }) => {
    const goTestHands = () => {
        const pokerList = [
            { id: "1", suits: Suits.Diamonds, face: 2 },
            { id: "2", suits: Suits.Diamonds, face: 3 },
            { id: "3", suits: Suits.Diamonds, face: 4 },
            { id: "4", suits: Suits.Clubs, face: 5 },
            { id: "5", suits: Suits.Hearts, face: 4 },
            { id: "6", suits: Suits.Diamonds, face: 5 },
            { id: "7", suits: Suits.Diamonds, face: 3 },
        ];
        navigation.navigate("TestHands", {
            pokerList: PokerUtil.sortPokerList(pokerList, "face"),
        });
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button title="Test Hands" onPress={goTestHands} />
        </View>
    );
};

const styles = StyleSheet.create({});

export default Landing;
