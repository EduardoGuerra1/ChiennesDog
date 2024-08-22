import React, { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    ActivityIndicator,
} from "react-native";
import fetchData from "../utils/fetchData";
import Card from "../components/cards/simpleCard";
import { useNavigation } from '@react-navigation/native';
import * as constantes from '../utils/constantes';

const Dashboard = () => {
    const navigation = useNavigation();
    const [marcas, setMarcas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const DATA = await fetchData("marcas", "readAll");
                if (DATA.status) {
                    setMarcas(DATA.dataset);
                } else {
                    alert("Error fetching data: " + DATA.error);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("Error fetching data: " + error.message);
            } finally {
                setLoading(false);
            }
        };
        
        getData();
    }, []);

    const navegarGaleria = (id_marca) => {
        navigation.navigate("ProductoGaleria", { id_marca });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <ScrollView style={styles.mainContainer}>
                <View style={styles.header}>
                    <Text style={styles.tittle}>Categorías</Text>
                </View>
                <View style={styles.content}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        marcas.map((marca) => (
                            <Card
                                key={marca.id_marca} 
                                text={marca.nombre_marca} 
                                image={{ uri: `${constantes.IP}/chiennesdog/mobile/chiennesdog/assets/images/examples/${marca.imagen_marca}` }} 
                                onPress={() => navegarGaleria(marca.id_marca)}
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
        backgroundColor: "#472B1F",
        height: Dimensions.get("window").height / 9,
        alignContent: "center",
        justifyContent: "center",
        borderBottomEndRadius: 90,
        marginBottom: "10%",
    },
    tittle: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    content: {
        alignItems: "center",
        marginBottom: 90,
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
    }
});

export default Dashboard;
