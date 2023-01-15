import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    ImageBackground,
    Image,
} from 'react-native';
import { REGISTER } from '../../config/queries';
import { useMutation } from '@apollo/client';

export default function Login({ navigation }) {
    const [registerInput, setRegisterInput] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
    });

    const isFocused = useIsFocused();

    useEffect(() => {
        setRegisterInput({
            email: '',
            password: '',
            name: '',
            phone: '',
        });
    }, [!isFocused]);

    const [addProduct] = useMutation(REGISTER);
    const submitLogin2 = () => {
        addProduct({
            variables: {
                name: registerInput.name,
                email: registerInput.email,
                password: registerInput.password,
                phone: registerInput.phone,
            },
        });
        return navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/bannerLogin2.jpg')}
                style={styles.backgroundImage}>
                <View style={styles.formContainer}>
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-between',
                        }}>
                        <View style={{ marginBottom: '8%' }}>
                            <Text style={styles.mainText}>Go Wash,</Text>
                            <Text style={styles.mainText}>Register Now!</Text>
                        </View>

                        <View>
                            <Image
                                source={require('../../assets/LogoGomankYellow.png')}
                                style={styles.Image}
                            />
                        </View>
                    </View>

                    <TextInput
                        placeholder='Name'
                        style={styles.button}
                        value={registerInput.name}
                        onChangeText={(name) => setRegisterInput({ ...registerInput, name })}
                    />
                    <TextInput
                        placeholder='Email'
                        style={styles.button}
                        value={registerInput.email}
                        onChangeText={(email) => setRegisterInput({ ...registerInput, email })}
                    />
                    <TextInput
                        secureTextEntry={true}
                        placeholder='Password'
                        style={styles.button}
                        value={registerInput.password}
                        onChangeText={(password) =>
                            setRegisterInput({ ...registerInput, password })
                        }
                    />
                    <TextInput
                        placeholder='Phone Number'
                        style={styles.button}
                        value={registerInput.phone}
                        onChangeText={(phone) => setRegisterInput({ ...registerInput, phone })}
                    />

                    <View style={{ marginBottom: '15%' }} />

                    <TouchableOpacity style={styles.buttonLogin} onPress={submitLogin2}>
                        <Text style={styles.textButton}>Register</Text>
                    </TouchableOpacity>

                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.textCreate}>Back to Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    formContainer: {
        paddingHorizontal: '15%',
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: '2%',
        width: '100%',
        alignItems: 'center',
    },
    mainText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FEC900',
        marginBottom: -5,
    },

    Image: {
        height: 72,
        width: 55,
        resizeMode: 'contain',
    },

    button: {
        marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'white',
        borderRadius: 10,
        width: '100%',
    },

    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    buttonLogin: {
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#FEC900',
        borderRadius: 15,
        width: '100%',
    },

    //   textForgot: {
    //     color: "#0386EE",
    //     alignSelf: "flex-start",
    //   },

    textCreate: {
        color: '#FEC900',
        fontSize: 16,
    },
});
