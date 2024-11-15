"use client";
import React, { useEffect, useState } from "react";
import styles from "./VehicleManagment.module.scss";
import { IResponseGetlAllVehicles, IVehicle, Metadata } from "@/app/core/application/dto/vehicles/vehicles.dto";
import PageNavigation from "../molecules/PageNavigation";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import TableVehicle from "../organisms/TableVehicles";
import SideBar from "../molecules/Sidebar";
import HeaderVehicle from "../organisms/HeaderVehicle";
import Modal from "../molecules/Modal";

interface IVehicleProps{
    pagination: Metadata,
    data: IResponseGetlAllVehicles
  }

const VehicleManagement = ({data, pagination}: IVehicleProps) => {

    useEffect(()=>{
        console.log(data)
    }, [data])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<IVehicle | null>(null);

    const searchParams = useSearchParams();
  const router = useRouter();

  const handleNext = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString()); 
    if(nextPage <= pagination.totalPages){
      params.set('page', nextPage.toString());
      router.push(`?${params.toString()}`); 
    }
  };

  const handlePrevious = (backPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if(backPage > 0){
      params.set('page', backPage.toString());
      router.push(`?${params.toString()}`);
    }
  };

    // Abre el modal para agregar
    const handleOpenCreateModal = () => {
      setIsEditing(false); // Modo creación
      setSelectedVehicle(null); // Sin datos iniciales
      setIsModalOpen(true);
    };
  
    // Abre el modal para editar
    const handleOpenEditModal = (vehicle) => {
      setIsEditing(true); // Modo edición
      setSelectedVehicle(vehicle); // Carga los datos iniciales
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedVehicle(null);
    };
  
    const handleSubmit = (formData) => {
      if (isEditing) {
        console.log('Editar vehículo:', formData);
        // Lógica para editar vehículo
      } else {
        console.log('Agregar nuevo vehículo:', formData);
        // Lógica para crear vehículo
      }
      handleCloseModal();
    };

  const currentPage = pagination.currentPage;

  return (
    <div className={styles.container}>
      <SideBar/>

      {/* Main Content */}
      <main className={styles.mainContent}>

        <header>
          <h1>Gestión de vehículos</h1>
        </header>
        {/* Filters */}
        <section className={styles.filters}>
          <input type="text" placeholder="Placa" />
          <input type="text" placeholder="Año" />
          <input type="text" placeholder="Marca" />
          <input type="text" placeholder="Modelo" />
          <button className={styles.filterButton}>Filtrar</button>
          <button className={styles.clearButton}>Limpiar</button>
        </section>
        {/* Actions */}
        <HeaderVehicle onAddVehicle={handleOpenCreateModal}/>
        
        {/* Table */}
        <section className={styles.tableSection}>
            <TableVehicle data={data} onEditVehicle={handleOpenEditModal}/>
        </section>
        {/* Pagination */}
        <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        isEditing={isEditing}
        initialData={selectedVehicle}
      />
        <PageNavigation
         pagination={pagination}
         onNext={()=>handleNext(currentPage+1)}
         onPrevious={()=>handlePrevious(currentPage-1)}
        />

        {/* <section className={styles.pagination}>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
        </section> */}
      </main>
    </div>
  );
};

export default VehicleManagement;
