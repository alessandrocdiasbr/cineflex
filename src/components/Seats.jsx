import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import loading from "../assets/load.gif";

export default function Seats() {
    const { idSession } = useParams();
    const navigate = useNavigate();
    const [seats, setSeats] = useState([]); 
    const [movieDetails, setMovieDetails] = useState({}); 
    const [selectedSeats, setSelectedSeats] = useState([]); 
    const [name, setName] = useState(""); 
    const [cpf, setCpf] = useState(""); 

    
    useEffect(() => {
        fetchSeats();
    }, [idSession]);

    const fetchSeats = async () => {
        try {
            const response = await axios.get(
                `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSession}/seats?timestamp=${Date.now()}`
            );
            console.log("Assentos carregados:", response.data);
            setSeats(response.data.seats);
            setMovieDetails({
                title: response.data.movie.title,
                date: response.data.day.date,
                time: response.data.name,
            });
        } catch (error) {
            console.error("Erro ao buscar assentos:", error.response?.data || error.message);
            alert("Erro ao carregar os assentos. Tente novamente mais tarde.");
        }
    };


    const toggleSeat = (seatId, isAvailable) => {
        if (!isAvailable) {
            alert("Este assento já está reservado.");
            return;
        }

        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };


    const submitForm = async (event) => {
        event.preventDefault();

        if (selectedSeats.length === 0) {
            alert("Por favor, selecione ao menos um assento.");
            return;
        }

        const body = {
            ids: selectedSeats,
            name,
            cpf,
        };

        try {
            await axios.post(
                "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many",
                body
            );
            alert("Reserva concluída com sucesso!");
         
            setSelectedSeats([]);
            await fetchSeats();
            navigate("/sucesso", {
                state: {
                    movie: movieDetails,
                    session: movieDetails.time,
                    seats: seats
                    .filter((seat) => selectedSeats.includes(seat.id))
                    .map((seat) => seat.name), 
                    buyer: { name, cpf },
                },
            });
        } catch (error) {
            console.error("Erro ao reservar assentos:", error.response?.data || error.message);
            alert("Falha ao reservar assentos. Tente novamente.");
        }
    };

    if (!movieDetails) {
        return (
            <LoadingWrapper>
                <img src={loading} alt="Carregando" />
            </LoadingWrapper>
        );
    }

    return (
        <Wrapper>
            <Header>
                <h1>Selecione o(s) assento(s)</h1>
            </Header>
            <SeatsGrid>
                {seats.map((seat) => (
                    <Seat
                        key={seat.id}
                        $isAvailable={seat.isAvailable}
                        $isSelected={selectedSeats.includes(seat.id)}
                        onClick={() => toggleSeat(seat.id, seat.isAvailable)}
                    >
                        {seat.name}
                    </Seat>
                ))}
            </SeatsGrid>

            <Separator />

            <FormContainer>
                <form onSubmit={submitForm}>
                    <InputGroup>
                        <label htmlFor="name">Nome do Comprador(a)</label>
                        <input
                            id="name"
                            type="text"
                            required
                            value={name}
                            placeholder="Digite seu nome..."
                            onChange={(e) => setName(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup>
                        <label htmlFor="cpf">CPF do Comprador(a)</label>
                        <input
                            id="cpf"
                            type="text"
                            required
                            value={cpf}
                            placeholder="Digite seu CPF..."
                            onChange={(e) => setCpf(e.target.value)}
                        />
                    </InputGroup>
                    <SubmitButton type="submit">Reservar assento(s)</SubmitButton>
                </form>
            </FormContainer>
        </Wrapper>
    );
}


const Wrapper = styled.div`
    background-color: #212226;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;
`;

const Header = styled.div`
    margin-bottom: 20px;

    h1 {
        font-size: 24px;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        font-family: "Sarala", sans-serif;
    }
`;

const SeatsGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
`;

const Seat = styled.button`
    width: 26px;
    height: 26px;
    background-color: ${(props) =>
        props.$isAvailable
            ? props.$isSelected
                ? "#fadbc5"
                : "#9db899"
            : "#2b2d36"};
    color: ${(props) => (props.$isAvailable ? "#000" : "#2b2d36")};
    border: ${(props) => (props.$isSelected ? "2px solid #ee897f" : "none")};
    border-radius: 50%;
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ${(props) => (props.$isAvailable ? "pointer" : "not-allowed")};
    transition: background-color 0.3s, border 0.3s;

    &:hover {
        background-color: ${(props) =>
            props.$isAvailable && !props.$isSelected ? "#b2c7a1" : ""};
    }
`;

const FormContainer = styled.div`
    width: 100%;
    max-width: 400px;
`;

const InputGroup = styled.div`
    margin-bottom: 36px;

    label {
        font-size: 16px;
        color: #ffffff;
        display: block;
        margin-bottom: 8px;
        font-family: "Sarala", sans-serif;
    }

    input {
        width: 95%;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid #d4d4d4;
        font-size: 16px;
        font-style: italic;
         font-family: "Sarala", sans-serif;
    }
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 10px;
    margin-top: 26px;
    background-color: #ee897f;
    color: #000;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.3s;
     font-family: "Sarala", sans-serif;

    &:hover {
        background-color: #d57566;
    }
`;

const Separator = styled.div`
    width: 100%;
    height: 2px;
    background-color: #4e5a65;
    margin: 20px 0;
`;
const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #212226;

   
`;
