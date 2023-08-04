import styled from 'styled-components';

export const PageContainer=styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    align-items: center;
    background-color: #eadbcb;
`;

export const DogList=styled.div`
    display: flex;
    flex-direction: column;
    width: 620px;
    background: transparent;
`;

export const DogItem=styled.div`
    display: flex;
    height: 45px;
    padding: 0 15px;
    align-items: center;
    justify-content: space-between;
    background-color: #f4f2f3;
    &:nth-child(even){
        background-color: #c0a9bd;
    }
`
export const DogForm=styled(DogList)`
    flex-direction:row;
    margin: 50px 0;
    padding-top: 0;
    justify-content: space-between;
    align-items: center;
`;

export const Input=styled.input`
    width:130px;
    height:25px;
    padding-left: 10px;
`;
export const RadioInput=styled.input`
    width:15px;
    height:15px;
`;
export const Button=styled.button`
    width:130px;
    height:30px;
`;
export const Buttons=styled(DogForm)`
    margin: 30px 0;
    height: 40px;
`;

export const TabButtons=styled.button`
    display:flex;
    text-align:center;
    align-items:center;
    justify-content:center;
    height:100%;
    width:48%;
    border:1px solid black;
    color:black;
    font-size:20px;
    cursor: pointer;
    background-color:transparent;
    ${(props) => {
        if (props.name === props['data-active']){
            return `
              background-color:white  
            `;
        }
    }}
`;

export const ShelterForm=styled(DogForm)`
    flex-direction:column;
`;