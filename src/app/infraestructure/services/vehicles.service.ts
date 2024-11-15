import { IResponseGetlAllVehicles, IRequestgetlAllVehiclesPagination, IRequestNewVehicle, IResponseNewVehicle } from "@/app/core/application/dto/vehicles/vehicles.dto"; 
import { HttpClient } from "../utils/client-http";

export class VehicleService  {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient();
    }

    async findAll({page, size}:IRequestgetlAllVehiclesPagination){
        try {
            const vehicles = await this.httpClient.get<IResponseGetlAllVehicles>(`vehicles?page=${page}&size=${size}`);
            console.log(vehicles);
            return vehicles;
        } catch (error) {
            console.log(error);
            throw new Error("Error al obtener los proyectos");
        }
    }

    async create(project: IRequestNewVehicle){
        try {
            const newVehicles = await this.httpClient.post< IResponseNewVehicle, IRequestNewVehicle>(`vehicles`, project)
            return newVehicles;
        } catch (error) {
            console.log(error);
            throw new Error("Error al crear el proyecto");
        }
    }

    async update(id: number, project: IRequestNewVehicle){
        try {
            const updateDVehicles = await this.httpClient.patch<IResponseNewVehicle, IRequestNewVehicle>(`vehicles/${id}`, project)
            return updateDVehicles;
        } catch (error) {
            console.log(error);
            throw new Error("Error al actualizar el proyecto");
        }
    }

    async destroy(id: number){
        try {
            const project = await this.httpClient.delete(`vehicles/${id}`);
            return project;
        } catch (error) {
            console.log(error)
            throw new Error("Error al eliminar el proyecto");
        }
    }

}