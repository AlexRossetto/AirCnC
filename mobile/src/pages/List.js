import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, ScrollView, Image, AsyncStorage, StyleSheet, Alert } from 'react-native';
import socketio from 'socket.io-client';
import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List() {
    const [techs, setTechs] = useState([]);

    //Fazendo a notificação de resposta da web
    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.1.2:3333', {
                query: { user_id }
            })
            socket.on('booking_response', booking => {
                console.log("Ta chegando aqui esse caralho??")
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
            })
        });
    }, [])


    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, []);
    return (
    <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={logo}/>
        <ScrollView>
            {techs.map(tech => 
                <SpotList key={tech} tech={tech}/>
            )}
        </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        height: 60,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 30

    }
})