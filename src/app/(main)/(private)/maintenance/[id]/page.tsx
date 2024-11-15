
import { IRequestgetByIdMaintenancePagination } from '@/app/core/application/dto/maintenance/maintenance.dto';
import { MaintenanceService } from '@/app/infraestructure/services/maintenance.service'; 
import VehicleMaintenance from '@/ui/template/VehicleMaintenance';
// import ProjectsTemplate from '@/ui/template/Projects/Projects';
import React from 'react'

interface IProps{
  searchParams: IRequestgetByIdMaintenancePagination
  params: { id: string }; // Aquí definimos el parámetro dinámico `id`
}

export const generateMetadata = async({searchParams, params}: IProps) =>{
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

const projectService = new MaintenanceService();

// export default async function ProjectPage({searchParams}: IProps){
//     const page = searchParams.page ? parseInt(searchParams.page.toString()): 1;
//     const id = 1
//     const data = await projectService.findById({id,page, size:4});
//     console.log(data);
//     return (
//         // <ProjectsTemplate data={data} pagination={data.metadata}/>
//         <VehicleMaintenance data={data} pagination={data.metadata}/>
//     )
// }

export default async function ProjectPage({ searchParams, params }: IProps) {
    const page = searchParams.page ? parseInt(searchParams.page.toString()) : 1;

    // Tomamos el id dinámico desde los params
    const id = parseInt(params.id);
    console.log("el id es", id)

    // Obtenemos los datos basados en el id y la página
    const data = await projectService.findById({ id, page, size: 4 });

    console.log('Data obtenida:', data);

    return (
        <VehicleMaintenance data={data} pagination={data.metadata} />
    );
}