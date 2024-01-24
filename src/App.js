import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './styles.css'

import api from './services/api.js'

function App() {  

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({}); 

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };


  async function handleSearch() {
    // 35900279/json

    if(input === '') {
      alert('Preenche algum CEP!')
      return;
    } 

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");
    } catch {
        alert("Erro ao buscar")
        setInput("")
    }
  }

  return (
    

  //<script src="script.js"></script>
  //<script src="https://kit.fontawesome.com/998c60ef77.js" crossorigin="anonymous"></script>

    <div className="container">
      <h1 className="title">CEP Tracker</h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite seu cep..." value={input} onChange={(e) => setInput(e.target.value) } onKeyDown={handleKeyDown}/>



        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#FFF' />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'> 
        <h2>CEP: {cep.cep} </h2>

        <span>{cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
    </main>
      )}
      
      <input type="checkbox" class="checkbox" id="chk" />
    <label class="label" for="chk">
      <i class="fas fa-moon"></i>
      <i class="fas fa-sun"></i>
      <div class="ball"></div>
    </label>
    </div>
      

  );
}

export default App;
