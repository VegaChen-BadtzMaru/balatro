import React, { FC } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "./Text";
import { StyleUtil } from "@/util/StyleUtil";
import { Navigation } from "@/app/router/Navigation";
import { SvgXml } from "react-native-svg";
import { commonSvg } from "@/resource/commonSvg";

export interface HeaderProps {
    title: string;
    hideGoBack?: boolean;
}

const Header: FC<HeaderProps> = ({ title, hideGoBack }) => {
    const goBack = () => {
        Navigation.rootNavigator?.goBack();
    };

    return (
        <View style={styles.container}>
            {hideGoBack ? (
                <View style={styles.itemView} />
            ) : (
                <TouchableOpacity activeOpacity={0.8} style={styles.itemView} onPress={goBack}>
                    <SvgXml xml={commonSvg.chevronLeft16} override={styles.leftIcon} />
                </TouchableOpacity>
            )}
            <Text style={styles.title}>{title}</Text>
            <View style={styles.itemView} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: StyleUtil.px(20),
        height: StyleUtil.px(60),
        backgroundColor: "#FCF7ED",
    },
    itemView: {
        width: StyleUtil.px(36),
        height: StyleUtil.px(36),
        justifyContent: "center",
        alignItems: "center",
    },
    leftIcon: {
        width: StyleUtil.px(16),
        height: StyleUtil.px(16),
    },
    title: {
        fontSize: StyleUtil.px(14),
        fontWeight: "bold",
    },
});

export default Header;
