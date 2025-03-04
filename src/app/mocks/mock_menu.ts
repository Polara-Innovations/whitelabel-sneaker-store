type MenuItemType = 'link' | 'button' | 'dropdown';

export const MOCK_MENU = {
  header: {
    type: 'tabs', 
    items: [
      { name: 'Home', route: '/', icon: 'fas fa-home', display: 'title', type: 'link' as MenuItemType }, 
      { name: 'Produtos', route: '/products', icon: 'fas fa-box', display: 'title', type: 'link' as MenuItemType },
      { name: 'Sobre', route: '/about', icon: 'fas fa-info-circle', display: 'title', type: 'link' as MenuItemType },
      { name: 'Contato', route: '/contact', icon: 'fas fa-envelope', display: 'title', type: 'link' as MenuItemType },
      { name: 'Categorias', route: '/products', icon: 'fas fa-bars', display: 'title', type: 'dropdown' as MenuItemType} 
    ]
  }
};