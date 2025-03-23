export type User = {
    first_name: string;
    last_name: string;
    mail: string;
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
