import React, { useState, useEffect } from "react";
import {
    ScrollView,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
} from "react-native";

import fetchData from "../utils/fetchData";
import DefaultBtn from "../components/buttons/defaultBtn";
import { useNavigation, useRoute } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";
import * as constantes from '../utils/constantes';

export default function ProductoDetalle({ navigation }) {
    const route = useRoute();
    const { id_producto } = route.params;
    const [quantity, setQuantity] = useState(1);

    const [productos, setProductos] = useState([]);

    const getProducto = async () => {
        try {
            console.log(id_producto);
            const form = new FormData();
            form.append("idProducto", id_producto);
            const DATA = await fetchData("producto", "readOne", form);   
                       
            if (DATA.status) {
                setProductos(DATA.dataset);
            } else {
                alert("Error fetching products1: " + DATA.error);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            alert("Error fetching products: " + error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getProducto();
    }, [id_producto]);


    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const navegarGale = async () => {
        navigation.replace("Navigation", {
            screen: "Dashboard",
        });
    };

    const navegarCarrito = async () => {
        navigation.replace("Navigation", {
            screen: "Carrito",
        });
    };

    const navegarValoracion = async () => {
        navigation.replace("Valoracion");
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <ScrollView style={styles.mainContainer}>
                <View style={styles.containerImg}>
                    <Svg
                        width="44"
                        height="39"
                        viewBox="0 0 49 41"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={styles.return}
                        onPress={navegarGale}
                    >
                        <Path
                            d="M49 18.8401C49 18.2878 48.5523 17.8401 48 17.8401H12.6013C11.7103 17.8401 11.2642 16.7627 11.8943 16.1328L23.5636 4.46838C23.9543 4.07782 23.9543 3.44443 23.5636 3.05387L21.2154 0.706669C20.8249 0.31634 20.192 0.316339 19.8015 0.706668L0.707546 19.7927C0.316827 20.1833 0.316826 20.8167 0.707545 21.2073L19.8015 40.2933C20.192 40.6837 20.8249 40.6837 21.2154 40.2933L23.5636 37.9461C23.9543 37.5556 23.9543 36.9222 23.5636 36.5316L11.8943 24.8672C11.2642 24.2373 11.7103 23.1599 12.6013 23.1599H48C48.5523 23.1599 49 22.7122 49 22.1599V18.8401Z"
                            fill="white"
                        />
                    </Svg>
                    <Image
                        source={{ uri: `${constantes.IP}/chiennesdog/mobile/chiennesdog/assets/images/examples/${productos.imagen_producto}` }}
                        style={styles.image}
                    />
                </View>

                <View style={styles.content}>
                    <View style={styles.headerContent}>
                        <Text style={styles.tittle}>{productos.nombre_producto}</Text>
                    </View>
                    <Text style={styles.description}>
                        {productos.descripcion_producto}
                    </Text>
                    <Text style={styles.price}>$ {productos.precio_producto}</Text>
                    <Text style={styles.rating}>★★★★★</Text>
                    <View style={styles.bottonContent}>
                        <DefaultBtn
                            textoBoton="Agregar al carrito"
                            accionBoton={navegarValoracion}
                        />
                        <TouchableOpacity onPress={handleDecrease}>
                            <Text style={styles.quantityButton}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity onPress={handleIncrease}>
                            <Text style={styles.quantityButton}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    mainContainer: {
        backgroundColor: "#FFE6D5",
    },

    containerImg: {
        padding: "5%",
        paddingTop: "8%",
        height: Dimensions.get("window").height / 4,
    },
    image: {
        width: '100%', // O un valor específico
    height: '100%', // O un valor específico
    resizeMode: 'contain',
        alignSelf: "center",
    },
    content: {
        width: "100%",
        height: Dimensions.get("window").height / 1.6,
        alignItems: "center",
        backgroundColor: "#FFA825",
        marginTop: Dimensions.get("window").height / 5,
        borderTopEndRadius: 90,
        borderTopStartRadius: 90,
    },

    headerContent: {
        backgroundColor: "#472B1F",
        borderTopEndRadius: 90,
        borderTopStartRadius: 90,
        width: "100%",
        height: "23%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    tittle: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#fff",
        alignSelf: "center",
    },

    description: {
        fontSize: 18,
        color: "#000",
        textAlign: "center",
        width: "80%",
        paddingVertical: 10,
    },
    price: {
        fontSize: 22,
        fontWeight: "900",
        color: "#000",
        marginBottom: 10,
    },
    rating: {
        fontSize: 48,
        color: "#FFf",
        marginBottom: 12,
    },

    bottonContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    quantityButton: {
        fontSize: 27,
        fontWeight: "bold",
        marginHorizontal: 10,
        color: "#FFf",
    },
    quantityText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFf",
    },
});
