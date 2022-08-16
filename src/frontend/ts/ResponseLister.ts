interface ResponseLister{

    handlerResponse(status: number, response: string);
    handlerResponseActualizar(status:number,response:string);
    handlerResponseEliminar(status:number,response:string);
    handlerResponseAgregar(status:number,response:string);

}