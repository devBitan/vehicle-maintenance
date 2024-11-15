"use client";

// import { Datum, IAllProjectsResponse } from "@/app/core/application/dto";
// import { EndpointProjects } from "@/app/core/application/dto/model/projects.enum";
// import TableRow from "@/ui/molecules/TableRows/TableDataRow/TableDataRow";
// import TableHeaderRow from "@/ui/molecules/TableRows/TableHeadRow/TableHeaderRow";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
// import styles from "./TableProject.module.scss"
// import Modal from "../Modal/Modal";
import { Input } from "../atoms/Input";
import { IResponseGetlAllVehicles, IVehicle } from "@/app/core/application/dto/vehicles/vehicles.dto";
import Link from "next/link";

interface ITableProps {
    data: IResponseGetlAllVehicles;
    onEditVehicle: (vehicle: IVehicle) => void;
}

interface ISearchResponse {
    statusCode: number;
    message: string;
    data: IVehicle[];
    metadata: {
        totalPages: number;
        currentPage: number;
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
    };
}

const TableVehicle = ({ data, onEditVehicle }: ITableProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<IVehicle | null>(null);
    const [filteredData, setFilteredData] = useState<IVehicle[]>(data.data);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const router = useRouter();

    // // Función para obtener todos los proyectos de todas las páginas
    // const fetchAllPages = async (searchTerm: string): Promise<Datum[]> => {
    //     const allProjects: IVehicle[] = [];
    //     let currentPage = 1;
    //     let totalPages = 1;

    //     do {
    //         try {
    //             const response = await fetch(`/api/vehicles/findAll?page=${currentPage}`);
    //             if (!response.ok) {
    //                 throw new Error('Error al obtener los proyectos');
    //             }

    //             const result: ISearchResponse = await response.json();
    //             allProjects.push(...result.data);
    //             totalPages = result.metadata.totalPages;
    //             currentPage++;
    //         } catch (error) {
    //             console.error("Error fetching page", currentPage, error);
    //             break;
    //         }
    //     } while (currentPage <= totalPages);

    //     // Aplicar el filtro de búsqueda a todos los proyectos recolectados
    //     if (searchTerm.trim()) {
    //         const searchTerms = searchTerm.toLowerCase().split(' ');
    //         return allProjects.filter((project) => {
    //             const startDateStr = new Date(project.startDate).toLocaleDateString();
    //             const endDateStr = new Date(project.endDate).toLocaleDateString();

    //             const projectData = {
    //                 title: project.title.toLowerCase(),
    //                 description: project.description.toLowerCase(),
    //                 organizer: project.organizer.name.toLowerCase(),
    //                 startDate: startDateStr,
    //                 endDate: endDateStr,
    //                 status: project.isActive ? 'activo' : 'inactivo'
    //             };

    //             return searchTerms.every(term =>
    //                 Object.values(projectData).some(value =>
    //                     value.includes(term)
    //                 )
    //             );
    //         });
    //     }

    //     return allProjects;
    // };

    // Función de búsqueda global
    // const handleSearch = useCallback(async (query: string) => {
    //     setIsSearching(true);

    //     try {
    //         if (!query.trim()) {
    //             setFilteredData(data.data);
    //             return;
    //         }

    //         const results = await fetchAllPages(query);
    //         setFilteredData(results);
    //     } catch (error) {
    //         console.error("Error en la búsqueda:", error);
    //         alert("Hubo un error al realizar la búsqueda. Por favor, intente nuevamente.");
    //     } finally {
    //         setIsSearching(false);
    //     }
    // }, [allData.data]);

    // // Efecto para el debounce de la búsqueda
    // useEffect(() => {
    //     const timeoutId = setTimeout(() => {
    //         handleSearch(searchQuery);
    //     }, 500); // Aumentado a 500ms para reducir las llamadas durante la escritura

    //     return () => clearTimeout(timeoutId);
    // }, [searchQuery, handleSearch]);

    // const handleDelete = async (id: number) => {
    //     const isConfirmed = window.confirm("¿Estás seguro que deseas borrar el proyecto?");
    //     if (!isConfirmed) return;

    //     try {
    //         const res = await fetch(`${EndpointProjects.DELETE_PROJECT.replace(":id", id.toString())}`, {
    //             method: "DELETE",
    //         });

    //         if (!res.ok) {
    //             throw new Error("Error borrando el proyecto");
    //         }

    //         setFilteredData(prevData => prevData.filter(project => project.id !== id));
    //         router.refresh();
    //     } catch (error) {
    //         console.error("Error al eliminar el proyecto:", error);
    //         alert("Hubo un error al eliminar el proyecto. Por favor, intente nuevamente.");
    //     }
    // };

    // const handleEdit = (project: Datum) => {
    //     setSelectedProject(project);
    //     setIsModalOpen(true);
    // };

    // const handleCloseModal = () => {
    //     setIsModalOpen(false);
    //     setSelectedProject(null);
    // };

    return (
        <div className="space-y-4">
            <table>
                <thead>
                    <tr>
                        <th>Foto</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Año</th>
                        <th>Placa</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.data.map((vehicle, index) => (

                        <tr
                            key={index}>
                            <td>
                                <Link href={`/maintenance/${vehicle.id}`}>
                                <img
                                    src={vehicle.photo}
                                    alt="Vehicle"
                                />
                                </Link>
                            </td>
                            <td>{vehicle.make}</td>
                            <td>{vehicle.model}</td>
                            <td>{vehicle.year}</td>
                            <td>{vehicle.licensePlate}</td>
                            <td>
                                <button onClick={() => onEditVehicle(vehicle)}>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                project={selectedProject}
            /> */}
        </div>
    );
}

export default TableVehicle;