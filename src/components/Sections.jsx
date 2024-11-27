import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import loading from "../assets/load.gif";

export default function Sections() {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(
                    `https://mock-api.driven.com.br/api/v8/cineflex/movies/${movieId}/showtimes`
                );
                setMovieDetails(response.data);
            } catch (error) {
                console.error("Erro ao buscar detalhes do filme:", error.response.data);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

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
                <h1>Selecione o horário</h1>
            </Header>
            

            <ShowtimeWrapper>
                {movieDetails.days.map((day) => (
                    <Day key={day.id}>
                        <Date>{`${day.weekday} - ${day.date}`}</Date>

                        <Separator />

                        <Clock>
                            {day.showtimes.map((time) => (
                                <LinkButton
                                    to={`/assentos/${time.id}`}
                                    key={time.id}
                                >
                                    {time.name}
                                </LinkButton>
                            ))}
                        </Clock>
                    </Day>
                ))}
            </ShowtimeWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    background-color: #212226;
    min-height: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
`;

const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #212226;

`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h1 {
        font-size: 24px;
        color: #ffffff;
        font-weight: 400;
        font-family: "Sarala", sans-serif;
    }
`;


const ShowtimeWrapper = styled.div`
    
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 95%;
`;

const Day = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #2b2d36;
    border-radius: 8px;
    padding: 20px;
    width: 95%;
    max-width: 338px;
    max-height: 149px;
   
`;

const Date = styled.div`
    font-size: 20px;
    font-weight: 400;
    color: #ffffff;
    text-align: justify;
`;

const Clock = styled.div`
    display: flex;
    justify-content: center;
    gap: 25px;
`;

const LinkButton = styled(Link)`
    background-color: #2b2d36;
    border: 2px solid  #d57566;
    color: #d57566;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #d57566;
        color: #2b2d36;
    }
`;

const Separator = styled.div`
  width: 100%;
  height: 2px;
  background-color: #4e5a65;
  margin: 20px 0;
`;

