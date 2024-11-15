import { IRequestNewVehicle } from "@/app/core/application/dto/vehicles/vehicles.dto"; 
import { VehicleService } from "@/app/infraestructure/services/vehicles.service"; 
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const project = new VehicleService();
    try {
        const projectData: IRequestNewVehicle = await request.json();
        const res = await project.create(projectData);
        return NextResponse.json({status: 201, data: res})
    } catch (error) {
        return NextResponse.json({ status: 500, error: error});
    }
}