import React, { FC } from "react";
import Text from "@/widget/Text";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, StyleSheet, Button } from "react-native";
import { RouterParams } from "@/app/router/type";

export interface DetailsProps extends NativeStackScreenProps<RouterParams, "Details"> {}

const Details: FC<DetailsProps> = ({ navigation, route: { params } }) => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Details id: {params.id}</Text>
            <Button
                title="Go Back"
                onPress={() => {
                    navigation.goBack();
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default Details;
