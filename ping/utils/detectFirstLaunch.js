/*
 * detectFirstLaunch.js
 * check if this is the 1st time launching the app
 */

import { AsyncStorage } from "react-native";


const HAS_LAUNCHED = "hasLaunched";


function setLaunched() {
    AsyncStorage.setItem(HAS_LAUNCHED, "true");
}


export default async function detectFirstLaunch() {
    try {
        const hasLaunched = await AsyncStorage.getItem(HAS_LAUNCHED);
        if (hasLaunched === null) {
            setLaunched();
            return false;
        } else {
            return true;
        }
    } catch (error) {
        return false;
    }
}
