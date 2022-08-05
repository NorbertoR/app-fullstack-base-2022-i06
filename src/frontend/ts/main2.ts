//declare const M;
class Main2 implements EventListenerObject, ResponseLister {
    public listaPersonas: Array<Persona> = new Array();
    public etidadesAcciones: Array<Acciones> = new Array();
    public nombre: string;
    public framework: FrameWork = new FrameWork();
    constructor() {
    }

    public handlerResponse(status: number, response: string) {

    }

    handlerResponseActualizar(status: number, response: string) {
        if (status == 200) {
            alert("Se actualizo el handle correctamente")    
        } else {
            alert("Error")    
        }
    }

    handlerResponseEliminar(status: number, response: string) {
        if (status == 200) {
            alert("Se eliminó un dispositivo")    
        } else {
            alert("Error")    
        }
    }

    handlerResponseAgregar(status: number, response: string) {
        if (status == 200) {
            alert("Se agregó un nuevo dispositivo")    
        } else {
            alert("Error")    
        }
    }

    public handleEvent(e:Event): void {
        let objetoEvento = <HTMLInputElement>e.target;
      
        if (e.type == "click" && objetoEvento.id=="btnAddDevice") {
            console.log("Se hizo click para agregar un dispositivo")
            let txtid = document.getElementById("id_device") as HTMLInputElement;
            let txtna = document.getElementById("name_device") as HTMLInputElement;
            let txtde = document.getElementById("description_device") as HTMLInputElement;
            let txtst = document.getElementById("state_device") as HTMLInputElement;
            let txtty = document.getElementById("type_device") as HTMLInputElement;
            let datos = { "id": txtid.value, "name": txtna.value, "description": txtde.value, "state": txtst.value, "type": txtty.value };
            this.framework.ejecutarRequest("POST","http://localhost:8000/agregar", this, datos)
        } else {
            alert("se hizo doble click en el titulo")
        }
    }
}

window.addEventListener("load", () => {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems,"");

    let btnAddDev = document.getElementById("btnAddDevice");
    let main: Main2 = new Main2();

    main.nombre = "Matias"
    btnAddDev.addEventListener("click", main);
});







