type MenuType = 'hamburger' | 'tabs';
type MenuTabType = 'link' | 'button' | 'dropdown';

interface MenuTab {
    name: string;
    route: string;
    icon: string;
    display: string;
    type: MenuTabType;
}

export interface MenuConfig {
    id: number;
    type: MenuType;
    tabs: MenuTab[];
}