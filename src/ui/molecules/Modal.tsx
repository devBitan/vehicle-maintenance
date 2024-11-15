import { IVehicle } from '@/app/core/application/dto/vehicles/vehicles.dto';
import React, { useState, useEffect } from 'react';
import { VehicleService } from '@/app/infraestructure/services/vehicles.service';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: IVehicle) => void; // Cambiado para aceptar el tipo IVehicle completo
  isEditing: boolean; // Prop para saber si es edición o creación
  initialData?: IVehicle; // Datos iniciales si se edita
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, isEditing, initialData }) => {
  // Estado para manejar los datos del formulario

  const vehicleService = new VehicleService();

  const [formData, setFormData] = useState<IVehicle>({
    make: '',
    model: '',
    year: '',
    licensePlate: '',
    photo: '',
  });

  // Cargar datos iniciales en modo edición
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        make: '',
        model: '',
        year: '',
        licensePlate: '',
        photo: '',
      });
    }
  }, [initialData]);

  if (!isOpen) return null; // No renderiza si el modal no está abierto

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = () => {
  //   onSubmit(formData); // Envía los datos al padre
  //   onClose(); // Cierra el modal tras enviar
  // };
  // const handleSubmit = async () => {
  //   try {
  //     if (isEditing && initialData?.id) {
  //       // Llamar al servicio para actualizar un vehículo
  //       const updatedVehicle = await vehicleService.update(initialData.id, formData);
  //       console.log("Vehículo actualizado:", updatedVehicle);
  //     } else {
  //       // Llamar al servicio para crear un nuevo vehículo
  //       const newVehicle = await vehicleService.create(formData);
  //       console.log("Vehículo creado:", newVehicle);
  //     }

  //     onClose(); // Cierra el modal tras enviar
  //   } catch (error) {
  //     console.error("Error al procesar la solicitud:", error);
  //   }
  // };

  const handleSubmit = async () => {
    try {
      const payload = {
        make: formData.make,
        model: formData.model,
        year: parseInt(formData.year, 10), // Convertir a número
        licensePlate: formData.licensePlate,
        photo: formData.photo,
      };

      if (isEditing && initialData?.id) {
        // Llamar al servicio para actualizar un vehículo
        const updatedVehicle = await vehicleService.update(initialData.id, payload);
        console.log("Vehículo actualizado:", updatedVehicle);
      } else {
        // Llamar al servicio para crear un nuevo vehículo
        const newVehicle = await vehicleService.create(payload);
        console.log("Vehículo creado:", newVehicle);
      }

      onClose(); // Cierra el modal tras enviar
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>{isEditing ? "Editar vehículo" : "Agregar nuevo vehículo"}</h2>
        <div className="modal-body">
          <div className="form-group">
            <label>Marca</label>
            <input
              type="text"
              name="make"
              value={formData.make}
              onChange={handleChange}
              placeholder="Ingresa la marca"
            />
          </div>
          <div className="form-group">
            <label>Modelo</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="Ingresa el modelo"
            />
          </div>
          <div className="form-group">
            <label>Año</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Ingresa el año"
            />
          </div>
          <div className="form-group">
            <label>Placa</label>
            <input
              type="text"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleChange}
              placeholder="Ingresa la placa"
            />
          </div>
          <div className="form-group">
            <label>Foto (URL)</label>
            <input
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              placeholder="Ingresa la URL de la foto"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-submit" onClick={handleSubmit}>
            {isEditing ? "Guardar cambios" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
