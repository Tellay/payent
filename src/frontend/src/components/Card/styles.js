import styled from 'styled-components';

export const Body = styled.div`
    max-width: 180px;
    border: 1px solid #EAEAEA;
    border-radius: 5px;
    transition: box-shadow 0.2s ease;
    cursor: pointer;

    &:hover {
        box-shadow: 0 0.5rem 1rem 0.5px #f2f2f2;
    }
`;

export const Image = styled.img`
    width:100%;
    height: 224px;
    border-bottom: 1px solid #EAEAEA;
    padding: 1rem;

    object-fit:cover;
    object-position:50% 50%;
`;

export const AlignCenter = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px 0.5rem;
    p {
        font-size: 14px;
        color: #333333;
        font-weight: 300;
        overflow: auto;
        max-height: 2rem;
        max-width: 100%;

        &::-webkit-scrollbar {
            opacity: 0;
        }
    }

    span {
        color: #333333;
        font-weight: bold;
        font-size: 24px;
    }

    > a {
        margin: 0.3rem 0;
        background: #3483fa;
        border: none;
        outline: none;
        color: white;
        font-weight: 600;
        padding: 0.5rem;
        border-radius: 3px;
        transition: border 0.1s ease;
        cursor: pointer;
        text-align: center;
        font-size: 13px;
        text-decoration: none;
        margin: 0.5rem 0;

        &:hover {
            background: #2968C8;
            box-shadow: inset;
        }

        &:focus {
            border: 3px solid #B5CDF2;
        }
    }
`;