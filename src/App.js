import './App.css';
import { db } from './firebase-config';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function App() {
  const [stringArr, setStringArr] = useState();
  const [copy, setCopy] = useState(false);
  const pricesCollection = collection(db, 'prices');

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(pricesCollection);
      const arr = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const arrString = JSON.stringify(arr);
      setStringArr(arrString);
    };

    getData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: 25 }}>
      <button style={{ backgroundColor: 'lightblue', width: '200px', border: '1px solid black', height: '30px' }}>
        <CopyToClipboard
          text={stringArr}
          onCopy={() => setCopy(true)}
        >
          {copy ? <p style={{margin:0, color: 'white'}}>Copied</p> : <p style={{margin:0}}>Copy to clipboard</p>}
        </CopyToClipboard>
      </button>
      {stringArr}
    </div>
  );
}

export default App;
