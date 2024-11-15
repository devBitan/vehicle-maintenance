"use client"
import React, { useEffect } from "react";
import { IMetadataMaintenance, IResponseMaintenanceById } from "@/app/core/application/dto/maintenance/maintenance.dto";
import { useRouter, useSearchParams } from "next/navigation";
import PageNavigation from "../molecules/PageNavigation";
import TableMaintenance from "./TableMaintenance";
import SideBar from "../molecules/Sidebar";
import styles from "../template/VehicleManagment.module.scss";

interface IMaintenanceProps {
  onAddVehicle: () => void;
}

const HeaderVehicle = ({onAddVehicle}:IMaintenanceProps) => {
 
  return (
    <>
        <section className={styles.actions}>
          <button className={styles.addButton} onClick={onAddVehicle}>Agregar Vehículo</button>
          <button className={styles.downloadButton}>Descargar reporte</button>
        </section>
      
    </>
  );
};

export default HeaderVehicle;
