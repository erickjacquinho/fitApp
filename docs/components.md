# Componentes de Aplicação

> Reference only. This file is a broad reminder list for possible components and is not an implementation rule. FitApp implementation rules live in `.agents/rules/`, especially `designsystem-guide.md` and the focused design system guideline files.

## Componentes Básicos (Todo App)

### Navegação
- **Navbar** — Barra de navegação principal com logo, links e ações
- **Sidebar** — Menu lateral colapsável para navegação entre páginas
- **BottomNav** — Navegação inferior para apps mobile
- **Breadcrumbs** — Trilha de navegação mostrando localização atual
- **Tabs** — Abas para alternar entre conteúdos relacionados

### Layout
- **Container** — Wrapper centralizado com largura máxima
- **Grid** — Sistema de grids para organizar conteúdo
- **Stack** — Componente de espaçamento vertical/horizontal
- **Card** — Container com bordas, sombra e padding para conteúdo
- **Divider** — Linha separadora visual
- **Header** — Cabeçalho de página/sessão
- **Footer** — Rodapé da página/aplicativo

### Formulários
- **Input** — Campo de texto básico
- **Textarea** — Campo de texto multilinha
- **Select/Dropdown** — Lista suspensa de opções
- **Checkbox** — Caixa de seleção
- **Radio** — Seleção única em grupo
- **Switch/Toggle** — Botão de alternância on/off
- **Button** — Botão de ação (primário, secundário, ghost)
- **Form** — Wrapper para agrupar campos com validação

### Feedback
- **Alert/Toast** — Mensagem informativa de feedback rápido
- **Badge** — Indicador numérico ou texto em destaque
- **Spinner/Loader** — Indicador de carregamento
- **ProgressBar** — Barra de progresso
- **Skeleton** — Placeholder de carregamento visual

### Mídia
- **Avatar** — Foto de perfil do usuário
- **Image** — Exibição de imagem com suporte a lazy load
- **Icon** — Ícone individual
- **IconButton** — Botão com ícone apenas

### Dados
- **Table** — Tabela de dados com ordenação e paginação
- **List** — Lista de itens renderizados
- **Pagination** — Controle de paginação

---

## Componentes Situacionais (Quando Necessário)

### Autenticação
- **LoginForm** — Formulário de login
- **RegisterForm** — Formulário de cadastro
- **ForgotPasswordForm** — Recuperação de senha
- **PasswordInput** — Campo de senha com toggle de visibilidade

### Usuário
- **ProfileCard** — Card com informações do perfil
- **UserMenu** — Menu dropdown com ações do usuário
- **AvatarUploader** — Upload de foto de perfil

### Dados Complexos
- **DataTable** — Tabela avançada com filtros e ações
- **Chart** — Gráfico para visualização de dados
- **Modal** — Dialog overlay para ações detalhadas
- **Drawer** — Painel lateral deslizante
- **TreeView** — Hierarquia navegável

### Busca e Filtros
- **SearchInput** — Campo de busca com ícone
- **FilterBar** — Barra com filtros aplicáveis
- **DatePicker** — Seleção de data
- **RangeSlider** — Seletor de faixa de valores

### Conteúdo
- **Modal** — Dialog para ações/confirmações
- **ConfirmDialog** — Confirmação de ação destrutiva
- **Tooltip** — Dica contextual ao passar o mouse
- **Popover** — Conteúdo flutuante ancorado

### Estados Especiais
- **EmptyState** — Estado quando não há dados
- **ErrorState** — Estado de erro com mensagem
- **LoadingState** — Estado de carregamento
- **404Page** — Página não encontrada
- **OfflineBanner** — Indicador de conexão offline

### E-commerce (se aplicável)
- **ProductCard** — Card de produto
- **Cart** — Carrinho de compras
- **CheckoutForm** — Formulário de finalização
- **PriceDisplay** — Exibição de preço

### Chat/Mensagens (se aplicável)
- **ChatBubble** — Bolha de mensagem
- **ChatList** — Lista de conversas
- **MessageInput** — Campo de envio de mensagem

### Notificações
- **NotificationBell** — Ícone de notificações com badge
- **NotificationPanel** — Painel de lista de notificações
- **PushPrompt** — Solicitar permissão de push
