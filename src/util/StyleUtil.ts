import { Dimensions, PixelRatio } from "react-native";

const { width } = Dimensions.get("screen");

const UI_STANDARD = 375;

export const StyleUtil = {
    px(px: number) {
        return PixelRatio.roundToNearestPixel((width / UI_STANDARD) * px);
    },
};
