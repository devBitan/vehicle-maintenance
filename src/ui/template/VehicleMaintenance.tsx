"use client"
import React, { useEffect } from "react";
import { IMetadataMaintenance, IResponseMaintenanceById } from "@/app/core/application/dto/maintenance/maintenance.dto";
import { useRouter, useSearchParams } from "next/navigation";
import PageNavigation from "../molecules/PageNavigation";
import TableMaintenance from "../organisms/TableMaintenance";
import SideBar from "../molecules/Sidebar";

interface IMaintenanceProps {
  pagination: IMetadataMaintenance,
  data: IResponseMaintenanceById
}

const VehicleMaintenance = ({ data, pagination }: IMaintenanceProps) => {
  useEffect(() => {
    console.log(data)
  }, [data])

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleNext = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextPage <= pagination.totalPages) {
      params.set('page', nextPage.toString());
      router.push(`?${params.toString()}`);
    }
  };

  const handlePrevious = (backPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (backPage > 0) {
      params.set('page', backPage.toString());
      router.push(`?${params.toString()}`);
    }
  };

  const currentPage = pagination.currentPage;

  return (
    <div className="container">
      <SideBar/>
      {/* Main Content */}
      <main className="mainContent">
        <header className="header">
          <h1>Mantenimientos del vehículo</h1>
        </header>

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

        {/* Maintenance Table */}
        <section className="tableSection">
          <TableMaintenance data={data} />

        </section>

        {/* Pagination */}
        <PageNavigation
          pagination={pagination}
          onNext={() => handleNext(currentPage + 1)}
          onPrevious={() => handlePrevious(currentPage - 1)}

        />
        {/* <section className="pagination">
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
        </section> */}
      </main>
    </div>
  );
};

export default VehicleMaintenance;
