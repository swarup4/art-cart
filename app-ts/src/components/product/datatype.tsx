interface Images {
    src: string;
    alt: string;
}

export interface Colors {
    name: string;
    class: string;
    selectedClass: string;
}

export interface Size {
    name: string;
    inStock: boolean;
}

export interface Breadcrumbs {
    id: number;
    name: string;
    href: string;
}

export interface Option { 
    value: string; 
    label: string; 
    checked: boolean;
}

export interface Filter {
    id: string;
    name: string;
    options: Option[];
}


export interface Product {
    id: number;
    name: string;
    href: string;
    color: string;
    price: string;
    imageSrc: string;
    imageAlt: string;
}

export interface Details {
    name: string;
    price: string;
    href: string;
    breadcrumbs: Breadcrumbs[];
    images: Images[];
    colors: Colors[];
    sizes: Size[];
    description: string;
    highlights: string[];
    details: string;
}

export interface Sort {
    name: string;
    href: string;
    current: boolean;
}
export interface Categories {
    name: string;
    href: string;
}

export interface Reviews { 
    href: string;
    average: number;
    totalCount: number;
}