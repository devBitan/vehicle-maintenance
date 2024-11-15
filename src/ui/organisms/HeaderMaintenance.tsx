"use client"
import React, { useEffect } from "react";
import { IMetadataMaintenance, IResponseMaintenanceById } from "@/app/core/application/dto/maintenance/maintenance.dto";
import { useRouter, useSearchParams } from "next/navigation";
import PageNavigation from "../molecules/PageNavigation";
import TableMaintenance from "./TableMaintenance";
import SideBar from "../molecules/Sidebar";

interface IMaintenanceProps {
  pagination: IMetadataMaintenance,
  data: IResponseMaintenanceById
}

const HeaderMaintenance = () => {
 
  return (
    <>
        {/* Vehicle Info */}
        <section className="vehicleInfo">
          <div className="vehicleDetails">
            <img
              src="https://via.placeholder.com/150"
              alt="Toyota Corolla"
              className="vehicleImage"
            />
            <div className="details">
              <p>Año: <strong>2020</strong></p>
              <p>Marca: <strong>Toyota</strong></p>
              <p>Modelo: <strong>Corolla</strong></p>
              <p>Placa: <strong>ABC1234</strong></p>
            </div>
          </div>
          <button className="downloadButton">Descargar reporte</button>
        </section>
        {/* Actions */}
        <section className="actions">
          <button className="addButton">Agregar registro</button>
        </section>
      
    </>
  );
};

export default HeaderMaintenance;
