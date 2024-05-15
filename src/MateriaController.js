import LocalStorageController from "./LocalStorageController"

export default class MateriaController {

    constructor () {
        this.materiasArray = []
    }
    
    // static compareMateriaDataToToday(materia) {
    //     let today = new Date()
    // }

    populateMateriasArray() {
        this.materiasArray = LocalStorageController.getAllMaterias()
    }

    addMateria(materia) {
        this.materiasArray.push(materia)
        LocalStorageController.addMateria(materia)
    }




}