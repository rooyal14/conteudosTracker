import Materia from './Materia.js';

export default class LocalStorageController {
    //Métodos da listaNomesDeMaterias
    static isListOfNamesValid() {        
        let lista = this.getListOfNames()
        return lista != null && lista != undefined
    }

    static getListOfNames() {
        return JSON.parse(localStorage.getItem('listaNomesDeMaterias'))
    }

    static addToListOfNames(name) {
        if(this.isListOfNamesValid()) {
            //atualiza listaNomesDeMaterias
            let listaNomesDeMaterias = this.getListOfNames()
            listaNomesDeMaterias.push(name)
            localStorage.setItem('listaNomesDeMaterias', JSON.stringify(listaNomesDeMaterias))
        } else if (!this.isListOfNamesValid()) {
            //cria listaNomesDeMaterias
            localStorage.setItem('listaNomesDeMaterias', JSON.stringify([name]))
        }
    }

    static removeFromListOfNames(name) {
        let listaNomesDeMaterias = this.getListOfNames()
        listaNomesDeMaterias.filter((x) => x != name);
        localStorage.setItem('listaNomesDeMaterias', JSON.stringify(listaNomesDeMaterias))
    }

    static updateInListOfNames(materia, nome_antigo) {
        let name_novo = materia.name_materia
        this.removeFromListOfNames(nome_antigo)
        this.addToListOfNames(name_novo)
    }



    //Métodos das Matérias
    static getMateria(nome) {
        let datas = JSON.parse(localStorage.getItem(nome))
        return new Materia(nome, datas)
    }

    static getAllMaterias() {
        let materiasArray = []
        if(this.isListOfNamesValid()){
            let listaNomesDeMaterias = this.getListOfNames()
            for (const name of listaNomesDeMaterias) {
                let materia = this.getMateria(name)
                materiasArray.push(materia)
            }
        }
        return materiasArray
    }    
    
    static addMateria(materia) {
        let name = materia.name_materia
        let datas = materia.datas_materia

        //cria ou altera key:value da materia
        localStorage.setItem(name, JSON.stringify(datas))
        
        this.addToListOfNames(name)
    }

    removeMateria(nome) {
        localStorage.removeItem(nome)
        
        this.removeFromListOfNames(nome)
    }

    updateDataMateria(materia) {
        let name = materia.name_materia
        let datas = materia.datas_materia

        localStorage.setItem(name, JSON.stringify(datas))
    }

    updateNomeMateria(materia, nome_antigo) {
        this.removeMateria(nome_antigo)
        this.addMateria(materia)
    }




}