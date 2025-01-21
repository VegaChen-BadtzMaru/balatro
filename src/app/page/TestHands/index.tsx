import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { FC, useEffect, useMemo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import PokerItem from "@/widget/PokerItem";
import { StyleUtil } from "@/util/StyleUtil";
import Text from "@/widget/Text";
import { UIUtil } from "@/util/UIUtil";
import { HandsItem, PokerHands } from "@/module/basic/type";
import Header from "@/widget/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouterParams } from "@/app/router/type";
import { generateTestHands } from "@/module/testHands/testHandsSlice";

export interface TestHandsProps extends NativeStackScreenProps<RouterParams, "TestHands"> {}

const TestHands: FC<TestHandsProps> = ({ navigation, route }) => {
    const { pokerList, scoreList, handsListObject } = useAppSelector((state) => state.testHands);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(generateTestHands(route.params.pokerList));
    }, [dispatch, route]);

    const testScoreItemList = useMemo(() => {
        const scoreItemList: { hands: PokerHands; handsItem: HandsItem }[] = [];
        if (handsListObject) {
            if (handsListObject.RoyalFlush) {
                scoreItemList.push({ hands: PokerHands.RoyalFlush, handsItem: handsListObject.RoyalFlush });
            }
            if (handsListObject.StraightFlush) {
                scoreItemList.push({ hands: PokerHands.StraightFlush, handsItem: handsListObject.StraightFlush });
            }
            if (handsListObject.Four) {
                scoreItemList.push({ hands: PokerHands.Four, handsItem: handsListObject.Four });
            }
            if (handsListObject.FullHouse) {
                scoreItemList.push({ hands: PokerHands.FullHouse, handsItem: handsListObject.FullHouse });
            }
            if (handsListObject.Flush) {
                scoreItemList.push({ hands: PokerHands.Flush, handsItem: handsListObject.Flush });
            }
            if (handsListObject.Straight) {
                scoreItemList.push({ hands: PokerHands.Straight, handsItem: handsListObject.Straight });
            }
            if (handsListObject.Three) {
                scoreItemList.push({ hands: PokerHands.Three, handsItem: handsListObject.Three });
            }
            if (handsListObject.TwoPair) {
                scoreItemList.push({ hands: PokerHands.TwoPair, handsItem: handsListObject.TwoPair });
            }
            if (handsListObject.Pair) {
                scoreItemList.push({ hands: PokerHands.Pair, handsItem: handsListObject.Pair });
            }
            if (handsListObject.HighCard) {
                scoreItemList.push({ hands: PokerHands.HighCard, handsItem: handsListObject.HighCard });
            }
        }
        return scoreItemList;
    }, [handsListObject]);

    return (
        <View style={{ flex: 1 }}>
            <Header title="Test Hands" />
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.testPokerListView}>
                    {pokerList.map((poker, index) => {
                        const isScore = scoreList?.findIndex((item) => item.id === poker.id) !== -1;
                        return <PokerItem key={index} poker={poker} style={[styles.pokerItem, (index + 1) % 5 === 0 && { marginRight: 0 }]} isScore={isScore} />;
                    })}
                </View>
                <View style={styles.handsView}>
                    <Text style={{ fontSize: StyleUtil.px(20) }}>Hands: {UIUtil.getHandsListObjectHightestHandsText(handsListObject)}</Text>
                </View>
                {testScoreItemList.map((scoreItem, i) => {
                    return (
                        <View style={styles.testScoreItemView} key={i}>
                            <Text>{UIUtil.getHandsTxt(scoreItem.hands)}:</Text>
                            <View style={styles.testScoreItemPokerView}>
                                {scoreItem.handsItem.formList.map((poker, index) => {
                                    if (poker) {
                                        const isScore = scoreItem.handsItem.scoreList?.findIndex((item) => item.id === poker.id) !== -1;
                                        return <PokerItem key={index} poker={poker} style={[styles.pokerItem, (index + 1) % 5 === 0 && { marginRight: 0 }]} isScore={isScore} />;
                                    }
                                    return null;
                                })}
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    testPokerListView: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: StyleUtil.padding,
        marginTop: StyleUtil.px(30),
    },
    pokerItem: {
        marginBottom: StyleUtil.px(10),
        marginRight: StyleUtil.px(8),
    },
    handsView: {
        paddingHorizontal: StyleUtil.padding,
    },
    testScoreItemView: {
        marginTop: StyleUtil.px(10),
        paddingHorizontal: StyleUtil.padding,
    },
    testScoreItemPokerView: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: StyleUtil.px(10),
    },
});

export default TestHands;
