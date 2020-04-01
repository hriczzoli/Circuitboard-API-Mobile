import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { globalStyles } from '../styles/Global'
import Card from '../shared/Card'
import { Feather } from '@expo/vector-icons'

export default function Home({ navigation }) {
    const [readings, setReadings] = useState([])
    const [lastReading, setLastReading] = useState([])

    useEffect(() => {
        async function getSensorReadings(){
            await fetch('https://evening-ridge-85730.herokuapp.com/')
            .then(response => response.json())
            .then(data => {
                setReadings(data)
                const lastItem = data.slice(Math.max(data.length -1,0))
                setLastReading(lastItem)
            })
        }
        getSensorReadings()
    }, [])

    
    return(
        <View style={globalStyles.container}>
            <Text style={styles.title}>Rooms</Text>
            <Text>Review sensor readings from locations</Text>
            <FlatList
                style={styles.list} 
                data={lastReading}
                keyExtractor={item => item.key || '1'}
                renderItem={({ item }) => (
                        <Card>
                            <View style={styles.cardHeader}>
                                <Image
                                    style={styles.image}
                                    source={require('../assets/livingroom.jpg')} 
                                />
                            </View>
                            <View style={styles.cardContent}>
                                <Text style={styles.titleText}>Livingroom</Text>
                                <View style={styles.iconsContainer}>
                                    <Feather 
                                        name='sun'
                                        size={34}
                                        style={styles.icon}
                                    />
                                    <Feather 
                                        name='thermometer'
                                        size={34}
                                        style={styles.icon}
                                    />
                                </View>
                                <View style={styles.iconsContainer}>
                                    <Text>{item.Light / 100000 * 100}%</Text>
                                    <Text>{Math.round(item.Temperature)}C°</Text>
                                </View>
                                <Text>Source: Circuit Playground Express</Text>
                                <View style={styles.cardActionContainer}>
                                    <Text style={styles.updatedAtText}>Last updated at: {item.Time}</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('ReviewDetails', item)}>
                                        <Text style={styles.CardButton}>VIEW</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Card>
                )}
            />
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    list: {
        marginVertical: 20
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'center',
        resizeMode: 'contain'
    },
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: 150,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 10,
    },
    titleText: { 
        fontWeight: 'bold',
        fontSize: 17,
        marginBottom: 15
    },
    iconsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 10
    },
    icon: {
        color: '#004BA0'
    },
    updatedAtText: {
        fontSize: 12,
        color: '#757575',
        marginTop: 20
    },
    cardActionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    CardButton: {
        color: '#FFA726',
        marginTop: 20,
        fontSize: 15
    }
})