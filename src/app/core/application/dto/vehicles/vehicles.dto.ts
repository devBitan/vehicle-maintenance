export interface IResponseGetlAllVehicles {
    statusCode: number;
    message: string;
    data: IVehicle[];
    metadata: Metadata;
}

export interface IVehicle {
    id: number;
    make: string;
    model: string;
    year: number;
    licensePlate: string;
    photo: string;
}

export interface Metadata {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface IRequestgetlAllVehiclesPagination {
    page: number;
    size: number;
}

export interface IRequestNewVehicle {
    make: string;
    model: string;
    year: number;
    licensePlate: string;
    photo: string;
}

export interface IResponseNewVehicle {
    statusCode: number;
    message: string;
    data: IVehicle;
}