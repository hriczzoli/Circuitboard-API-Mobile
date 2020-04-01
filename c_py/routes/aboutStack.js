import { createStackNavigator } from 'react-navigation-stack'
import About from '../screens/About'
import Header from '../shared/Header';
import React from 'react'

const screens = {
    About: {
        screen: About,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='About'/>,
            }
        }
    },
}

const AboutStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#757575',
            height: 80
        }
    }
})

export default AboutStack