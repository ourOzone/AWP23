import React from 'react';
import styled from 'styled-components';

const Title = () => {
    return (
        <Container>
            <H1>세마치 합주판</H1>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    margin: 64px 0 32px;
    @media (max-width: 560px) {
        margin: 32px 0px 16px;
    }
`;

const H1 = styled.h1`
    font-family: Bold;
    font-size: 250%;
    color: ${({ theme }) => theme.title};
    user-select: none;
`;

export default Title;