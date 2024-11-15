export interface IResponseMaintenanceById {
    statusCode: number;
    message: string;
    data: IMaintenance[];
    metadata: IMetadataMaintenance;
}

export interface IMaintenance {
    id: number;
    type: string;
    date: string;
    mileage: number;
    notes: string;
}

export interface IMetadataMaintenance {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface IRequestgetByIdMaintenancePagination {
    page: number;
    size: number;
}  
export interface IRequestgetByIdVehicleMaintenance {
    page: number;
    size: number;
    id: number;
}  