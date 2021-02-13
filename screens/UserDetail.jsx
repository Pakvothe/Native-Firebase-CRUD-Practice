import React, { useEffect, useState } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	TextInput,
	ScrollView,
	StyleSheet,
	ActivityIndicator,
	Alert,
} from 'react-native';
import firebase from '../database/firebase';

const UserDetail = ({ navigation, route }) => {
	const initialState = {
		id: '',
		name: '',
		email: '',
		phone: '',
	};

	const [loading, setLoading] = useState(true);
	const [input, setInput] = useState(initialState);

	const getUserById = async (id) => {
		//Me traigo los datos desde firebase a partir del id
		const dbRef = firebase.db.collection('users').doc(id);
		const doc = await dbRef.get();
		const user = doc.data(); //el data() me devuelve bien los datos
		setInput({
			...user,
			id: doc.id,
		});
		setLoading(false);
	};

	useEffect(() => {
		getUserById(route.params.userId);
	}, []);

	const handleChangeText = (target, value) => {
		setInput({ ...input, [target]: value });
	};

	const deleteUser = async () => {
		const dbRef = firebase.db.collection('users').doc(route.params.userId);
		await dbRef.delete();
		navigation.navigate('UsersList');
	};

	const updateUser = async () => {
		const dbRef = firebase.db.collection('users').doc(input.id);
		await dbRef.set({
			name: input.name,
			email: input.email,
			phone: input.phone,
		});
		setInput(initialState);
		navigation.navigate('UsersList');
	};

	const openConfirmationAlert = () => {
		Alert.alert('Remove User', 'Are you sure?', [
			{ text: 'Yes', onPress: () => deleteUser() },
			{ text: 'No', onPress: () => console.log('delete cancelled') },
		]);
	};

	if (loading) {
		return (
			<View>
				<ActivityIndicator size="large" color="#9e9e9e" />
			</View>
		);
	}
	return (
		<ScrollView style={styles.container}>
			<View style={styles.inputGroup}>
				<TextInput
					style={styles.input}
					placeholder="User Name"
					onChangeText={(value) => handleChangeText('name', value)}
					value={input.name}
				/>
			</View>
			<View style={styles.inputGroup}>
				<TextInput
					style={styles.input}
					placeholder="User Email"
					onChangeText={(value) => handleChangeText('email', value)}
					value={input.email}
				/>
			</View>
			<View style={styles.inputGroup}>
				<TextInput
					style={styles.input}
					placeholder="User Phone"
					onChangeText={(value) => handleChangeText('phone', value)}
					value={input.phone}
				/>
			</View>
			<View>
				<TouchableOpacity
					style={styles.Btn}
					onPress={() => updateUser()}
				>
					<Text
						style={{
							color: 'white',
							fontWeight: 'bold',
							fontSize: 16,
						}}
					>
						Update User
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.Btn2}
					onPress={() => openConfirmationAlert()}
				>
					<Text
						style={{
							color: 'white',
							fontWeight: 'bold',
							fontSize: 16,
						}}
					>
						Delete User
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
	Btn2: {
		height: 35,
		width: '100%',
		borderRadius: 10,
		backgroundColor: '#CF142B',
		alignItems: 'center',
		marginTop: 10,
		justifyContent: 'center',
	},
});

export default UserDetail;
