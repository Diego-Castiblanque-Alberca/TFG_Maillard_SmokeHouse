import platos from "../../public/imgs/platos.jpg";
import bebidas from "../../public/imgs/bebidas.jpg";
import cervezas from "../../public/imgs/cervezas.jpg";
import vinos from "../../public/imgs/vinos.jpg";
import cocktails from "../../public/imgs/cocktails.jpg";
import refrescos from "../../public/imgs/refrescos.jpg";
import entrantes from "../../public/imgs/ensalada.jpg";
import principales from "../../public/imgs/pexels-photo-11089588.jpeg";
import acompanantes from "../../public/imgs/pexels-max-avans-5056842.jpg";
import postres from "../../public/imgs/helado.jpg";
import refresco1 from "../../public/imgs/refresco1.jpg";
import refresco2 from "../../public/imgs/refresco2.jpg";
import refresco3 from "../../public/imgs/refresco3.jpg";
import refresco4 from "../../public/imgs/refresco4.jpg";
import cerveza1 from "../../public/imgs/cerveza1.jpg";
import cerveza2 from "../../public/imgs/cerveza2.jpg";
import cerveza3 from "../../public/imgs/cerveza3.jpg";
import cerveza4 from "../../public/imgs/cerveza4.jpg";
import vino1 from "../../public/imgs/vino1.jpg";
import vino2 from "../../public/imgs/vino2.jpg";
import vino3 from "../../public/imgs/vino3.jpg";
import vino4 from "../../public/imgs/vino4.jpg";
import cocktail1 from "../../public/imgs/cocktail1.jpg";
import cocktail2 from "../../public/imgs/cocktail2.jpg";
import cocktail3 from "../../public/imgs/cocktail3.jpg";
import cocktail4 from "../../public/imgs/cocktail4.jpg";
import ensalada from "../../public/imgs/ensalada.jpg";
import palomitas from "../../public/imgs/pexels-allan-carvalho-17683812.jpg";
import nachos from "../../public/imgs/pexels-allan-carvalho-17683812.jpg"
import sabrosa from "../../public/imgs/pexels-photo-11089588.jpeg";
import hamburguesa from "../../public/imgs/burguer.jpg";
import entrecot from "../../public/imgs/carne2.jpg";
import costillas from "../../public/imgs/pexels-pascal-claivaz-410648.jpg";
import cuencos from "../../public/imgs/pexels-pascal-claivaz-410648.jpg";
import patatas from "../../public/imgs/pexels-dzenina-lukac-1583884.jpg";
import ensalada2 from "../../public/imgs/pexels-iina-luoto-1211887.jpg";
import helado from "../../public/imgs/helado.jpg";
import tarta from "../../public/imgs/helado.jpg";
import tiramisu from "../../public/imgs/dessert-3331009_1920.jpg";


export const SUBTITULO = {
    CARTA: "Descubre lo que ofrecemos",
    REFRESCOS: "REFRESCOS",
    CERVEZAS: "CERVEZAS",
    VINOS: "VINOS",
    COCKTAILS: "COCKTAILS",
    ENTRANTES: "ENTRANTES",
    PRINCIPALES: "PRINCIPALES",
    ACOMPANANTES: "ACOMPAÑANTES",
    POSTRES: "POSTRES"
}
export const EVENTS = {
    PUSHSTATE: 'pushstate',
    POPSTATE: 'popstate'
}

export const COMENSALES = 8;

export const CONSTANTS = {
    COMENSALES: 8,
    HORARIOS_DISPONIBLES: {
        "comida": {
            "12:00": true,
            "12:30": true,
            "13:00": false,
            "13:30": true,
            "14:00": true,
            "14:30": true,
            "15:00": true,
            "15:30": true,
            "16:00": true,
        },
        "cena": {
            "20:00": true,
            "20:30": true,
            "21:00": true,
            "21:30": true,
            "22:00": true,
            "22:30": true,
            "23:00": true
        }
    },
    MESAS:{
        //una mesa 1 capacidad 4
        "mesa-1": {
            capacidad: 2,
            disponibilidad: true
        },
        "mesa-2": {
            capacidad: 2,
            disponibilidad: true
        },
        "mesa-3": {
            capacidad: 2,
            disponibilidad: true
        },
        "mesa-4": {
            capacidad: 6,
            disponibilidad: false
        },
        "mesa-5": {
            capacidad: 8,
            disponibilidad: true
        },
        "mesa-6": {
            capacidad: 4,
            disponibilidad: true
        },
        "mesa-7": {
            capacidad: 4,
            disponibilidad: true
        },
        "mesa-8": {
            capacidad: 2,
            disponibilidad: true
        },
        "mesa-9": {
            capacidad: 2,
            disponibilidad: true
        }
    }
};
export const CARTA = [
    {
        title: "Nuestros Platos",
        backgroundImage: platos,
        to: "/carta/platos"
    },
    {
        title: "Nuestras Bebidas",
        backgroundImage: bebidas,
        to: "/carta/bebidas"
    }
];

export const BEBIDAS = [
    {
        title: "Refrescos",
        backgroundImage: refrescos,
        to: "/carta/bebidas/refrescos"
    },
    {
        title: "Cervezas",
        backgroundImage: cervezas,
        to: "/carta/bebidas/cervezas"
    },
    {
        title: "Vinos",
        backgroundImage: vinos,
        to: "/carta/bebidas/vinos"
    },
    {
        title: "Cocktails",
        backgroundImage: cocktails,
        to: "/carta/bebidas/cocktails"
    }
];

export const PLATOS = [
    {
        title: "Entrantes",
        backgroundImage: entrantes,
        to: "/carta/platos/entrantes"
    },
    {
        title: "Principales",
        backgroundImage: principales,
        to: "/carta/platos/principales"
    },
    {
        title: "Acompañantes",
        backgroundImage: acompanantes,
        to: "/carta/platos/acompanantes"
    },
    {
        title: "Postres",
        backgroundImage: postres,
        to: "/carta/platos/postres"
    }
];

export const REFRESCOS = [
    {
        title: "Agua Mineral 50cl",
        backgroundImage: refresco1,
        precio: "1.50€"
    },
    {
        title: "Limonada 33cl",
        backgroundImage: refresco2,
        precio: "1.50€"
    },
    {
        title: "Coca-Cola 25cl",
        backgroundImage: refresco3,
        precio: "1.50€"
    },
    {
        title: "Combucha 25ml",
        backgroundImage: refresco4,
        precio: "1.50€"
    }
];

export const CERVEZAS = [
    {
        title: "Budweiser 33cl",
        backgroundImage: cerveza1,
        precio: "1.50€"
    },
    {
        title: "Tempus 33cl",
        backgroundImage: cerveza2,
        precio: "1.50€"
    },
    {
        title: "Coronita 33cl",
        backgroundImage: cerveza3,
        precio: "1.50€"
    },
    {
        title: "Monteith's 33cl",
        backgroundImage: cerveza4,
        precio: "1.50€"
    }
];

export const VINOS = [
    {
        title: "Moscato blanco 75cl",
        backgroundImage: vino1,
        precio: "1.50€"
    },
    {
        title: "Pineau Blanc 75cl",
        backgroundImage: vino2,
        precio: "1.50€"
    },
    {
        title: "Bordeaux 75cl",
        backgroundImage: vino3,
        precio: "1.50€"
    },
    {
        title: "Champagne Ernest",
        backgroundImage: vino4,
        precio: "1.50€"
    }
];

export const COCKTAILS = [
    {
        title: "New Daikiri",
        backgroundImage: cocktail1,
        precio: "1.50€"
    },
    {
        title: "Margarita Pink",
        backgroundImage: cocktail2,
        precio: "1.50€"
    },
    {
        title: "Cocotero",
        backgroundImage: cocktail3,
        precio: "1.50€"
    },
    {
        title: "Brisa",
        backgroundImage: cocktail4,
        precio: "1.50€"
    }
];

export const ENTRANTES = [
    {
        title: "Ensalada de la casa",
        descripcion: "Lechuga, tomate, cebolla, aceitunas y atún.",
        backgroundImage: ensalada,
        precio: "7.50€"
    },
    {
        title: "Palomitas Gouda",
        descripcion: "Palomitas de maíz con queso Gouda fundido.",
        backgroundImage: palomitas,
        precio: "6.50€"
    },
    {
        title: "Nachos",
        descripcion: "Nachos con guacamole, queso cheddar y jalapeños.",
        backgroundImage: nachos,
        precio: "8.00€"
    }
];

export const PRINCIPALES = [
    {
        title: "La Sabrosa",
        descripcion: "Base de tomate, mozzarella, carne picada de vacuno, panceta, aceitunas negras, ajetes, dados de tomate y albahaca.",
        backgroundImage: sabrosa,
        precio: "14.50€"
    },
    {
        title: "Hamburguesa SmokeHouse",
        descripcion: "Carne de vacuno, queso cheddar, bacon, lechuga, tomate, cebolla y salsa BBQ.",
        backgroundImage: hamburguesa,
        precio: "12.50€"
    },
    {
        title: "Entrecot",
        descripcion: "Entrecot de ternera a la parrilla con patatas fritas y ensalada.",
        backgroundImage: entrecot,
        precio: "18.00€"
    },
    {
        title: "Costillas BBQ",
        descripcion: "Costillas de cerdo con salsa BBQ, patatas fritas y ensalada.",
        backgroundImage: costillas,
        precio: "15.00€"
    }
];

export const ACOMPANANTES = [
    {
        title: "Cuencos de salsas",
        descripcion: "Salsa BBQ, salsa de queso, salsa de mostaza y miel, salsa de yogur y pepino.",
        backgroundImage: cuencos,
        precio: "2.50€"
    },
    {
        title: "Patatas fritas",
        descripcion: "Patatas fritas con sal y pimienta.",
        backgroundImage: patatas,
        precio: "3.50€"
    },
    {
        title: "Ensalada",
        descripcion: "Lechuga, tomate, cebolla, aceitunas y atún.",
        backgroundImage: ensalada2,
        precio: "4.00€"
    }
];

export const POSTRES = [
    {
        title: "Helado",
        descripcion: "Tres bolas de helado a elegir entre vainilla, chocolate, fresa, limón o nata.",
        backgroundImage: helado,
        precio: "4.50€"
    },
    {
        title: "Tarta de queso",
        descripcion: "Tarta de queso con mermelada de frutos rojos.",
        backgroundImage: tarta,
        precio: "5.00€"
    },
    {
        title: "Tiramisú",
        descripcion: "Tiramisú casero con cacao en polvo.",
        backgroundImage: tiramisu,
        precio: "6.00€"
    }
];

export const CONTACTO = [
    
    {
        h1: "Contacto"
    },
    {
        titulo: "Dirección",
        descripcion: "Calle de Lagasca, 98, 28001 Madrid."
    },
    {
        titulo: "Teléfono de información",
        descripcion: "+34 914 000 000"
    },
    {
        titulo: "E-mail",
        descripcion: "maillard@smokehouse.es"
    },
    {
        titulo: "Horarios",
        descripcion: "L-D 12:00 - 15:30h | 20:00 - 00:00h"
    }
]