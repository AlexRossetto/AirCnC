import React, { useEffect, useState, useMemo } from 'react';
//Método de mudança entre rotas sem necessidade de eventos.
import { Link } from 'react-router-dom';
//Criação de comunicação ponta a ponta entre servidor e client
import socketio from 'socket.io-client';
import api from '../../services/api';
import './styles.css';

export default function Dashboard() {

    const [requests, setRequests] = useState([]);
    const [spots, setSpots] = useState([]);
    
    //Usuario se conecta a aplicação e pode receber / enviar informações em tempo real
    const user_id = localStorage.getItem('user');
    //useMemo memoriza o valor de uma variavel e só executa quando o valor da variável é alterada (Coloquei para executar 1 unica vez);
    const socket = useMemo(() => socketio('http://localhost:3030', {
        query: { user_id }
    }), [user_id]);

    async function handleAccept(id) {
        await api.post(`/bookings/${id}/approvals`);
        //Removendo solicitação da minha listagem de requisicoes
        setRequests(requests.filter(request => request._id !== id))
    }

    async function handleDecline(id) {
        await api.post(`/bookings/${id}/declinals`);
        //Removendo solicitação da minha listagem de requisicoes
        setRequests(requests.filter(request => request._id !== id))
    }

    
    useEffect(() => {
       
        //Recebendo informações do servidor;
        // socket.on('hello', data => {
        //     console.log(data);
        // })

        //Enviando informações para o servidor;
        // socket.emit('omni', 'Stack');

        socket.on('booking_request', data => {
            //Adicionando novas request na variavel sem sobreescrever oq já tem nela
            setRequests([...requests, data]);
        })

    }, [requests, socket])

    //Função que executa uma vez caso o colchete esteja vazio , caso tenha algum valor dentro é executada toda vez que o valor é atualizado.
    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: {user_id}
            });
            console.log(response.data);

            setSpots(response.data);
        }
        loadSpots();
    }, [])

    return (
        <>
        <ul className="notifications">
            {requests.map(request => (
                <li key={request._id}>
                    <p>
                        <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
                    </p>
                    <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
                    <button className="decline" onClick={() => handleDecline(request._id)}>REJEITAR</button>
                </li>
            ))}
        </ul>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}></header>
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `RS${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>
            <Link to="/new">
               <button className="btn">Cadastrar novo spot</button> 
            </Link>
        </>
    )
}