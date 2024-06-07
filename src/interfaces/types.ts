export default interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: number
}

export interface LoginProps {
    email: string;
    password: string;
}

export interface LoginErrorProps {
    email?: string;
    password?: string;
}

export interface RegisterProps {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
}

export interface RegisterErrorProps {
    name?: string;
    email?: string;
    password?: string;
    address?: string;
    phone?: string;
}

export interface ICategory {
    id: number;
    name: string;
}

export interface IOrder {
    id: number;
    status: string;
    date: Date;
    // user: IUser;
    products: IProduct[];
}

export interface userSession{
    token: string;
    userData: {
        address: string;
        email: string;
        id: number;
        name: string;
        phone: string;
        role: string;
        orders: IOrder[]
    }
}