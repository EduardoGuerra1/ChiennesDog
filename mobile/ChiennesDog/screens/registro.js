import React, { useEffect, useState } from "react";
import {
    ScrollView,
    TouchableOpacity,
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Alert,
    ImageBackground,
    Image,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
} from "react-native";
import fetchData from "../utils/fetchData";
import TelefonoInput from "../components/inputs/telInput";
import AlfabeticoInput from "../components/inputs/alfabeticoInput";
import DuiInput from "../components/inputs/duiInput";
import CorreoInput from "../components/inputs/correoInput";
import GlobalInput from "../components/inputs/globalInput";
import ContraInput from "../components/inputs/contraInput";
import DatePicker from "../components/pickers/fechaPicker";
import Button from "../components/buttons/defaultBtn";

export default function Registro({ navigation }) {
    const [isContra, setIsContra] = useState(true);
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [dui, setDui] = useState("");
    const [telefono, setTelefono] = useState("");
    const [nacimiento, setNacimiento] = useState("");
    const [direccion, setDireccion] = useState("");
    const [confirmarContrasena, setConfirmarContrasena] = useState("");

    const handlerRegistro = async () => {
        try {
            const form = new FormData();
            form.append("nombreCliente", nombre);
            form.append("apellidoCliente", apellido);
            form.append("correoCliente", correo);
            form.append("direccionCliente", direccion);
            form.append("duiCliente", dui);
            form.append("nacimientoCliente", nacimiento);
            form.append("telefonoCliente", telefono);
            form.append("claveCliente", contrasena);
            form.append("confirmarClave", confirmarContrasena);

            console.log("Datos a enviar al servidor:", {
                nombre,
                apellido,
                correo,
                direccion,
                dui,
                nacimiento,
                telefono,
                contrasena,
                confirmarContrasena,
            });

            const DATA = await fetchData("cliente", "signUpMovil", form);
            console.log(DATA);
            if (DATA.status) {
                // Navega a la siguiente pantalla o ruta en la aplicación
                await handlerLogin();
            } else {
                console.log(DATA.error);
                Alert.alert("Error", DATA.error);
                return;
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Ocurrió un error al registrar la cuenta");
        }
    };

    const handlerLogin = async () => {
        try {
            // Crea un formulario FormData con los datos de usuario y contraseña
            const form = new FormData();
            form.append("correo", correo);
            form.append("clave", contrasena);

            // Realiza una solicitud para iniciar sesión usando fetchData
            const DATA = await fetchData("cliente", "logIn", form);
            console.log(DATA);
            // Verifica la respuesta del servidor
            if (DATA.status) {
                Alert.alert(
                    "Bienvenido!",
                    "Cuenta registrada satisfactoriamente"
                );
                setContrasena("");
                setApellido("");
                setNombre("");
                setCorreo("");
                setDui("");
                setTelefono("");
                setNacimiento("");
                setDireccion("");
                setConfirmarContrasena("");
                navigation.replace("Navigation");
            } else {
                // Muestra una alerta en caso de error
                console.log(DATA);
                Alert.alert("Error sesión", DATA.error);
            }
        } catch (error) {
            // Maneja errores que puedan ocurrir durante la solicitud
            console.error(error, "Error desde Catch");
            Alert.alert("Error", "Ocurrió un error al iniciar sesión");
        }
    };

    const navigateSesion = async () => {
        navigation.replace("Sesion");
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <ScrollView style={styles.mainContainer}>
            <View style={styles.containerImg}>
                    <Image
                        source={require("../assets/images/backgrounds/perros.png")}
                        style={styles.image}
                    />
                </View>
                <View style={styles.Content}>
                <Text style={styles.tittle}>Registro</Text>
                    <AlfabeticoInput
                        placeHolder="Nombre"
                        setValor={nombre}
                        setTextChange={setNombre}
                    />
                    <AlfabeticoInput
                        placeHolder="Apellido"
                        setValor={apellido}
                        setTextChange={setApellido}
                    />
                    <DatePicker label={"Fecha de nacimiento"} setValor={setNacimiento} />

                    <TelefonoInput
                        placeHolder="Teléfono"
                        setValor={telefono}
                        setTextChange={setTelefono}
                    />
                    <DuiInput
                        placeHolder="DUI"
                        setValor={dui}
                        setTextChange={setDui}
                    />
                    <GlobalInput
                        placeHolder="Dirección"
                        setValor={direccion}
                        setTextChange={setDireccion}
                        maxLength={250} // Define aquí la longitud máxima permitida
                    />
                    <CorreoInput
                        placeHolder="Correo"
                        setValor={correo}
                        setTextChange={setCorreo}
                    />
                    <ContraInput
                        placeHolder="Contraseña"
                        setValor={contrasena}
                        setTextChange={setContrasena}
                        contra={isContra}
                        maxLength={40} // Define aquí la longitud máxima permitida
                    />
                    <ContraInput
                        placeHolder="Confirmar contraseña"
                        setValor={confirmarContrasena}
                        setTextChange={setConfirmarContrasena}
                        contra={isContra}
                        maxLength={40} // Define aquí la longitud máxima permitida
                    />
                    <Button
                        textoBoton="Acceder"
                        accionBoton={handlerRegistro}
                    />
                    <TouchableOpacity
                        style={styles.btnLink}
                        onPress={navigateSesion}
                    >
                        <Text style={styles.textLink}>Iniciar sesión</Text>
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
        backgroundColor: "#FFE6D5",
    },
    image: {
        resizeMode: "cover",  // Ajusta el modo de escalado según sea necesario
        width: Dimensions.get("window").width / 1, // Ajusta el ancho según el ancho de la pantalla
        height: Dimensions.get("window").height / 3,  // Ajusta la altura según sea necesario
        marginRight: Dimensions.get("window").width * 0.14, // Mueve la imagen hacia la derecha para cortar del lado derecho
    },    
    Content: {
        width: "100%",
        height: Dimensions.get("window").height / 0.7,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FF9E08",
        borderRightColor: "#FF6607",
        borderRightWidth: 30,
        borderTopEndRadius: 90,
        padding: 30,
    },
    tittle: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 50,
    },
    btnLink:{
        marginTop: "5%",
        marginBottom: "15%",
    },

    textLink: {
        color: "#FFFFFF",
        fontSize: 18,
        fontFamily: "medium",
    },
});
