import React, { useState } from 'react';
import { ScrollView, ImageBackground, Image, StyleSheet, TextInput, Button, Text, View } from 'react-native';
import { setToken } from '../api/token';
import InputScrollView from 'react-native-input-scroll-view';

const image = { uri: "https://reactjs.org/logo-og.png" };


const EmailForm = ({ buttonText, onSubmit, children, onAuthentication }) => {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [errorMessage, setErrorMessage, infoMessage, setInfoMessage] = useState('');

    const submit = () => {
        onSubmit(email, password)
            .then(async (res) => {
                await setToken(res.auth_token);
                onAuthentication();
            })
            .catch((res) => {
                if (res && res.error) {
                    setErrorMessage(res.error);
                }
                setErrorMessage('Mauvais identifiant ou mot de passe');
            });
    };

    return (
        <InputScrollView contentContainerStyle={styles.container}>


            <TextInput
                style={styles.input}
                onChangeText={(text) => onChangeEmail(text)}
                value={email}
                textContentType='emailAddress'
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                autoCompleteType='email'

            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => onChangePassword(text)}
                value={password}
                secureTextEntry
                autoCapitalize='none'
            />
            <Button 
            style={styles.bouton}
            title={buttonText} onPress={submit} />
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            
            {children}

        </InputScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FFF"
    },
    bouton:{
        width:200,
        backgroundColor:"#FFF"
    },
    input: {
        height: 40,
        width: 300,
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 20,
        backgroundColor:"#FFF",
        padding:5,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 16,
        width: "100%",
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
    },
    tinyLogo:{
        width: 150,
        height:30
    }
});

export default EmailForm;