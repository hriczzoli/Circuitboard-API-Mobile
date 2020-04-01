import React, { useState } from 'react';
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import Navigator from './routes/drawer'

const getFonts = () => Font.loadAsync({
  'ubuntu-regular': require('./assets/fonts/Ubuntu-Regular.ttf'),
  'ubuntu-bold': require('./assets/fonts/Ubuntu-Bold.ttf')
})

console.disableYellowBox = true

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  if(fontsLoaded){
    return (
      <Navigator />
    );
  } else {
    return (
      <AppLoading 
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
      />
    )
  }
}

