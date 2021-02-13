import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Screens =>
import CreateUser from '../screens/CreateUser';
import UserDetail from '../screens/UserDetail';
import UsersList from '../screens/UsersList';

const HomeRoutes = () => {
	const { Navigator, Screen } = createStackNavigator();

	return (
		<NavigationContainer>
			<Navigator initialRouteName={'UsersList'}>
				<Screen
					name="UsersList"
					component={UsersList}
					options={{ title: 'Users List' }}
				/>
				<Screen
					name="UserDetail"
					component={UserDetail}
					options={{ title: 'User Detail' }}
				/>
				<Screen
					name="CreateUser"
					component={CreateUser}
					options={{ title: 'Create a New User' }}
				/>
			</Navigator>
		</NavigationContainer>
	);
};

export default HomeRoutes;
