import {  StyleSheet, Text, TextInput, View, TouchableOpacity, ImageBackground, Image, Button } from "react-native";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import * as LocalAuthentication from 'expo-local-authentication';
// import BaseButton from "../components/BaseButton";
export default function LoginBio({ navigation }) {
  const EResult = {
    CANCELLED : 'CANCELLED',
    DISABLED : 'DISABLED',
    ERROR : 'ERROR',
    SUCCESS : 'SUCCESS',
  }
  const [facialRecognitionAvailable, setFacialRecognitionAvailable] = useState(false);
  const [fingerprintAvailable, setFingerprintAvailable] = useState(false);
  const [irisAvailable, setIrisAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(EResult);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const isFocused = useIsFocused();

  useEffect(() => {
    checkSupportedAuthentication();
  }, []);

  useEffect(() => {
    setLoginInput({
      email: "",
      password: "",
    })
  },[!isFocused])

  const checkSupportedAuthentication = async () => {
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (types && types.length) {
      setFacialRecognitionAvailable(types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION));
      setFingerprintAvailable(types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT));
      setIrisAvailable(types.includes(LocalAuthentication.AuthenticationType.IRIS));
    }
  }

  const authenticate = async () => {
    if (loading) {
      return (<h1>Authenticating...</h1>);
    }

    setLoading(true);

    try {
      const results = await LocalAuthentication.authenticateAsync();

      if (results.success) {
        setResult(EResult.SUCCESS);
        navigation.navigate("Login");
      } else if (results.error === 'unknown') {
        setResult(EResult.DISABLED);
      } else if (
        results.error === 'user_cancel' ||
        results.error === 'system_cancel' ||
        results.error === 'app_cancel'
      ) {
        setResult(EResult.CANCELLED);
      }
    } catch (error) {
      setResult(EResult.ERROR);
    }

    setLoading(false);
  };

  let resultMessage;
  switch (result) {
    case EResult.CANCELLED:
      resultMessage = 'Authentication process has been cancelled';
      break;
    case EResult.DISABLED:
      resultMessage = 'Biometric authentication has been disabled';
      break;
    case EResult.ERROR:
      resultMessage = 'There was an error in authentication';
      return navigation.navigate("Login");
    case EResult.SUCCESS:
      resultMessage = 'Successfully authenticated';
      break;
    default:
      resultMessage = '';
      break;
  }

  let description;
  if (facialRecognitionAvailable && fingerprintAvailable && irisAvailable) {
    description = 'Authenticate with Face ID, touch ID or iris ID';
  } else if (facialRecognitionAvailable && fingerprintAvailable) {
    description = 'Authenticate with Face ID or touch ID';
  } else if (facialRecognitionAvailable && irisAvailable) {
    description = 'Authenticate with Face ID or iris ID';
  } else if (fingerprintAvailable && irisAvailable) {
    description = 'Authenticate with touch ID or iris ID';
  } else if (facialRecognitionAvailable) {
    description = 'Authenticate with Face ID';
  } else if (fingerprintAvailable) {
    description = 'Authenticate with touch ID ';
  } else if (irisAvailable) {
    description = 'Authenticate with iris ID';
  } else {
    description = 'No biometric authentication methods available';
  }

  return (
    <View style={styles.container}>
      <Text>
        {description}
      </Text>
      {facialRecognitionAvailable || fingerprintAvailable || irisAvailable ? (
        <Button title="auth" onPress={authenticate}>
          Authenticate
        </Button>
      ) : <Text>No Authentication available</Text>}
      {resultMessage ? <Text>{resultMessage}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
  },
  formContainer: {
    paddingHorizontal: "15%",
    backgroundColor: "transparent",
    position: "absolute",
    bottom: "2%",
    width: "100%",
    alignItems: "center",
  },
  mainText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0386EE",
    marginBottom: -5,
  },

  Image: {
    height: 72,
    width: 55,
    resizeMode: "contain",
  },

  button: {
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },

  buttonLogin: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#0386EE",
    borderRadius: 15,
    width: "100%",
  },

  textForgot: {
    color: "#0386EE",
    alignSelf: "flex-start",
  },

  textCreate: {
    color: "#0386EE",
    fontSize: 16,
  },
});
