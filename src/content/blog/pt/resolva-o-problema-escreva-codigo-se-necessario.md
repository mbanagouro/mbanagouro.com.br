---
title: "Resolva o problema. Escreva código, se necessário."
description: "Como entregamos valor para um dos nossos principais clientes de e-commerce sem desenvolver uma única linha de código novo."
pubDate: 2026-02-12
tags: ["engenharia", "arquitetura", "ecommerce", "automação", "liderança"]
---

Existe uma armadilha silenciosa que muitos times de tecnologia caem sem perceber: a crença de que todo problema precisa de um novo sistema ou uma nova funcionalidade.

Alguns anos atrás, vivenciei uma situação com um dos nossos principais clientes de e-commerce que reforçou ainda mais uma das minhas convicções mais importantes como CTO.

## O problema não era técnico. Era de tempo.

O time de marketing precisava coletar avaliações dos clientes após a entrega dos pedidos e enviou uma solicitação para desenvolvermos uma nova funcionalidade que executasse o envio dessa avaliação assim que o pedido fosse marcado como entregue pelo Backoffice.

O objetivo era claro: gerar insights reais para melhorar a experiência no site, app, logística e atendimento.

Mas havia um bloqueio clássico. O time de engenharia já estava no limite:

- backlog cheio
- demandas críticas em andamento
- sustentação da operação
- novas funcionalidades comprometidas
- integrações em andamento

Não havia espaço para desenvolver algo novo. A alternativa seria contratar uma ferramenta de NPS, mas isso significaria:

- orçamento
- processo de compras
- aprovação interna
- negociação com fornecedor
- implantação e integração

Semanas. Talvez meses. O problema precisava ser resolvido agora.

Diante desse cenário, a pergunta certa era: **"Como podemos resolver isso com o que já temos?"**

Essa mudança de mentalidade é onde a engenharia começa a gerar valor de verdade.

## A solução não envolveu escrever código

Após reunião com o time do cliente e entendido o problema que precisavam resolver, avaliei as opções disponíveis.

Já utilizávamos o **Apache NiFi** na infraestrutura do cliente para integrações e automações. Então criei um workflow extremamente simples que realizava três operações:

1. Identificava os pedidos marcados como entregues
2. Capturava o e-mail do cliente
3. Disparava automaticamente um e-mail com um link para avaliação

E o formulário? Foi criado pelo próprio time de marketing usando **Google Forms**, totalmente personalizado com a identidade visual da empresa.

Simples. Direto. Sem fricção.

**Tempo total de implementação: menos de 1 hora.**

Sem backlog. Sem projeto. Sem sprint. Sem deploy.

Em menos de uma hora, a solução já estava em produção.

## O resultado

O workflow ficou ativo durante um mês inteiro. Resultado: **mais de 7.000 avaliações coletadas**.

7.000 clientes compartilhando sua experiência real, gerando insights valiosos sobre:

- experiência de navegação
- qualidade das entregas
- pontos de fricção na jornada
- oportunidades claras de melhoria

Tudo isso com uma solução criada em menos tempo do que muitas reuniões levam para terminar.

## O verdadeiro papel da engenharia não é escrever código

É remover bloqueios.

É acelerar aprendizado.

É entregar valor com velocidade.

Muitos times ficam presos esperando o momento ideal, a ferramenta ideal, o projeto ideal. Mas empresas que crescem rápido aprendem rápido. E aprendem rápido porque **executam rápido**.

Engenharia moderna não é sobre complexidade. É sobre pragmatismo. É sobre impacto.

> Essa é a diferença entre tecnologia como custo e tecnologia como vantagem competitiva.

Nem sempre a resposta é mais software ou mais funcionalidades. Às vezes, é mais clareza. Mais velocidade. E mais execução.
