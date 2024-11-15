"use client"
import React from "react";
import styles from "./LoginForm.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILoginRequest } from "@/app/core/application/dto/auth/login-request.dto";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ErrorResponse, FieldError } from "@/app/core/application/dto/common/error-response.dto";
import { signIn } from "next-auth/react";
import { FormField } from "../molecules/FormField";
import Link from "next/link";

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("El correo es inválido")
        .required("El correo el obligatorio"),
    password: yup
        .string()
        .min(8, "La contraseña debe tener  al menos 8  caracteres")
        .required("La contraseña es obligatoria"),
});

const LoginForm = () => {

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<ILoginRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(loginSchema),
    });

    const router = useRouter()
    const handleLogin = async (data: ILoginRequest) => {
        console.log(data);
        //SERVICE LOGIN
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            console.log(result);

            if (result?.error) {
                console.log("Ocurrio un error", JSON.parse(result.error));
                handleError(JSON.parse(result.error))
                return;
            }
              router.push("/vehicles")
        } catch (error) {
            console.log(error);
        }
    };

    const handleError = (error: unknown) => {
        const erroData = error as ErrorResponse;
        if (erroData && erroData.errors) {
            if (Array.isArray(erroData.errors) && "field" in erroData.errors[0]) {
                erroData.errors.forEach((fieldError) => {
                    const { field, error } = fieldError as FieldError;
                    setError(field as keyof ILoginRequest, {
                        message: error,
                    });
                });
            } else {
                if ("message" in erroData.errors[0]) {
                    setError("email", {
                        message: erroData.errors[0].message,
                    });
                }
            }
        }
    };

    return (
        <section className={styles.container}>

            <form
                className={styles.form}
                onSubmit={handleSubmit(handleLogin)}
            >
                <div className={styles.header}>
                    <i className="fas fa-car"></i>
                    <h2>Transport Solutions S.A</h2>
                </div>

                <h2 className={styles.p}>Ingresa tus credenciales para acceder a tu cuenta</h2>

                <FormField<ILoginRequest>
                    control={control}
                    type="email"
                    label="Correo Electrónico"
                    name="email"
                    error={errors.email}
                    placeholder="Ingresa tu correo"
                />

                <FormField<ILoginRequest>
                    control={control}
                    type="password"
                    label="Contraseña"
                    name="password"
                    error={errors.password}
                    placeholder="Ingresa tu contraseña"
                />
                <button
                    type="submit"
                    className={styles.button}
                >
                    Iniciar Sesión
                </button>
                <p className={styles.footer}>
                    ¿Problemas para iniciar sesión? <br />
                    <a href="#">Contacta al administrador del sistema</a>
                </p>

            </form>
        </section>
    );
};

export default LoginForm;
