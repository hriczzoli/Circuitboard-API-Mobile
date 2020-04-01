import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native'
import { WebView } from 'react-native-webview';
import { globalStyles, images } from '../styles/Global'
import Card from '../shared/Card'
import { v4 as uuidv4 } from 'uuid'

export default function Room({ navigation }) {
    const rating = navigation.getParam('rating')
    const [readings, setReadings] = useState([])

    useEffect(() => {
        async function getRoomSensorReadings(){
            await fetch('https://evening-ridge-85730.herokuapp.com/')
                .then(response => response.json())
                .then(data => {
                    setReadings(data)
                })
        }
        getRoomSensorReadings()
    }, [])

    const id = uuidv4()

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../assets/livingroom-overlay.jpg')} 
            />
            <Text style={styles.title}>Livingroom</Text>
            <View style={styles.cardContainer}>
            <Card style={styles.roomCard}>
                <Text style={styles.roomCardHeaderText}>Sensor readings:</Text>
                <View style={styles.rating}>
                    <FlatList
                    style={styles.list}
                        data={readings}
                        renderItem={({ item }) => (
                            <View style={styles.sensorReadingItem}>
                                <Text style={styles.reading}>Light level: {Math.round(item.Light / 100000 * 100)}%</Text>
                                <Text style={styles.reading}>Temperature: {Math.round(item.Temperature)}C°</Text>
                                <Text style={styles.reading}>Measured at: {item.Time}</Text>
                            </View>
                        )}
                        keyExtractor={item => item.id || id}
                    />
                </View>
            </Card>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    rating: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 0,
        marginTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingHorizontal: 20
    },
    title: {
        position: 'absolute',
        alignSelf: 'center',
        color: '#fff',
        fontSize: 30,
        marginTop: 50
    },
    image: {
        resizeMode: 'cover',
        width: '100%'
    },
    cardContainer: {
        maxHeight: 600,
        overflow: 'hidden'
    },
    roomCardHeaderText: {
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 15
    },
    sensorReadingItem: {
        display: 'flex',
        borderBottomWidth: 1,
        borderBottomColor: '#757575'
    },
    reading: {
        marginTop: 5
    }
})