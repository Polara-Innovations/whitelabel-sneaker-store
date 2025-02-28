export const MOCK_TEXTS = {
  home: {
    banner: {
      title: 'Bem-vindo à Sneaker Store',
      subtitle: 'Os melhores tênis para você, com estilo e conforto garantidos.',
      button: 'Confira nossos produtos'
    },
    featuredProducts: {
      title: 'Produtos em Destaque'
    },
    aboutUs: {
      title: 'Sobre Nós',
      description: 'Somos apaixonados por tênis e moda. Nossa missão é oferecer os melhores produtos para nossos clientes.'
    }
  },
  products: {
    title: 'Nossos Produtos'
  },
  about: {
    intro: {
      title: 'Sobre a Sneaker Store',
      description: 'Somos apaixonados por tênis e moda. Nossa missão é oferecer os melhores produtos para nossos clientes, com qualidade e estilo.'
    },
    mission: {
      title: 'Missão, Visão e Valores',
      mission: 'Oferecer produtos de alta qualidade que combinem estilo e conforto.',
      vision: 'Ser a loja de referência em tênis e moda no mercado.',
      values: 'Qualidade, inovação e compromisso com nossos clientes.'
    },
    team: {
      title: 'Nossa Equipe',
      members: [
        { name: 'João Silva', role: 'CEO', image: 'https://picsum.photos/400/300?random=1' },
        { name: 'Maria Oliveira', role: 'Designer', image: 'https://picsum.photos/400/300?random=2' },
        { name: 'Carlos Santos', role: 'Desenvolvedor', image: 'https://picsum.photos/400/300?random=3' }
      ]
    },
  },
  footer: {
    copyright: '© 2023 Sneaker Store. Todos os direitos reservados.'
  },
  header: {
    brand: 'Sneaker Store',
    lightMode: 'Modo Claro',
    darkMode: 'Modo Escuro',
    logoUrl: 'assets/images/logo.png',
  },
  contact: {
    title: 'Entre em Contato',
    description: 'Estamos aqui para ajudar. Preencha o formulário abaixo ou use nossas informações de contato.',
    form: {
      title: 'Envie uma Mensagem',
      name: 'Nome',
      namePlaceholder: 'Digite seu nome completo',
      nameRequired: 'Nome é obrigatório',
      nameMinLength: 'Nome deve ter pelo menos 3 caracteres',
      email: 'E-mail',
      emailPlaceholder: 'Digite seu e-mail',
      emailRequired: 'E-mail é obrigatório',
      emailInvalid: 'Por favor, forneça um e-mail válido',
      subject: 'Assunto',
      subjectPlaceholder: 'Digite o assunto da mensagem',
      subjectRequired: 'Assunto é obrigatório',
      message: 'Mensagem',
      messagePlaceholder: 'Digite sua mensagem',
      messageRequired: 'Mensagem é obrigatória',
      messageMinLength: 'Mensagem deve ter pelo menos 10 caracteres',
      button: 'Enviar Mensagem',
      successMessage: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
      errorMessage: 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.'
    },
    info: {
      title: 'Informações de Contato',
      addressTitle: 'Endereço',
      address: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100',
      phoneTitle: 'Telefone',
      phone: '(11) 5555-5555',
      emailTitle: 'E-mail',
      email: 'contato@sneakerstore.com',
      hoursTitle: 'Horário de Funcionamento',
      hours: 'Segunda a Sexta: 9h às 18h | Sábado: 9h às 13h',
      socialTitle: 'Redes Sociais',
      socialLinks: {
        facebook: 'https://facebook.com/sneakerstore',
        instagram: 'https://instagram.com/sneakerstore',
        twitter: 'https://twitter.com/sneakerstore',
        linkedin: 'https://linkedin.com/company/sneakerstore'
      },
      showMap: true,
      mapTitle: 'Nossa Localização',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0976025749!2d-46.65390548521709!3d-23.563272367554347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1635784168548!5m2!1spt-BR!2sbr'
    }
  },
  productDetails: {
    relatedProductsTitle: 'Produtos Relacionados',
    addToCart: 'Adicionar ao Carrinho',
    buyNow: 'Comprar Agora'
  },
  faqs: {
    title: 'Perguntas Frequentes',
    description: 'Confira as dúvidas mais comuns dos nossos clientes.',
    questions:
    [
      {
        question: 'Como faço para trocar um produto?',
        answer: 'Você pode solicitar a troca diretamente na seção "Meus Pedidos" ou entrar em contato com nosso suporte.'
      },
      {
        question: 'Quais são os métodos de pagamento aceitos?',
        answer: 'Aceitamos cartões de crédito, débito, boleto bancário e Pix.'
      },
      {
        question: 'Qual é o prazo de entrega?',
        answer: 'O prazo de entrega varia de acordo com a sua localização e é informado no momento da compra.'
      }
    ]
  }
}