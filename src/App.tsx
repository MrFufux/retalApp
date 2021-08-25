import React, { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './state';
import { RootState } from './state/reducers';
import APIRequest from './Utilities/Endpoint';

interface bankResponse {
  type:string;
  amount:number;
}

interface bankDataStorage {
  type:string;
  payload:number;
}


function App() {
 
  const [dataStorage, setDataStorage] = useState([]);
  useEffect(()=>{
    localStorage.removeItem('dataStorage');
    setTimeout(() => {
      getDataStorage()
    }, 100);
  }, [])

  const getDataStorage = () => {
    setDataStorage(JSON.parse(localStorage.getItem('dataStorage') || "[]") || []);
  }

  const state = useSelector((state: RootState) => state.bank)
  const dispatch = useDispatch();
  const { depositMoney, withdrawMoney, bankrupt } = bindActionCreators(actionCreators, dispatch)

  useEffect(()=> {
     (async function() {
      const response = await APIRequest()
      const data = await response.json()
      // console.log(data);

      data.forEach((element: bankResponse) => {
        // console.log(element);
        if(element.type === "deposit"){
          depositMoney(element.amount)
        }
  
        if(element.type === "withdraw"){
          withdrawMoney(element.amount)
        }
      });
    })()
  }, []);


  useEffect(()=>{
    
  }, [])
  
  return (
    <div className="App">
      <h1>{state}</h1>
      <button onClick={() => {depositMoney(1000); getDataStorage()}}>Deposit</button>
      <button onClick={() => {withdrawMoney(1000); getDataStorage()}}>Withdraw</button>
      <button onClick={() => {bankrupt(); getDataStorage()}}>Bankrupt</button>

      <div className="History">
        <h1>History</h1>
        {dataStorage.map((element:bankDataStorage)=>{
         return <div>{element.type}:{element.payload}</div>
        })}
      </div>
    </div>
  );
}

export default App;
