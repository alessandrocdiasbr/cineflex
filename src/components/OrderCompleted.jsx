import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";


export default function OrderCompleted() {
    const navigate = useNavigate();
    const location = useLocation();
    

    const { movie, session, seats, buyer } = location.state || {};

    return (
        <Wrapper>
            <Header>
                <h1>Pedido finalizado!</h1>
            </Header>

            <Resume>
             
                <Section>
                    <h2>Filme e Sessão</h2>
                    <Separator />
                    <p><strong>Filme:</strong> {movie?.title}</p>
                    <p><strong>Horário:</strong> {session?.time}</p>
                </Section>

           
                <Section>
                    <h2>Ingressos</h2>
                    <Separator />
                    {seats?.map((seat, index) => (
                        <p key={index}>Assento {seat}</p>
                    ))}
                </Section>

            
                <Section>
                    <h2>Comprador(a)</h2>
                    <Separator />
                    <p><strong>Nome:</strong> {buyer?.name}</p>
                    <p><strong>CPF:</strong> {buyer?.cpf}</p>
                </Section>

              
                
            </Resume>

            <Button onClick={() => navigate("/")}>Voltar para a Tela Inicial</Button>
        </Wrapper>
    );
}


const Wrapper = styled.div`
    background-color: #212226;
    color: #ffffff;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 20px;

    h1 {
        font-size: 24px;
        color: #9db899;
        font-family: "Sarala", sans-serif;
    }
`;

const Resume = styled.div`
background: #2b2d36;
    width: 95%;
    max-width: 421px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 8px;
`;

const Section = styled.div`
    padding: 15px;
    border-radius: 8px;

    h2 {
        font-size: 22px;
        color: #ee897f;
        margin-bottom: 10px;
        font-weight: 700;
        font-family: "Sarala", sans-serif;
    }

    p {
        font-size: 20px;
        font-weight: 400;
        margin: 5px 0;
        font-family: "Sarala", sans-serif;
    }
`;

const Button = styled.button`
width: 95%;
max-width: 421px;
height: 42px;
    background-color: #ee897f;
    color: #000;
    font-weight: 700;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 18px;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
        background-color: #000;
        color: #ee897f;
    }
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #4e5a65;
  margin: 20px 0;
`;