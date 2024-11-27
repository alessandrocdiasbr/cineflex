import styled from "styled-components";
import logo from "../assets/film.png";


export default function Navbar() {
    return (
        <Container>
            <Header>
                <img src={logo} />
                <h1 style={{fontFamily: "Raleway"}}>CineFlex</h1>
            </Header>
        
        </Container>
    )
}

const Container = styled.div`
height: 67px;
width: 100%;
background-color: #ee897f;
color: #fadbc5;
display: flex;
justify-content: center;
`

const Header = styled.div`
display: flex;
align-items: center;
gap: 10px;
img {
    height: 40px;
    width: 40px;
}
h1 {
    color:#fadbc5;
    font-size: 34px;
    font-weight: 600px;
    font-family: "Raleway", sans-serif;
}
`

