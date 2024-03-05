import { Icons } from "@/components/icons/Icon";

export type CategoriesType = {
    name: string;
    icon: keyof typeof Icons;
}

export type CountriesType = {
    label: string;
    value: string;
}

export type HomeType = {
    id: any;
    title: any;
    country: any;
    city: any;
    state: any;
    price: any;
    description: any;
    image: any;
    users: {
        name: string;
    }
};