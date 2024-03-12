import { getSuitsType } from "@/module/basic/func";
import { HandsItem, ListHands, Poker, PokerHands, Suits } from "@/module/basic/type";

export const MAX_SCORE_LIST_LENGTH = 5;

export class PokerUtil {
    static isRoyalFlush = (params: { pokerList: Poker[]; limit?: number }): HandsItem | null => {
        const { pokerList, limit = 5 } = params;
        let scoreRecordList: Poker[] = [];
        const aceList = pokerList.filter((poker) => poker.face === 14);
        if (aceList.length === 0) {
            return null;
        }
        aceList.forEach((acePoker) => {
            const currentScoreList: Poker[] = [acePoker];
            pokerList.forEach((poker) => {
                if (poker.suits === acePoker.suits && poker.face === currentScoreList.at(-1)!.face - 1) {
                    currentScoreList.push(poker);
                }
            });
            if (currentScoreList.length >= limit) {
                scoreRecordList = currentScoreList;
            }
        });
        if (scoreRecordList.length < limit) {
            return null;
        }
        let formList: Poker[] = [...scoreRecordList];
        if (formList.length < MAX_SCORE_LIST_LENGTH) {
            const filterList = pokerList.filter((poker) => {
                return scoreRecordList.findIndex((scorePoker) => scorePoker.id === poker.id) === -1;
            });
            const differNum = MAX_SCORE_LIST_LENGTH - formList.length;
            for (let i = 0; i < differNum; i++) {
                formList.push(filterList[i]);
            }
        } else {
            formList = formList.slice(0, MAX_SCORE_LIST_LENGTH);
        }
        return {
            formList,
            scoreList: scoreRecordList.slice(0, MAX_SCORE_LIST_LENGTH),
        };
    };

    static isStraightFlush = (params: { pokerList: Poker[]; limit?: number }): HandsItem | null => {
        const { pokerList, limit = 5 } = params;
        let scoreRecordList: Poker[] = [];
        const aceList = pokerList.filter((poker) => poker.face === 14);
        pokerList.forEach((poker, index) => {
            const currentScoreList: Poker[] = [poker];
            for (let i = index + 1; i < pokerList.length; i++) {
                if (pokerList[i].suits === poker.suits && pokerList[i].face === currentScoreList.at(-1)!.face - 1) {
                    currentScoreList.push(pokerList[i]);
                }
            }
            if (currentScoreList.length < MAX_SCORE_LIST_LENGTH && currentScoreList.at(-1)!.face === 2 && aceList.length) {
                const matchedAce = aceList.find((ace) => ace.suits === poker.suits);
                if (matchedAce) {
                    currentScoreList.unshift(matchedAce);
                }
            }
            if (currentScoreList.length >= limit) {
                scoreRecordList = currentScoreList;
            }
        });
        if (scoreRecordList.length < limit) {
            return null;
        }
        let formList: Poker[] = [...scoreRecordList];
        if (formList.length < MAX_SCORE_LIST_LENGTH) {
            const filterList = pokerList.filter((poker) => {
                return scoreRecordList.findIndex((scorePoker) => scorePoker.id === poker.id) === -1;
            });
            const differNum = MAX_SCORE_LIST_LENGTH - formList.length;
            for (let i = 0; i < differNum; i++) {
                formList.push(filterList[i]);
            }
        } else {
            formList = formList.slice(0, MAX_SCORE_LIST_LENGTH);
        }
        return {
            formList,
            scoreList: scoreRecordList.slice(0, MAX_SCORE_LIST_LENGTH),
        };
    };

    static isFour = (params: { pokerList: Poker[] }): HandsItem | null => {
        const { pokerList } = params;
        const scoreRecordList: Poker[] = [];
        const recorderCount = pokerList.reduce<{ [key: string]: number }>((recorder, poker) => {
            if (poker.face in recorder) {
                recorder[poker.face]++;
            } else {
                recorder[poker.face] = 1;
            }
            return recorder;
        }, {});
        let recordFace: number | null = null;
        for (let faceKey in recorderCount) {
            if (recorderCount[faceKey] >= 4) {
                recordFace = Number(faceKey);
            }
        }
        if (recordFace === null) {
            return null;
        }
        pokerList.forEach((poker) => {
            if (poker.face === recordFace) {
                scoreRecordList.push(poker);
            }
        });
        let formList: Poker[] = [...scoreRecordList];
        if (formList.length < MAX_SCORE_LIST_LENGTH) {
            const filterList = pokerList.filter((poker) => {
                return scoreRecordList.findIndex((scorePoker) => scorePoker.id === poker.id) === -1;
            });
            const differNum = MAX_SCORE_LIST_LENGTH - formList.length;
            for (let i = 0; i < differNum; i++) {
                formList.push(filterList[i]);
            }
        } else {
            formList = formList.slice(0, MAX_SCORE_LIST_LENGTH);
        }
        return {
            formList,
            scoreList: scoreRecordList,
        };
    };

    static isFullHouse = (params: { pokerList: Poker[] }): HandsItem | null => {
        const { pokerList } = params;
        const countReduce = pokerList.reduce<{ [key: string]: number }>((recorder, poker) => {
            if (poker.face in recorder) {
                recorder[poker.face]++;
            } else {
                recorder[poker.face] = 1;
            }
            return recorder;
        }, {});
        const faceCountList: { face: number; count: number }[] = [];
        for (let faceKey in countReduce) {
            if (countReduce[faceKey] > 1) {
                faceCountList.push({ face: Number(faceKey), count: countReduce[faceKey] });
            }
        }
        faceCountList.sort((pre, nex) => nex.face - pre.face);
        let threeScoreFace: number | null = null;
        let pairScoreFace: number | null = null;
        for (let i = 0; i < faceCountList.length; i++) {
            if (i === 0) {
                if (faceCountList[i].count >= 5) {
                    threeScoreFace = faceCountList[i].face;
                    pairScoreFace = faceCountList[i].face;
                    break;
                } else if (faceCountList[i].count >= 3) {
                    threeScoreFace = faceCountList[i].face;
                } else {
                    break;
                }
            } else if (i === 1) {
                pairScoreFace = faceCountList[i].face;
            }
        }
        if (threeScoreFace === null || pairScoreFace === null) {
            return null;
        }
        const threeScoreList: Poker[] = [];
        const pairScoreList: Poker[] = [];
        for (let i = 0; i < pokerList.length; i++) {
            if (pokerList[i].face === threeScoreFace && threeScoreList.length < 3) {
                threeScoreList.push(pokerList[i]);
            } else if (pokerList[i].face === pairScoreFace && pairScoreList.length < 2) {
                pairScoreList.push(pokerList[i]);
            }
        }
        return {
            formList: [...threeScoreList, ...pairScoreList],
            scoreList: [...threeScoreList, ...pairScoreList],
        };
    };

    static isFlush = (params: { pokerList: Poker[]; limit?: number }): HandsItem | null => {
        const { pokerList, limit = 5 } = params;
        const recorderCount = pokerList.reduce<{ [key: string]: number }>((recorder, poker) => {
            if (poker.suits in recorder) {
                recorder[poker.suits]++;
            } else {
                recorder[poker.suits] = 1;
            }
            return recorder;
        }, {});
        let recordSuits: Suits | null = null;
        for (let suitsKey in recorderCount) {
            if (recorderCount[suitsKey] >= limit) {
                recordSuits = getSuitsType(suitsKey);
            }
        }
        if (recordSuits === null) {
            return null;
        }
        const scoreRecordList = pokerList.filter((poker) => poker.suits === recordSuits);
        let formList: Poker[] = [...scoreRecordList];
        if (formList.length < MAX_SCORE_LIST_LENGTH) {
            const filterList = pokerList.filter((poker) => {
                return scoreRecordList.findIndex((scorePoker) => scorePoker.id === poker.id) === -1;
            });
            const differNum = MAX_SCORE_LIST_LENGTH - formList.length;
            for (let i = 0; i < differNum; i++) {
                formList.push(filterList[i]);
            }
        } else {
            formList = formList.slice(0, MAX_SCORE_LIST_LENGTH);
        }
        return {
            formList,
            scoreList: scoreRecordList.slice(0, MAX_SCORE_LIST_LENGTH),
        };
    };

    static isStraight = (params: { pokerList: Poker[]; limit?: number }): HandsItem | null => {
        const { pokerList, limit = 5 } = params;
        let scoreRecordList: Poker[] = [];
        const aceList = pokerList.filter((poker) => poker.face === 14);
        pokerList.forEach((poker, index) => {
            const currentScoreList: Poker[] = [poker];
            for (let i = index + 1; i < pokerList.length; i++) {
                if (pokerList[i].face === currentScoreList.at(-1)!.face - 1) {
                    currentScoreList.push(pokerList[i]);
                }
            }
            if (currentScoreList.length < MAX_SCORE_LIST_LENGTH && currentScoreList.at(-1)!.face === 2 && aceList.length) {
                currentScoreList.unshift(aceList[0]);
            }
            if (currentScoreList.length >= limit) {
                scoreRecordList = currentScoreList;
            }
        });
        if (scoreRecordList.length < limit) {
            return null;
        }
        let formList: Poker[] = [...scoreRecordList];
        if (formList.length < MAX_SCORE_LIST_LENGTH) {
            const filterList = pokerList.filter((poker) => {
                return scoreRecordList.findIndex((scorePoker) => scorePoker.id === poker.id) === -1;
            });
            const differNum = MAX_SCORE_LIST_LENGTH - formList.length;
            for (let i = 0; i < differNum; i++) {
                formList.push(filterList[i]);
            }
        } else {
            formList = formList.slice(0, MAX_SCORE_LIST_LENGTH);
        }

        return {
            formList,
            scoreList: scoreRecordList.slice(0, MAX_SCORE_LIST_LENGTH),
        };
    };

    static isThree = (params: { pokerList: Poker[] }): HandsItem | null => {
        const { pokerList } = params;
        const scoreRecordList: Poker[] = [];
        const recorderCount = pokerList.reduce<{ [key: string]: number }>((recorder, poker) => {
            if (poker.face in recorder) {
                recorder[poker.face]++;
            } else {
                recorder[poker.face] = 1;
            }
            return recorder;
        }, {});
        let recordFace: number | null = null;
        for (let faceKey in recorderCount) {
            if (recorderCount[faceKey] >= 3) {
                if (recordFace === null || Number(faceKey) > recordFace) {
                    recordFace = Number(faceKey);
                }
            }
        }
        if (!recordFace) {
            return null;
        }
        pokerList.forEach((poker) => {
            if (poker.face === recordFace) {
                scoreRecordList.push(poker);
            }
        });
        let formList: Poker[] = [...scoreRecordList];
        if (formList.length < MAX_SCORE_LIST_LENGTH) {
            const filterList = pokerList.filter((poker) => {
                return scoreRecordList.findIndex((scorePoker) => scorePoker.id === poker.id) === -1;
            });
            const differNum = MAX_SCORE_LIST_LENGTH - formList.length;
            for (let i = 0; i < differNum; i++) {
                formList.push(filterList[i]);
            }
        } else {
            formList = formList.slice(0, MAX_SCORE_LIST_LENGTH);
        }
        return {
            formList,
            scoreList: scoreRecordList.slice(0, 3),
        };
    };

    static isTwoPair = (params: { pokerList: Poker[] }): HandsItem | null => {
        const { pokerList } = params;
        const scoreRecordList: Poker[] = [];
        let coupleList: Poker[] = [];
        for (let i = 0; i < pokerList.length; i++) {
            if (coupleList.length === 0) {
                coupleList.push(pokerList[i]);
            } else {
                if (coupleList[0].face === pokerList[i].face) {
                    scoreRecordList.push(coupleList[0]);
                    scoreRecordList.push(pokerList[i]);
                    coupleList = [];
                } else {
                    coupleList = [pokerList[i]];
                }
                if (scoreRecordList.length === 4) {
                    break;
                }
            }
        }
        if (scoreRecordList.length !== 4) {
            return null;
        }
        let formList: Poker[] = [...scoreRecordList];
        if (formList.length < MAX_SCORE_LIST_LENGTH) {
            const filterList = pokerList.filter((poker) => {
                return scoreRecordList.findIndex((scorePoker) => scorePoker.id === poker.id) === -1;
            });
            const differNum = MAX_SCORE_LIST_LENGTH - formList.length;
            for (let i = 0; i < differNum; i++) {
                formList.push(filterList[i]);
            }
        } else {
            formList = formList.slice(0, MAX_SCORE_LIST_LENGTH);
        }
        return {
            formList,
            scoreList: scoreRecordList,
        };
    };

    static isPair = (params: { pokerList: Poker[] }): HandsItem | null => {
        const { pokerList } = params;
        const scoreRecordList: Poker[] = [];
        let coupleList: Poker[] = [];
        for (let i = 0; i < pokerList.length; i++) {
            if (coupleList.length === 0) {
                coupleList.push(pokerList[i]);
            } else {
                if (coupleList[0].face === pokerList[i].face) {
                    scoreRecordList.push(coupleList[0]);
                    scoreRecordList.push(pokerList[i]);
                    coupleList = [];
                    if (scoreRecordList.length === 2) {
                        break;
                    }
                } else {
                    coupleList = [pokerList[i]];
                }
            }
        }
        if (scoreRecordList.length !== 2) {
            return null;
        }
        let formList: Poker[] = [...scoreRecordList];
        if (formList.length < MAX_SCORE_LIST_LENGTH) {
            const filterList = pokerList.filter((poker) => {
                return scoreRecordList.findIndex((scorePoker) => scorePoker.id === poker.id) === -1;
            });
            const differNum = MAX_SCORE_LIST_LENGTH - formList.length;
            for (let i = 0; i < differNum; i++) {
                formList.push(filterList[i]);
            }
        } else {
            formList = formList.slice(0, MAX_SCORE_LIST_LENGTH);
        }
        return {
            formList,
            scoreList: scoreRecordList,
        };
    };

    static getListHands = (params: { pokerList: Poker[] }): ListHands => {
        const { pokerList } = params;
        const RoyalFlush = PokerUtil.isRoyalFlush({ pokerList });
        const StraightFlush = PokerUtil.isStraightFlush({ pokerList });
        const Four = PokerUtil.isFour({ pokerList });
        const FullHouse = PokerUtil.isFullHouse({ pokerList });
        const Flush = PokerUtil.isFlush({ pokerList });
        const Straight = PokerUtil.isStraight({ pokerList });
        const Three = PokerUtil.isThree({ pokerList });
        const TwoPair = PokerUtil.isTwoPair({ pokerList });
        const Pair = PokerUtil.isPair({ pokerList });
        const HightestHands = PokerUtil.getHightestHands({ RoyalFlush, StraightFlush, Four, FullHouse, Flush, Straight, Three, TwoPair, Pair });

        return {
            RoyalFlush,
            StraightFlush,
            Four,
            FullHouse,
            Flush,
            Straight,
            Three,
            TwoPair,
            Pair,
            HighCard: {
                formList: pokerList.slice(0, 5),
                scoreList: [pokerList[0]],
            },
            HightestHands,
        };
    };

    static getHightestHands = (params: {
        RoyalFlush: HandsItem | null;
        StraightFlush: HandsItem | null;
        Four: HandsItem | null;
        FullHouse: HandsItem | null;
        Flush: HandsItem | null;
        Straight: HandsItem | null;
        Three: HandsItem | null;
        TwoPair: HandsItem | null;
        Pair: HandsItem | null;
    }): PokerHands => {
        const {} = params;
        if (params.RoyalFlush) {
            return PokerHands.RoyalFlush;
        } else if (params.StraightFlush) {
            return PokerHands.StraightFlush;
        } else if (params.Four) {
            return PokerHands.Four;
        } else if (params.FullHouse) {
            return PokerHands.FullHouse;
        } else if (params.Flush) {
            return PokerHands.Flush;
        } else if (params.Straight) {
            return PokerHands.Straight;
        } else if (params.Three) {
            return PokerHands.Three;
        } else if (params.TwoPair) {
            return PokerHands.TwoPair;
        } else if (params.Pair) {
            return PokerHands.Pair;
        } else {
            return PokerHands.HighCard;
        }
    };

    static sortPokerList = (pokerList: Poker[], sortType: "face" | "suits") => {
        if (sortType === "face") {
            return [...pokerList].sort((pre, nex) => {
                return nex.face - pre.face || pre.suits - nex.suits;
            });
        } else if (sortType === "suits") {
            return [...pokerList].sort((pre, nex) => {
                return pre.suits - nex.suits || nex.face - pre.face;
            });
        }
        return pokerList;
    };
}
