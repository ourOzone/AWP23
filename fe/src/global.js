import { createGlobalStyle } from 'styled-components';
import NanumSquareLight from './assets/fonts/NanumSquareNeo-aLt.ttf';
import NanumSquareRegular from './assets/fonts/NanumSquareNeo-bRg.ttf';
import NanumSquareBold from './assets/fonts/NanumSquareNeo-cBd.ttf';

export const daysKor = ['월', '화', '수', '목', '금', '토', '일'];
export const hours = ['09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
export const idx2hour = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00'];

export const getPublishDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
}

export default createGlobalStyle`
    @font-face {
        font-family: 'Light';
        src: local('NanumSquareLight'), local('NanumSquareLight');
        font-style: normal;
        src: url(${NanumSquareLight}) format('truetype');
    }
    @font-face {
        font-family: 'Regular';
        src: local('NanumSquareRegular'), local('NanumSquareRegular');
        font-style: normal;
        src: url(${NanumSquareRegular}) format('truetype');
    }
    @font-face {
        font-family: 'Bold';
        src: local('NanumSquareBold'), local('NanumSquareBold');
        font-style: normal;
        src: url(${NanumSquareBold}) format('truetype');
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-size: 16px;
        font-family: Regular;

        @media (max-width: 560px) {
            font-size: 12px;
        }
        
        @media (max-width: 380px) {
            font-size: 10px;
        }
    }
`;