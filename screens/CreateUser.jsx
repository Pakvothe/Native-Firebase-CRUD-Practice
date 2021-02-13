import React, { useState } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	TextInput,
	ScrollView,
	StyleSheet,
} from 'react-native';
import firebase from '../database/firebase';

const CreateUser = ({ navigation }) => {
	const [input, setInput] = useState({
		name: '',
		email: '',
		phone: '',
	});

	const handleChangeText = (target, value) => {
		setInput({ ...input, [target]: value });
	};

	const saveNewUser = async () => {
		if (input.name === '') {
			alert('Please provide a name');
		} else {
			try {
				await firebase.db.collection('users').add({
					name: input.name,
					email: input.email,
					phone: input.phone,
				});
				navigation.navigate('UsersList');
			} catch (err) {
				alert('Error, try again');
			}
		}
	};

	return (
		<ScrollView style={styles.container}>
			<View style={styles.inputGroup}>
				<TextInput
					style={styles.input}
					placeholder="User Name"
					onChangeText={(value) => handleChangeText('name', value)}
				/>
			</View>
			<View style={styles.inputGroup}>
				<TextInput
					style={styles.input}
					placeholder="User Email"
					onChangeText={(value) => handleChangeText('email', value)}
				/>
			</View>
			<View style={styles.inputGroup}>
				<TextInput
					style={styles.input}
					placeholder="User Phone"
					onChangeText={(value) => handleChangeText('phone', value)}
				/>
			</View>
			<View>
				<TouchableOpacity
					style={styles.Btn}
					onPress={() => saveNewUser()}
				>
					<Text
						style={{
							color: 'white',
							fontWeight: 'bold',
							fontSize: 16,
						}}
					>
						Save User
					</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	inputGroup: {
		flex: 1,
		padding: 5,
		width: '100%',
		alignSelf: 'center',
		marginTop: 10,
		marginBottom: 10,
		borderBottomWidth: 1,
		borderColor: '#ccc',
		borderRadius: 10,
	},
	input: {
		height: 35,
		padding: 5,
	},
	Btn: {
		height: 35,
		width: '100%',
		borderRadius: 10,
		backgroundColor: '#20639B',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default CreateUser;
