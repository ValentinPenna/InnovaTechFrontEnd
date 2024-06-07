import { LoginProps, LoginErrorProps, RegisterProps, RegisterErrorProps } from "@/interfaces/types";

export function validateLogin({ email, password }: LoginProps) {
    let errors: LoginErrorProps = {};

    if(!email) {
        errors.email = "El email es requerido";
    } else if(!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "El email es invalido";
    } else if(!password) {
        errors.password = "La contraseña es requerida";
    }

    return errors
}

export function validateRegister({ email, password, name, address, phone }: RegisterProps) {
    let errors: RegisterErrorProps = {};

    if(!email) {
        errors.email = "El email es requerido";
    } else if(!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "El email es invalido";
    } else if(!password) {
        errors.password = "La contraseña es requerida";
    } else if(!/(?=.*[0-9])/.test(password)) {
        errors.password = "La contraseña debe contener al menos un numero";
    } else if(!name) {
        errors.name = "El nombre es requerido";
    } else if(!address) {
        errors.address = "La dirección es requerida";
    } else if(!phone) {
        errors.phone = "El teléfono es requerido";
    }

    return errors
}