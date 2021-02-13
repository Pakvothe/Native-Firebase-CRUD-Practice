import React, { useEffect, useState } from 'react';
import {
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import firebase from '../database/firebase';
import { ListItem, Avatar } from 'react-native-elements';

const UsersList = ({ navigation }) => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		firebase.db.collection('users').onSnapshot((querySnapshot) => {
			const users = [];

			querySnapshot.docs.forEach((doc) => {
				const { name, email, phone } = doc.data();
				users.push({
					id: doc.id,
					name,
					email,
					phone,
				});
			});

			setUsers(users);
		});
	}, []);

	return (
		<ScrollView style={styles.container}>
			{users.map((user) => {
				return (
					<ListItem
						key={user.id}
						bottomDivider
						onPress={() =>
							navigation.navigate('UserDetail', {
								userId: user.id,
							})
						}
					>
						<ListItem.Chevron />
						<Avatar
							rounded
							source={{
								uri:
									'https://static.zerochan.net/Squall.Leonhart.240.145464.jpg',
							}}
						/>
						<ListItem.Content>
							<ListItem.Title>{user.name}</ListItem.Title>
							<ListItem.Subtitle>{user.email}</ListItem.Subtitle>
						</ListItem.Content>
					</ListItem>
				);
			})}
			<View>
				<TouchableOpacity
					style={styles.Btn}
					onPress={() => navigation.navigate('CreateUser')}
				>
					<Text
						style={{
							color: 'white',
							fontWeight: 'bold',
							fontSize: 16,
						}}
					>
						Create User
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
		marginTop: 20,
	},
});

export default UsersList;
