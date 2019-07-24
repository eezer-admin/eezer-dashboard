import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Tables',
    icon: 'nb-tables',
    children: [
      {
        title: 'Users',
        link: '/pages/tables/users',
      },
      {
        title: 'Drivers',
        link: '/pages/tables/drivers',
      },
      {
        title: 'Vehicles',
        link: '/pages/tables/vehicles',
      },
      {
        title: 'Transports',
        link: '/pages/tables/transports',
      },
    ],
  },
];
