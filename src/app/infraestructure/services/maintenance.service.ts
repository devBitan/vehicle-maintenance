import { IResponseMaintenanceById, IRequestgetByIdMaintenancePagination, IRequestgetByIdVehicleMaintenance } from "@/app/core/application/dto/maintenance/maintenance.dto";
import { HttpClient } from "../utils/client-http";

export class MaintenanceService  {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient();
    }

    async findAll({page, size}:IRequestgetByIdMaintenancePagination){
        try {
            const maintenance = await this.httpClient.get<IResponseMaintenanceById>(`maintenance?page=${page}&size=${size}`);
            console.log(maintenance);
            return maintenance;
        } catch (error) {
            console.log(error);
            throw new Error("Error al obtener los proyectos");
        }
    }

    async findById({id, page, size}:IRequestgetByIdVehicleMaintenance){
        try {
            const maintenance = await this.httpClient.get<IResponseMaintenanceById>(`vehicles/${id}/maintenance?page=${page}&size=${size}`);
            console.log(maintenance);
            return maintenance;
        } catch (error) {
            console.log(error);
            throw new Error("Error al obtener los proyectos");
        }
    }

    // async create(project: IProjectRequest){
    //     try {
    //         const newProject = await this.httpClient.post< IProjectResponse, IProjectRequest>(`projects`, project)
    //         return newProject;
    //     } catch (error) {
    //         console.log(error);
    //         throw new Error("Error al crear el proyecto");
    //     }
    // }

    // async update(id: number, project: IProjectRequest){
    //     try {
    //         const updatedProject = await this.httpClient.patch<IProjectResponse, IProjectRequest>(`projects/${id}`, project)
    //         return updatedProject;
    //     } catch (error) {
    //         console.log(error);
    //         throw new Error("Error al actualizar el proyecto");
    //     }
    // }

    // async destroy(id: number){
    //     try {
    //         const project = await this.httpClient.delete(`projects/${id}`);
    //         return project;
    //     } catch (error) {
    //         console.log(error)
    //         throw new Error("Error al eliminar el proyecto");
    //     }
    // }

}