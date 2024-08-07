import React, { useEffect, useState } from "react";
import {
    ScrollView,
    TouchableOpacity,
    View,
    Text,
    Alert,
    StyleSheet,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from "react-native";

import DefaultBtn from "../components/buttons/defaultBtn";
import fetchData from "../utils/fetchData";

export default function recuperacionContrasena({ navigation }) {
    const [correo, setCorreo] = useState("");
    const [keyboardVisible, setkeyboardVisible] = useState(false);

    const handlerRecuperar = async () => {
        try {
            //Crea un formulario FormData con datos usuario y contra
            const form = new FormData();
            form.append("correo", correo);

            // Realiza una solicitud para la recuperación de contraseña usando fetchData
            const DATA = await fetchData("cliente", "emailPasswordSender", form);

            if (DATA.status) {
                Alert.alert("Éxito", "Se ha enviado un codigo de verificacion");
                setCorreo("");
                token = DATA.dataset
                navigation.replace("VerificacionContra", { token })
            } else {
                //Muestra alerta error
                console.log(DATA);
                Alert.alert("Error", DATA.error);
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert("Error", "Ocurrió un error al recuperar la contraseña");
        }
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            () => {
                setkeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            () => {
                setkeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const navigarVerificar = async () => {
      navigation.replace("Verificacion");
  };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <ScrollView contentContainerStyle={styles.mainContainer}>
                <View style={styles.content}>
                    <Text style={styles.title}>Recuperación de contraseña</Text>
                    <Text style={styles.subtitle}>Ingresa el correo del que quieres recuperar la contraseña</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="correo"
                        placeholderTextColor="#FFFFFF"
                        value={correo}
                        onChangeText={setCorreo}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <DefaultBtn
                        textoBoton="Recuperar"
                        accionBoton={handlerRecuperar}
                    />
                    <TouchableOpacity style={styles.btnLink} onPress={navigarVerificar}>
                        <Text style={styles.textLink}>Verificar Codigo</Text>
                    </TouchableOpacity>
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
        flexGrow: 1,
        backgroundColor: "#FFE6D5",
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        width: "100%",
        height: Dimensions.get("window").height / 1.4,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#AC4B12",
        borderLeftColor: "#FF6607",
        borderLeftWidth: 30,
        borderTopStartRadius: 90,
        padding: 30,
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: "#fff",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 18,
        color: "#fff",
        marginBottom: 20,
    },
    btnLink: {
        marginTop: 20,
    },
    textLink: {
        color: "#FFFFFF",
        fontSize: 18,
    },
});