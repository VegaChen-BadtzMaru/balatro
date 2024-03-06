import { NavigationContainerRef } from "@react-navigation/native";
import { RouterParams } from "./type";

export type NavigationRef = NavigationContainerRef<RouterParams>;

export class Navigation {
    static rootNavigator: NavigationRef | null;
}
