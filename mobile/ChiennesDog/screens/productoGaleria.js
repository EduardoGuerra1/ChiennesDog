import React, { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
} from "react-native";
import fetchData from "../utils/fetchData";
import Card from "../components/cards/colorCard";
import { useNavigation, useRoute } from "@react-navigation/native";

const ProductoGaleria = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { id_marca } = route.params;

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProductos = async () => {
            try {
                const DATA = await fetchData(`producto/${id_marca}`, "readProductosMarca");
                if (DATA.status) {
                    setProductos(DATA.dataset);
                } else {
                    alert("Error fetching products: " + DATA.error);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                alert("Error fetching products: " + error.message);
            } finally {
                setLoading(false);
            }
        };

        getProductos();
    }, [id_marca]);

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
                    <Text style={styles.tittle}>Productos</Text>
                </View>
                <View style={styles.content}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        productos.map((producto) => (
                            <Card
                                key={producto.id_producto} 
                                text={producto.nombre_producto} 
                                image={{ uri: `${constantes.IP}/chiennesdog/mobile/chiennesdog/assets/images/examples/${producto.imagen_producto}` }} 
                                onPress={navegarInfo}
                            />
                        ))
                    )}
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
