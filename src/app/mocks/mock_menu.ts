export const MOCK_MENU = {
    header: {
        type: 'hamburger', 
        items: [
          { name: 'Home', route: '/', icon: 'fas fa-home', display: 'both' }, 
          { name: 'Produtos', route: '/products', icon: 'fas fa-box', display: 'both' },
          { name: 'Sobre', route: '/about', icon: 'fas fa-info-circle', display: 'both' },
          { name: 'Contato', route: '/contact', icon: 'fas fa-envelope', display: 'both' },
          { name: 'Perfil', route: '/profile', icon: 'fas fa-user', display: 'both' }, 
          { name: 'Carrinho', route: '/cart', icon: 'fas fa-shopping-cart', display: 'both' } ,
          { name: 'Trocar Tema', route: null, icon: 'fas fa-adjust', display: 'both', action: 'toggleTheme' } 
        ]
    }
};