import logo from './logo.svg';
import './App.css';
import DateManipulation from './DateManipulation.js';
import MateriaController from './MateriaController';
import { useEffect, useState } from 'react';
import Materia from './Materia.js';

const materiaController = new MateriaController();
//TODO: (done)Popular materiaController array ao renderizar página
//      Programar o display automático das matérias e datas ao renderizar
//      Realizar as comparações com o dia atual ao renderizar
//      Possibilitar apagar ou editar

function App() {
  const [isRegistring, setIsRegisting] = useState(true);

  useEffect(() => {
    materiaController.populateMateriasArray()
    console.log(materiaController.materiasArray)
    
  }, [isRegistring, setIsRegisting]);



  function handleDelete() {
    localStorage.clear();
  }
  
  function handleSubmit(e) {
    const form = e.target;
    let materia = getDataFromForm(form);
    materiaController.addMateria(materia)
    setIsRegisting(false)
  }

  function openForm() {
    setIsRegisting(true)
  }

  function getDataFromForm(form) {
    const formData = new FormData(form);
    let name_materia = formData.getAll('name_materia')[0]
    let datas_materia = formData.getAll('data_materia')
    let materia = new Materia(name_materia, datas_materia)
    return materia
  }

  

  return (
    <div className="App">
      <header className="header">
        <img className='logo_header' src={logo} alt="Logo Materias Tracker"/>
        <h1 className='title_header'>Materias Tracker</h1>
      </header>
      {isRegistring ? <FormInputMateria handleSubmit={handleSubmit} />
      : <NoFormPage openForm={openForm}/> }
      <br />
      <button type="button" onClick={handleDelete}>Limpar local storage</button>
    </div>
  );
}

function FormInputMateria({handleSubmit}) {
  return (
      <form className='form_materia' onSubmit={handleSubmit}>
        <input type="text" className='name_materia' id="name_materia" name="name_materia" placeholder='Insira o nome da matéria'/><br />
        <div className="data_materia_container">
          <input type="date" className='data_materia' id="data_materia_1" name="data_materia" />
          <input type="date" className='data_materia' id="data_materia_2" name="data_materia" />
          
        </div><br />
        <input type="submit" className='submit_materia' value="Confirmar" />
      </form>
  );
}

function NoFormPage ({openForm}) {
  return(
    <input className='btn_open_form_materia' onClick={openForm} type="button" value="Inserir matéria" />
  )
}

export default App;