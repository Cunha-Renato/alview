# ALVIEW
- Renato Marquez Cunha - 5181620
- https://github.com/Cunha-Renato/alview

## Descrição
Este projeto tem como finalidade apresentar de forma visual e interativa o funcionamento de algoritmos que trabalham em arrays, atualmente algoritmos de ordenação e de busca. Com um visual simplista e retrô, utilizando cores do famoso tema **Gruvbox**.

A navegação é feita através da barra de navegação acima, contendo as 3 principais páginas. Dentro das páginas de algorítimos é possível navegar para a simulação de seu functionamento clickando em seu nome, dentro da mesma também é possível navegar entre outros algoritmos atŕaves das setas apresentadas no título.

## Tema
Como dito previamente este projeto gira em torno da simulação iterativa de algoritmos de busca e ordenação (por enquanto).

## Tecnologias Utilizadas
O projeto foi feito com **Vite** utilizando **React** e **Typescript**, o site é uma SPA sem uso de nenhum backend, para a tela principal foi necessário o uso da biblioteca **remark-gfm**.

## Principais Funcionalidades
 - **ORDENAÇÃO:** Nas simulações de ordenação é possível alterar os seguintes parâmetros:
   - **Delay:** O tempo de espera para o próximo passo da simulação.
   - **Amount:** A quantidade de itens presentes na simulação.
   - **Max Value:** O valor máximo permitido que os itens pode ter.
   - **Scenario:** Representa o estado inicial do array, eles são:
     - **Average Case:** Itens aleatórios.
     - **Best Case:** O array já se encontra ordenado.
     - **Worst Case:** O array sen encontra ordenado de forma inversa.
   - **Play/Pause:** Permite a pausa e continuamento da simulação.
   - **Reset:** Gera uma nova simulação com novos dados.
- **BUSCA:** Nas simulações de busca é possível selecionar qual elemento será buscado ao clickar em uma das barras, além de alterar os seguintes parâmetros:
   - **Delay:** O tempo de espera para o próximo passo da simulação.
   - **Amount:** A quantidade de itens presentes na simulação.
   - **Max Value:** O valor máximo permitido que os itens pode ter.
   - **Play/Pause:** Permite a pausa e continuamento da simulação.
   - **Reset:** Gera uma nova simulação com novos dados.
   
## Passos para Instalação
Basta clonar o projeto no GitHub.

## Passos para Execução
Após clonar o projeto basta rodar:
```bash
    npm i
    npm run dev
```
ou
```bash
    pnpm i
    pnpm run dev
```
Como pode notar existe um aquivo chamado **pnpm-lock.yaml** isso deve-se ao fato de eu ter utilizado **pnpm** e não **npm**. Isso não interfere no resultado, basta remover o arquivo e rodar os comandos caso use **npm**. 

## Componente Criativo
Os componentes principais deste projeto chamam-se de **SortVisualizer** e **SearchVisualizer**, ambos se encontram no arquivo **src/components/AlgoVisualizer.tsx**.

Sua principal funcionalidade é manter e apresentar o estado da simulação, em termos de visual o componente é simples. Sua importância apresenta-se em como os dados devem interagir com **React**, foi sem sombra de dúvidas o componente mais desafiador do projeto.