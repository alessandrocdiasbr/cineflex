import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import loading from "../assets/load.gif";
import { Link } from "react-router-dom";


export default function Poster() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies");
                setImages(response.data);
            } catch (error) {
                console.log(error.response.data);
            }
        };
        fetchData();
    }, []);

   
    if (images.length === 0) {
        return (
            <LoadingWrapper>
                <img src={loading} alt="Carregando" />
            </LoadingWrapper>
        );
    }


    return (
        <Wrapper>
            <Films>
                <h1>Em Cartaz</h1>
                <FilmGrid>
                    {images.map((img) => (
                        <Film to={`/sessoes/${img.id}`} key={img.id}>
                            <img src={img.posterURL} alt={img.title} />
                        </Film>
                    ))}
                </FilmGrid>
            </Films>
        </Wrapper>
    );
}

const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #212226;
`;

const Wrapper = styled.div`
    background-color: #212226;
    min-height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
`;

const Films = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h1 {
        font-size: 24px;
        color: #ffffff;
        text-align: center;
        font-weight: 400;
        margin: 20px 0;
        font-family: "Sarala", sans-serif;
    }
`;

const FilmGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
`;

const Film = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
    padding: 10px;
    width: 145px;
    height: 210px;

    img {
        width: 100%;
        border-radius: 8px;
    }
`;
