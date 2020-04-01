import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Home from '../screens/Home'
import Room from '../screens/Room'
import Header from '../shared/Header';
import React from 'react'

const screens = {
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='C_PY'/>,
            }
        }
    },
    ReviewDetails: {
        screen: Room,
        navigationOptions: {
            title: 'Room Readings',
            headerTintColor: '#000',
            headerStyle: {
                backgroundColor: '#eee'
            }
        }
    }
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#000',
        headerStyle: {
            backgroundColor: '#eee',
            height: 80,
        }
    }
})

export default HomeStack