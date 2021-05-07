import styled from 'styled-components';

export const Container = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;

    @media only screen and (max-width: 1240px) {
        display: flex;
        flex-direction: column;
        margin: -9rem;
        overflow: hidden;
        min-height: 100vh;
    }
`;

export const Image = styled.img`
    width: 500px;
    height: 100%;
    object-fit:cover;
    object-position: 50% 50%;
    padding: 1rem;
    
    @media only screen and (max-width: 1240px) {
        width: 300px;
        padding: inherit;
    }
`;

export const Details = styled.div`  
    display: flex;
    flex-direction: column;
    margin: 0 25rem;
    height: 100%;

    > h2 {
        font-size: 36px;
    }

    > p {
        font-size: 14px;
        max-width: 15rem;
        margin: 1rem 0;
    }

    span > h3 {
        font-size: 36px;
        font-weight: 100;
    }

    @media only screen and (max-width: 1240px) {
        margin: -15rem;
    }
`;

export const Buy = styled.button`
    cursor: pointer;
    border: none;
    outline: none;
    background: #3483fa;
    border-radius: 3px;
    color: white;
    font-weight: 600;
    padding: 0.8rem 5rem;
    transition: border 0.1s ease;
    margin: 1rem 0;
    /* box-shadow: 0 0 10px 2px #80b2ff; */

    @media only screen and (max-width: 1240px) {
        margin: unset;
    }

    &:hover {
        background: #2968C8;
        
    }

    &:focus {
        border: 3px solid #B5CDF2;
    }
`;

export const Left = styled.div`
    display: flex;
    min-height: 100vh;
    align-items: center;

    > div {
        height: 100vh;
        border-right: 1px solid #C4C4C4;

        @media only screen and (max-width: 1240px) {
            border-right: none;
        }
    }
`;

export const Header = styled.header`
    padding: 1rem 1rem;
    display: flex;
    justify-content: flex-end;
    box-shadow: 0 0 5px 2px #e8e8e8;

    > a {
        color: #6e6e6e;
        font-size: 14px;
        text-decoration: none;
        
        &:hover {
            text-decoration: underline;
        }
    }
`;