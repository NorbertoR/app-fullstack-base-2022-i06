declare const M;
class Main implements EventListenerObject, ResponseLister {
    public listaPersonas: Array<Persona> = new Array();
    public etidadesAcciones: Array<Acciones> = new Array();
    public nombre: string;
    public framework: FrameWork = new FrameWork();
    constructor() {
        
        this.framework.ejecutarRequest("GET", "http://localhost:8000/devices", this)
 
        this.listaPersonas.push(new Usuario("Juan", 12, "jPerez"));
        this.listaPersonas.push(new Administrador("Pedro", 35));
        this.listaPersonas.push(new Persona("S", 12));
        this.etidadesAcciones.push(new Usuario("Juan", 12, "jPerez"));
        this.etidadesAcciones.push(new Administrador("Juan", 12));

        
    }

    public handlerResponse(status: number, response: string) {
        if (status == 200) {
            let resputaString: string = response;
            let resputa: Array<Device> = JSON.parse(resputaString);
            let cajaDiv = document.getElementById("caja");


            let datosVisuale:string = `<ul class="collection">`
            for (let disp of resputa) {
                let estado=disp.state?"checked":"";
                
                datosVisuale += ` <li class="collection-item">`;
                datosVisuale+= '<i class="material-icons">memory</i>';
                datosVisuale += `<span class="title nombreDisp">${disp.name}</span> - ${disp.description}
                <div class="secondary-content">
                        <a href="#!"><i class="material-icons" id="del_${disp.id}">delete</i> </a>
                </div>

                <a href="#!" class="secondary-content">
                    <div class="switch">
                        <label>
                            Off
                            <input type="checkbox" id="cb_${disp.id}" ${estado} >
                            <span class="lever"></span>
                            On
                        </label>
                     </div>
                </a>
                </li>`

            }
            datosVisuale += `</ul>`

/*
                datosVisuale += ` <li class="collection-item">`;
                datosVisuale+= '<i class="material-icons">memory</i>';
                datosVisuale += `<span class="title nombreDisp">${disp.name}</span> - ${disp.description}
                <div class="secondary-content">
                        <a href="#!"><i class="material-icons" id="del_${disp.id}">delete</i> </a>
                </div>
                <div class="secondary-content">
                        <a href="#!"><i class="material-icons" id="edi_${disp.id}">edit</i> </a>
                </div>
                <a href="#!" class="secondary-content">
                    <div class="switch">
                        <label>
                            Off
                            <input type="checkbox" id="cb_${disp.id}" ${estado} >
                            <span class="lever"></span>
                            On
                        </label>
                     </div>
                </a>
                </li>`

            }
            datosVisuale += `</ul>`

*/

            cajaDiv.innerHTML = datosVisuale;

            for (let disp of resputa) {
                let checkbox = document.getElementById("cb_" + disp.id);
                checkbox.addEventListener("click",this)
                let botonBorrar = document.getElementById("del_" + disp.id);
                botonBorrar.addEventListener("click",this)
            }
        
          } else {
              alert("Algo salio mal")
          }
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
      
        if (e.type == "click" && objetoEvento.id.startsWith("cb_")) {

          //  console.log(objetoEvento.id,)
            console.log("Se hizo click para prender o apagar")
            let datos = { "id": objetoEvento.id.substring(3), "state": objetoEvento.checked };
            this.framework.ejecutarRequest("POST","http://localhost:8000/actualizar", this,datos)
            
        }else if (e.type == "click" && objetoEvento.id =="btnSaludar") {
            alert("Hola " +  this.listaPersonas[0].nombre +".");    

        }else if (e.type == "click" && objetoEvento.id =="btnNewDevice") {
            alert("Se va agregar un device nuevo.");    
        
        }
        else if (e.type == "click" && objetoEvento.id =="btnAddDevice") {
            console.log("Se hizo click para agregar un dispositivo")
            alert("Va...");    
        
        }else if (e.type == "click" && objetoEvento.id.startsWith("del_")) {
          console.log("Se hizo click para borrar")
          let datos = { "id": objetoEvento.id.substring(4) };
          this.framework.ejecutarRequest("DELETE","http://localhost:8000/eliminar", this,datos)

        }else {
            alert("se hizo doble click en el titulo")
        }
    }
}

window.addEventListener("load", () => {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems,"");

    let btn = document.getElementById("btnSaludar");
    let btnNew = document.getElementById("btnNewDevice");

    let main: Main = new Main();
    main.nombre = "Matias"

    btnNew.addEventListener("click", main);
    btn.addEventListener("click", main);

});







