"use client"
import React, { useEffect } from "react";
import { IMetadataMaintenance, IResponseMaintenanceById } from "@/app/core/application/dto/maintenance/maintenance.dto";
import { useRouter, useSearchParams } from "next/navigation";
import PageNavigation from "../molecules/PageNavigation";
import TableMaintenance from "../organisms/TableMaintenance";
import Link from "next/link";
import { signOut } from "next-auth/react";


const SideBar = () => {
//   useEffect(() => {
//     console.log(data)
//   }, [data])

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleLogout = () => {
    signOut();
    router.push("/");
};



  return (
    < >
      <aside className="sidebar">
        <h2 className="logo">Transport Solutions</h2>
        <nav>
          <ul>
            <Link href={`/vehicles`}>
            <li className="active">
              <i className="fas fa-car"></i> Vehículos
            </li>
            </Link>
            <Link href={`/`}>
            <li >
              <i className="fas fa-sign-out-alt"></i> Cerrar sesión
            </li>
            </Link>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default SideBar;
