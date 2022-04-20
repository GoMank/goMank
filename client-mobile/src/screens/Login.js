import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    ImageBackground,
    Image,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN } from '../../config/queries';
import { useMutation } from '@apollo/client';

// import BaseButton from "../components/BaseButton";
export default function Login({ navigation }) {
    const [loginClient, { data, loading, error }] = useMutation(LOGIN);

    const [loginInput, setLoginInput] = useState({
        email: '',
        password: '',
    });
    const isFocused = useIsFocused();

    useEffect(() => {
        setLoginInput({
            email: '',
            password: '',
        });
    }, [!isFocused]);

    console.log(isFocused);

    const submitLogin2 = async () => {
        loginClient({
            variables: {
                email: loginInput.email,
                password: loginInput.password,
            },
        });

        // await AsyncStorage.setItem('user_info', {
        //     email: loginInput.email,
        //     password: loginInput.password,
        // });
    };
    if (loading) {
        return (
            <View style={styles.container}>
                <View>
                    <Text>Loading .....</Text>
                </View>
            </View>
        );
    }
    if (error) {
        return (
            <View style={styles.container}>
                <View>
                    <Text>email/password invalid!</Text>
                </View>
            </View>
        );
    }

    if (data) {
        console.log('ini data', data);

        AsyncStorage.setItem('user_info', {
            name: data.loginClient.name,
            email: data.loginClient.email,
            _id: data.loginClient._id,
            phoneNumber: data.loginClient.phoneNumber,
        }).then(() => {
            navigation.navigate('TabNav');
        });
    }
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/bannerLogin1.jpg')}
                style={styles.backgroundImage}>
                <View style={styles.formContainer}>
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-between',
                        }}>
                        <View style={{ marginBottom: '8%' }}>
                            <Text style={styles.mainText}>Hey,</Text>
                            <Text style={styles.mainText}>Login Now.</Text>
                        </View>

                        <View>
                            <Image
                                source={require('../../assets/LogoGomank.png')}
                                style={styles.Image}
                            />
                        </View>
                    </View>

                    <TextInput
                        style={styles.button}
                        value={loginInput.email}
                        onChangeText={(email) => setLoginInput({ ...loginInput, email })}
                        placeholder='Email'
                    />

                    <TextInput
                        secureTextEntry={true}
                        style={styles.button}
                        value={loginInput.password}
                        onChangeText={(password) => setLoginInput({ ...loginInput, password })}
                        placeholder='Password'
                    />

                    <Text style={styles.textForgot}>Forgot Password</Text>

                    <View style={{ marginBottom: '15%' }} />

                    <TouchableOpacity style={styles.buttonLogin} onPress={submitLogin2}>
                        <Text style={styles.textButton}>Login</Text>
                    </TouchableOpacity>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.textForgot}>Don't have a account</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.textCreate}>Create New</Text>
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
        color: '#0386EE',
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
        backgroundColor: '#0386EE',
        borderRadius: 15,
        width: '100%',
    },

    textForgot: {
        color: '#0386EE',
        alignSelf: 'flex-start',
    },

    textCreate: {
        color: '#0386EE',
        fontSize: 16,
    },
});
