const Menu = [
    {
        name: 'Hello World',
        path: '/helloworld',
        icon: 'fas fa-grip-horizontal'
    },
    {
        name: 'Basic Grid',
        path: '/basicgrid',
        icon: 'fas fa-grip-horizontal'
    },
    {
        name: 'Advanced Grid',
        path: '/advancedgrid',
        icon: 'fas fa-table'
    },
    {
        name: 'Datagrid',
        path: '/datagrid',
        icon: 'fas fa-table'
    },
    {
        name: 'Sample Form',
        path: '/formcontrolsample',
        icon: 'fas fa-table'
    },
    {
        name: 'Single View',
        path: 'singleview',
        icon : 'fas fa-list',
        translate: 'sidebar.nav.SINGLEVIEW'
    },
   {
        name: 'Menu',
        icon: 'icon-speedometer',
        translate: 'sidebar.nav.MENU',
        submenu: [{
            name: 'Submenu',
            translate: 'sidebar.nav.SUBMENU',
            path: 'submenu'
        }]
    }
    
];

export default Menu;
