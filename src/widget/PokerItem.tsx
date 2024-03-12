import { Poker } from "@/module/basic/type";
import { StyleUtil } from "@/util/StyleUtil";
import { UIUtil } from "@/util/UIUtil";
import Text from "@/widget/Text";
import React, { FC } from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";

export interface PokerItemProps {
    poker: Poker;
    style?: StyleProp<ViewStyle>;
    isScore?: boolean;
}

const PokerItem: FC<PokerItemProps> = ({ poker, style, isScore }) => {
    return (
        <View style={[styles.wrapper, style, isScore && { backgroundColor: "#ccc" }]}>
            <Text style={[styles.suitsTxt, { color: UIUtil.getSuitsColor(poker.suits) }]}>{UIUtil.getSuitsTxt(poker.suits)}</Text>
            <Text style={styles.faceTxt}>{UIUtil.getFaceTxt(poker.face)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: StyleUtil.px(55),
        height: StyleUtil.px(90),
        justifyContent: "center",
        alignItems: "center",
        borderWidth: StyleUtil.px(1),
        borderRadius: StyleUtil.px(5),
        borderColor: "#ccc",
    },
    suitsTxt: {
        fontSize: StyleUtil.px(20),
    },
    faceTxt: {
        position: "absolute",
        top: StyleUtil.px(5),
        left: StyleUtil.px(5),
        fontSize: StyleUtil.px(16),
    },
    suitsBg: {
        height: StyleUtil.px(20),
        width: "100%",
    },
});

export default PokerItem;
