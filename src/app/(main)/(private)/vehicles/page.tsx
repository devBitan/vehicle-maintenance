
import { IRequestgetlAllVehiclesPagination } from '@/app/core/application/dto/vehicles/vehicles.dto';
import { VehicleService } from '@/app/infraestructure/services/vehicles.service'; 
// import ProjectsTemplate from '@/ui/template/Projects/Projects';
import VehicleManagement from '@/ui/template/VehicleManagment';
import React from 'react'

interface IProps{
  searchParams: IRequestgetlAllVehiclesPagination
}

export const generateMetadata = async({searchParams}: IProps) =>{
    const page = searchParams.page ?? 1;
    return {
        title: `Projects List - Page ${page}`,
        description: `List of projects on page ${page}`,
        meta: [
            { name: 'description', content: `List of projects on page ${page}` },
            { property: 'og:title', content: `Projects List - Page ${page}` },
            { property: 'og:description', content: `List of projects on page ${page}` },
        ],
    }
  }

const projectService = new VehicleService();

export default async function ProjectPage({searchParams}: IProps){
    const page = searchParams.page ? parseInt(searchParams.page.toString()): 1;
    const data = await projectService.findAll({page, size:4});
    console.log(data);
    return (
        <VehicleManagement data={data} pagination={data.metadata}/>
    )
}