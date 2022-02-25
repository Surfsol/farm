import './App.css';
import {db} from './firebase-config'
import { useEffect, useState } from 'react';
import {collection, getDocs} from "firebase/firestore"

function App() {
  const [prices, setPrices] = useState()
  const pricesCollection = collection(db, 'prices')
 
  useEffect(() => {
    const getData = async() => {
      const data = await getDocs(pricesCollection)
      console.log({data})
      setPrices(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
    }

    getData()
  },[])
  console.log(prices[0])
  return (
    <div className="App">
      {prices && prices.map(item => {
        return <div>comment:{item.comment}</div>
      })}
    </div>
  );
}

export default App;
