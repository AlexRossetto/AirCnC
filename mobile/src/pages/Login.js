import React, { useState, useEffect } from 'react';
import { View, Image, KeyboardAvoidingView, AsyncStorage ,Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';
import api from '../services/api';
import { onAnchorsDidUpdate } from 'expo/build/AR';

export default function Login( { navigation }) {
	const [email, setEmail] = useState('');
	const [techs, setTechs] = useState('');

	useEffect(() => {
		AsyncStorage.getItem('user').then(user => {
			if(user) {
				navigation.navigate('List');
			}
		})
	},[])

	async function handleSubmit() {
		const response = await api.post('/sessions', {
			email
		})
		const { _id } = response.data;

		console.log(_id, "id do usuario")

		await AsyncStorage.setItem('user', _id);
		await AsyncStorage.setItem('techs', techs);

		navigation.navigate('List');
	}
  return (
		//Faz com que a view seja elevada quando o teclado é ativado
  	<KeyboardAvoidingView behavior="padding" style={styles.container}>
    	<Image source={logo} />
      <View style={styles.form}>
        <Text style={styles.label}>SEU E-MAIL *</Text>
				<TextInput
					style={styles.input}
					placeholder="Seu e-mail"
					placeholderTextColor="#999"
					autoCapitalize="none"
					autoCorrect={false}
					value={email}
					onChangeText={setEmail}
				>
				</TextInput>
				<Text style={styles.label}>TECNOLOGIAS *</Text>
				<TextInput
					style={styles.input}
					placeholder="Tecnologias de Interesse"
					placeholderTextColor="#999"
					autoCapitalize="words"
					autoCorrect={false}
					value={techs}
					onChangeText={setTechs}
				>

				</TextInput>
				<TouchableOpacity onPress={handleSubmit} style={styles.button}>
					<Text style={styles.buttonText}>Encontrar Spots</Text>
				</TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
		},
		
		form: {
			alignSelf: 'stretch',
			paddingHorizontal: 30,
			marginTop: 30
		},

		input: {
			borderWidth: 1,
			borderColor: '#ddd',
			paddingHorizontal: 20,
			fontSize: 16,
			color: '#444',
			height: 44,
			marginBottom: 20,
			borderRadius: 2,

		},
		button: {
			height: 42,
			backgroundColor: '#f05a5b',
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 2,
		},
		buttonText: {
			color: '#fff',
			fontWeight: 'bold',
			fontSize: 16
		},
})