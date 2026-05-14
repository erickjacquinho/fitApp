# Stack de Tecnologia e Arquitetura do FitApp

Este documento descreve a stack de tecnologia e a arquitetura inicial decididas para o desenvolvimento do aplicativo FitApp.

## 1. Visão Geral do Projeto (MVP)

*   **Nome do Projeto:** FitApp
*   **Tipo:** Aplicativo móvel de treino e dieta.
*   **Plataformas Alvo:** Android primeiro para validação do MVP, com lançamento iOS após validação no Android.
*   **Foco do MVP:** Totalmente offline.
*   **Funcionalidades Chave do MVP:**
    *   Registro de cargas de treino, contagem, histórico e notas.
    *   Banco de alimentos pré-cadastrado.
    *   Menu de dieta customizável por dia.
    *   Criação totalmente customizável de refeições e alimentos (com quantidades).
    *   Hub unificado de acompanhamento de resultados com gráficos para cruzar informações complexas sobre a evolução.

## 2. Stack Tecnológica Detalhada

*   **Framework Principal:** **React Native** (com **Expo**)
    *   **Justificativa:** Permite o desenvolvimento multiplataforma (Android/iOS) a partir de uma única base de código, com facilidade de configuração e ferramentas do Expo.
*   **Linguagem de Programação:** **TypeScript**
    *   **Justificativa:** Oferece tipagem estática, aumentando a robustez, manutenibilidade e escalabilidade do código.
*   **Navegação:** **Expo Router**
    *   **Justificativa:** Abordagem moderna de roteamento baseada em arquivos, simplificando a configuração e organização da navegação mobile para Android e iOS.
*   **Gerenciamento de Estado:** **Zustand**
    *   **Justificativa:** Leve, simples e performático, ideal para gerenciar o estado global da aplicação de forma eficiente no React Native.
*   **Banco de Dados Local:** **WatermelonDB**
    *   **Justificativa:** Banco de dados offline de alta performance construído sobre SQLite, otimizado para React Native. Sua arquitetura facilita a futura implementação de sincronização com um backend online.
*   **Estilização:** **NativeWind** (com componentes próprios)
    *   **Justificativa:** Implementa a sintaxe do Tailwind CSS no React Native, permitindo uma estilização rápida e consistente. A estratégia é construir componentes de UI próprios a partir de primitivos do React Native, seguindo a filosofia de "você é o dono do código" (similar ao `shadcn/ui`).
*   **Biblioteca de Gráficos:** **`react-native-gifted-charts`**
    *   **Justificativa:** Biblioteca moderna e flexível, oferece uma boa variedade de gráficos (linha, barra) e é fácil de usar e customizar, adequada para as visualizações de dados de treino e dieta.

## 3. Arquitetura do Código

Será utilizada uma abordagem combinada para a organização do código:

*   **Organização de Pastas e Módulos:** **Arquitetura Modular por Feature**
    *   O código será estruturado em módulos independentes baseados em funcionalidades (e.g., `features/training`, `features/diet`, `features/dashboard`). Cada módulo conterá todo o código (componentes, lógica, hooks, telas) relacionado à sua funcionalidade.
    *   **Benefícios:** Alta escalabilidade, organização clara, baixo acoplamento entre funcionalidades e fácil manutenibilidade.
*   **Organização de Componentes UI:** **Atomic Design**
    *   Dentro dos módulos de feature e em uma pasta de componentes compartilhados (`src/components/`), os componentes de interface do usuário serão categorizados em:
        *   **Átomos (`atoms/`):** Blocos construtivos básicos (e.g., `Button`, `Input`, `Text`).
        *   **Moléculas (`molecules/`):** Grupos de átomos que funcionam juntos (e.g., `LabeledInput`, `ExerciseCard`).
        *   **Organismos (`organisms/`):** Grupos de moléculas que formam uma seção da interface (e.g., `WorkoutList`).
    *   **Benefícios:** Consistência de design, reusabilidade de componentes e compreensão clara da hierarquia da UI.

## 5. Estratégia de Analytics e Cruzamento de Dados

Para suportar o cruzamento de informações complexas (ex: volume de treino vs. ingestão calórica) de forma performática e reativa, o FitApp utiliza uma estratégia híbrida:

*   **Raw SQL (Alta Performance/Histórico):** Consultas SQL diretas via adaptador do WatermelonDB para processar grandes volumes de dados e agregações complexas (`SUM`, `AVG`, `GROUP BY`). Ideal para dashboards e relatórios de longo prazo.
*   **Processamento In-Memory (Reatividade/Tempo Real):** Uso de JavaScript e Observables do WatermelonDB para métricas imediatas e interativas (ex: calorias consumidas no dia). Garante que a interface atualize instantaneamente conforme o usuário insere dados.

Essa abordagem garante que o aplicativo permaneça rápido mesmo após meses de uso intenso, sem sacrificar a experiência de usuário fluida.

## 6. Requisitos Não-Funcionais e Suposições

*   **Performance:** O aplicativo deve ser fluido e responsivo para uso individual em dispositivos móveis modernos.
*   **Escala:** Projetado para uso individual ou um pequeno grupo de usuários, com os dados gerenciados localmente.
*   **Segurança/Privacidade:** Dados armazenados exclusivamente no dispositivo do usuário no MVP, sem transmissão para servidores externos.
*   **Manutenibilidade:** A stack e a arquitetura escolhidas visam facilitar a manutenção e a extensibilidade futura do projeto.
