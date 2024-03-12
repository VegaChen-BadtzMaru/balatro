import { Dimensions, PixelRatio } from "react-native";

const { width } = Dimensions.get("screen");

const UI_STANDARD = 375;

const px = (value: number) => {
    return PixelRatio.roundToNearestPixel((width / UI_STANDARD) * value);
};

export const StyleUtil = {
    px,
    padding: px(30),
};
