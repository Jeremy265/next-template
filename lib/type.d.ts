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
