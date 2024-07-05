import React, { useEffect, useState } from "react";
import {
    ScrollView,
    TouchableOpacity,
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Alert,
    Image,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
} from "react-native";
import fetchData from "../utils/fetchData";
import Card from "../components/cards/colorCard";
import { useNavigation } from "@react-navigation/native";
import BottomNav from "../components/navigation/bottomNavigation";
import Svg, { Path } from "react-native-svg";

const ProductoGaleria = () => {
    const navigation = useNavigation();

    const navegarInfo = async () => {
        navigation.replace("ProductoInfo");
    };

    const navegarDashboard = async () => {
        navigation.replace("Navigation");
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <ScrollView style={styles.mainContainer}>
                <View style={styles.header}>
                    <Svg
                        width="44"
                        height="39"
                        viewBox="0 0 49 41"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={styles.return}
                        onPress={navegarDashboard}
                    >
                        <Path
                            d="M49 18.8401C49 18.2878 48.5523 17.8401 48 17.8401H12.6013C11.7103 17.8401 11.2642 16.7627 11.8943 16.1328L23.5636 4.46838C23.9543 4.07782 23.9543 3.44443 23.5636 3.05387L21.2154 0.706669C20.8249 0.31634 20.192 0.316339 19.8015 0.706668L0.707546 19.7927C0.316827 20.1833 0.316826 20.8167 0.707545 21.2073L19.8015 40.2933C20.192 40.6837 20.8249 40.6837 21.2154 40.2933L23.5636 37.9461C23.9543 37.5556 23.9543 36.9222 23.5636 36.5316L11.8943 24.8672C11.2642 24.2373 11.7103 23.1599 12.6013 23.1599H48C48.5523 23.1599 49 22.7122 49 22.1599V18.8401Z"
                            fill="white"
                        />
                    </Svg>

                    <Text style={styles.tittle}>Accesorios</Text>
                </View>
                <View style={styles.content}>
                    <Card
                        text="Collar rojo seguro"
                        image={require("../assets/images/examples/image4.png")}
                        onPress={navegarInfo}
                    />
                    <Card
                        text="Comida"
                        image={require("../assets/images/examples/image4.png")}
                        onPress={navegarInfo}
                    />
                    <Card
                        text="Cosméticos"
                        image={require("../assets/images/examples/image4.png")}
                        onPress={navegarInfo}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    mainContainer: {
        backgroundColor: "#FFE6D5",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        backgroundColor: "#472B1F",
        height: Dimensions.get("window").height / 8.5,
        alignContent: "center",
        justifyContent: "flex-start",
        borderBottomEndRadius: 90,
        marginBottom: "10%",
        paddingVertical: 14
    },
    return: {
        marginVertical: 10,
        marginHorizontal: 35,
    },
    tittle: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    content: {
        alignItems: "center",
    },
    card: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        height: Dimensions.get("window").height / 6,
        borderRadius: 20,
        width: Dimensions.get("window").width / 1.2,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: "2%",
    },
    image: {
        resizeMode: "cover",
    },
});

export default ProductoGaleria;
