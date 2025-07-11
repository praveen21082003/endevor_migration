
import './App.css';
import Button from './Components/Button';
import Container from './Components/Container';
import { useState } from 'react';

function App() {
  const [selectedAction, setSelectedAction] = useState('');

  return (
    <>
      <header className='heading'>
        <h1 className='heading_style'>zMigGIT</h1>
      </header>
      <div className='Btns_container'>
        <Button label="Endvor Extract" onClick={() => setSelectedAction('extract')} />
        <Button label="Load MongoDB" onClick={() => setSelectedAction('load')}/>
        <Button label="Transform Load to Git" onClick={() => setSelectedAction('transform')}/>
        <Button label="Validate & Report" onClick={() => setSelectedAction('validate')} />
      </div>
      <Container action = {selectedAction}/>

    </>

  );
}

export default App;
