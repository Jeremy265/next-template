import { statuses } from "@/components/request/stations.table";

export type LdapUser = {
    error?: string;
    dn: string;
    company: string;
    company_id: string;
    cost_center: string;
    country: string;
    country_code: string;
    first_name: string;
    full_name: string;
    gender: string;
    id: string;
    last_name: string;
    login_disabled: string;
    mail: string;
    mobile: string;
    org_code: string;
    person_id: string;
    phone: string;
    postal_code: string;
    region: string;
    site: string;
    state: string;
    street: string;
    supervisor_id: string;
    username: string;
    type: string;
    status: string;
    image: string;
};

export type MiddlewareRedirection = {
    [key: string]: {
        status: number;
        apiMessage: string;
        appRedirectionUrl: string;
    };
};

export type NavItem = {
    label: string;
    path: string;
    title?: string;
    icon?: ReactElement;
    subnav?: ReactElement;
};

export type StationRow = {
    id: string;
    status: keyof typeof statuses;
    infos: string[];
    loading?: boolean;
    measures?: ApiMeasure[];
    station?: ApiStationFromInformation;
};

export const apiMeasureKeys = [
    {
        title: "BA300",
        subtitle:
            "HAUTEUR MINIMALE DE LA COUCHE >300M AVEC UNE NÃ‰BULOSITÃ‰ MAXI > 4/8",
    },
    { title: "BROU", subtitle: "OCCURRENCE DE BROUILLARD QUOTIDIENNE" },
    { title: "BRUME", subtitle: "OCCURRENCE DE BRUME QUOTIDIENNE" },
    { title: "DG", subtitle: "DUREE DE GEL QUOTIDIENNE" },
    { title: "DHUMEC", subtitle: "DUREE HUMECTATION QUOTIDIENNE" },
    { title: "DHUMI40", subtitle: "DUREE HUMIDITE <= 40% QUOTIDIENNE" },
    { title: "DHUMI80", subtitle: "DUREE HUMIDITE >= 80% QUOTIDIENNE" },
    { title: "DIFT", subtitle: "RAYONNEMENT DIFFUS QUOTIDIEN" },
    { title: "DIRT", subtitle: "RAYONNEMENT DIRECT QUOTIDIEN" },
    { title: "DRR", subtitle: "DUREE DES PRECIPITATIONS QUOTIDIENNES" },
    { title: "DXI", subtitle: "DIRECTION VENT MAXI INSTANTANE QUOTIDIEN" },
    {
        title: "DXI2",
        subtitle: "DIRECTION DU VENT INSTANTANE MAXI QUOTIDIEN A 2 M",
    },
    {
        title: "DXI3S",
        subtitle: "DIRECTION DU VENT INSTANTANÃ‰ SUR 3 SECONDES",
    },
    {
        title: "DXY",
        subtitle: "DIRECTION VENT QUOTIDIEN MAXI MOYENNE SUR 10 MIN ",
    },
    { title: "ECLAIR", subtitle: "OCCURRENCE ECLAIR QUOTIDIENNE" },
    {
        title: "ETPGRILLE",
        subtitle: "ETP CALCULEE AU POINT DE GRILLE LE PLUS PROCHE",
    },
    { title: "ETPMON", subtitle: "EVAPO-TRANSPIRATION MONTEITH QUOTIDIENNE" },
    {
        title: "FF2M",
        subtitle: "MOYENNE DES VITESSES DU VENT A 2 METRES QUOTIDIENNE",
    },
    {
        title: "FFM",
        subtitle: "MOYENNE DES VITESSES DU VENT A 10M QUOTIDIENNE",
    },
    { title: "FUMEE", subtitle: "OCCURRENCE DE FUMEE QUOTIDIENNE" },
    { title: "FXI", subtitle: "VITESSE VENT MAXI INSTANTANE QUOTIDIENNE" },
    {
        title: "FXI2",
        subtitle: "VITESSE DU VENT INSTANTANE MAXI QUOTIDIEN A 2 M",
    },
    {
        title: "FXI3S",
        subtitle:
            "VITESSE DU VENT INSTANTANÃ‰ SUR 3 SECONDES, MAXI DANS Lâ€™HEURE",
    },
    {
        title: "FXY",
        subtitle: "VITESSE VENT QUOTIDIEN MAXI MOYENNE SUR 10 MIN ",
    },
    { title: "GELEE", subtitle: "OCCURRENCE DE GELEE QUOTIDIENNE" },
    { title: "GLOT", subtitle: "RAYONNEMENT GLOBAL QUOTIDIEN" },
    { title: "GRELE", subtitle: "OCCURRENCE DE GRELE QUOTIDIENNE" },
    { title: "GRESIL", subtitle: "OCCURENCE DE GRESIL QUOTIDIENNE" },
    { title: "HNEIGEF", subtitle: "HAUTEUR DE NEIGE TOMBEE EN 24H" },
    { title: "HTN", subtitle: "HEURE DU TN SOUS ABRI QUOTIDIENNE" },
    { title: "HTX", subtitle: "HEURE DU TX SOUS ABRI QUOTIDIENNE" },
    { title: "HUN", subtitle: "HEURE DU MINI D'HUMIDITE QUOTIDIENNE" },
    { title: "HUX", subtitle: "HEURE DU MAXI D'HUMIDITE QUOTIDIENNE" },
    { title: "HXI", subtitle: "HEURE VENT MAXI INSTANTANE QUOTIDIEN" },
    {
        title: "HXI2",
        subtitle: "HEURE DU VENT MAX INSTANTANE A 2 M QUOTIDIENNE",
    },
    { title: "HXI3S", subtitle: "HEURE DU VENT INSTANTANÃ‰ SUR 3 SECONDES" },
    { title: "HXY", subtitle: "HEURE VENT QUOTIDIEN MAXI MOYENNE SUR 10 MIN " },
    { title: "INFRART", subtitle: "SOMME DES RAYONNEMENTS IR HORAIRE" },
    { title: "INST", subtitle: "DUREE D'INSOLATION QUOTIDIENNE" },
    {
        title: "NB300",
        subtitle: "NÃ‰BULOSITÃ‰ MAXIMALE > 4/8 Dâ€™UNE COUCHE < 300 M",
    },
    { title: "NEIG", subtitle: "OCCURRENCE DE NEIGE QUOTIDIENNE" },
    {
        title: "NEIGETOT06",
        subtitle: "EPAISSEUR DE NEIGE TOTALE RELEVEE A 0600 FU",
    },
    {
        title: "NEIGETOTX",
        subtitle: "MAXIMUM QUOTIDIEN DES EPAISSEURS DE NEIGE TOTALE HORAIRE",
    },
    { title: "ORAG", subtitle: "OCCURRENCE D'ORAGE QUOTIDIENNE" },
    { title: "PMERM", subtitle: "PRESSION MER MOYENNE QUOTIDIENNE" },
    { title: "PMERMIN", subtitle: "PRESSION MER MINIMUM QUOTIDIENNE" },
    { title: "ROSEE", subtitle: "OCCURRENCE DE ROSEE QUOTIDIENNE" },
    { title: "RR", subtitle: "HAUTEUR DE PRECIPITATIONS QUOTIDIENNE" },
    { title: "SIGMA", subtitle: "RAPPORT INSOLATION QUOTIDIEN" },
    { title: "SOLNEIGE", subtitle: "OCCURRENCE DE SOL COUVERT DE NEIGE" },
    { title: "TAMPLI", subtitle: "AMPLITUDE ENTRE TN ET TX QUOTIDIEN" },
    { title: "TM", subtitle: "TEMPERATURE MOYENNE SOUS ABRI QUOTIDIENNE" },
    {
        title: "TMERMAX",
        subtitle: "TEMPERATURE MAXIMALE QUOTIDIENNE DE L'EAU DE MER",
    },
    {
        title: "TMERMIN",
        subtitle: "TEMPERATURE MINIMALE QUOTIDIENNE DE L'EAU DE MER",
    },
    {
        title: "TMNX",
        subtitle:
            "TEMPERATURE MOYENNE SOUS ABRI QUOTIDIENNE A PARTIR DE (TN+TX)/2",
    },
    { title: "TN", subtitle: "TEMPERATURE MINIMALE SOUS ABRI QUOTIDIENNE" },
    { title: "TN50", subtitle: "TEMPERATURE MINI A +50CM QUOTIDIENNE" },
    { title: "TNSOL", subtitle: "TEMPERATURE MINIMALE A +10CM QUOTIDIENNE" },
    { title: "TNTXM", subtitle: "MOYENNE DE TN ET TX QUOTIDIEN" },
    { title: "TSVM", subtitle: "TENSION DE VAPEUR MOYENNE QUOTIDIENNE" },
    { title: "TX", subtitle: "TEMPERATURE MAXIMALE SOUS ABRI QUOTIDIENNE" },
    { title: "UM", subtitle: "HUMIDITE RELATIVE MOYENNE" },
    { title: "UN", subtitle: "HUMIDITE RELATIVE MINIMALE QUOTIDIENNE" },
    { title: "UV", subtitle: "RAYONNEMENT ULTRA VIOLET QUOTIDIEN" },
    { title: "UV_INDICEX", subtitle: "MAX DES INDICES UV HORAIRE" },
    { title: "UX", subtitle: "HUMIDITE RELATIVE MAXIMALE QUOTIDIENNE" },
    { title: "VERGLAS", subtitle: "OCCURRENCE DE VERGLAS" },
];

export interface ApiMeasure {
    POSTE: string;
    DATE: string;
    DAT?: string;
    BA300: string;
    BROU: string;
    BRUME: string;
    DG: string;
    DHUMEC: string;
    DHUMI40: string;
    DHUMI80: string;
    DIFT: string;
    DIRT: string;
    DRR: string;
    DXI: string;
    DXI2: string;
    DXI3S: string;
    DXY: string;
    ECLAIR: string;
    ETPGRILLE: string;
    ETPMON: string;
    FF2M: string;
    FFM: string;
    FUMEE: string;
    FXI: string;
    FXI2: string;
    FXI3S: string;
    FXY: string;
    GELEE: string;
    GLOT: string;
    GRELE: string;
    GRESIL: string;
    HNEIGEF: string;
    HTN: string;
    HTX: string;
    HUN: string;
    HUX: string;
    HXI: string;
    HXI2: string;
    HXI3S: string;
    HXY: string;
    INFRART: string;
    INST: string;
    NB300: string;
    NEIG: string;
    NEIGETOT06: string;
    NEIGETOTX: string;
    ORAG: string;
    PMERM: string;
    PMERMIN: string;
    ROSEE: string;
    RR: string;
    SIGMA: string;
    SOLNEIGE: string;
    TAMPLI: string;
    TM: string;
    TMERMAX: string;
    TMERMIN: string;
    TMNX: string;
    TN: string;
    TN50: string;
    TNSOL: string;
    TNTXM: string;
    TSVM: string;
    TX: string;
    UM: string;
    UN: string;
    UV: string;
    UV_INDICEX: string;
    UX: string;
    VERGLAS: string;
}

export interface ApiStationFromInformation {
    id: string;
    nom: string;
    lieuDit: string;
    bassin: string;
    dateDebut: string;
    dateFin: string;
    typesPoste: { type: number; dateDebut: string; dateFin: string }[];
    parametres: { nom: number; dateDebut: string; dateFin: string }[];
    producteurs: { nom: number; dateDebut: string; dateFin: string }[];
    positions: {
        altitude: number;
        latitude: number;
        longitude: number;
        dateDebut: string;
        dateFin: string;
    }[];
    distance: number;
}

export interface ApiStationFromList {
    Id_station: string;
    Id_omm: string;
    Nom_usuel: string;
    Latitude: string;
    Longitude: string;
    Altitude: string;
    Date_ouverture: string;
    Pack: string;
    distance?: number;
}

export interface ApiStationFromListDepartement {
    id: string;
    nom: string;
    posteOuvert: boolean;
    typePoste: number;
    lon: number;
    lat: number;
    alt: number;
    postePublic: boolean;
}

export interface ApiTown {
    nom: string;
    code: string;
    _score: number;
    codesPostaux: string[];
    departement: {
        code: string;
        nom: string;
    };
    centre: {
        type: string;
        coordinates: [number, number];
    };
}

export interface Coordinates {
    lat: number;
    lon: number;
}

export interface Period {
    from: Moment;
    to: Moment;
}
