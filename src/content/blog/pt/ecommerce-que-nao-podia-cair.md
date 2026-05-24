---
title: "O dia em que o e-commerce não podia cair, e quase sempre caía"
description: "Como um problema recorrente de quedas em campanhas da Centauro me ensinou que performance quase nunca é sobre tecnologia nova — é sobre entender o problema certo."
pubDate: 2026-01-14
tags: ["performance", "arquitetura", "ecommerce", "cache"]
---

Lá no começo da minha jornada como desenvolvedor, por volta de 2010/2011, tive a oportunidade — e a pressão — de trabalhar em uma conta gigante: a **Centauro**, na época já um dos maiores varejistas esportivos do Brasil.

Tínhamos acabado de assumir a operação técnica do e-commerce quando um problema recorrente começou a ficar impossível de ignorar.

**Toda vez que entrava uma grande campanha no ar, o site caía.**

E não era "lento". Era fora do ar mesmo.

Isso gerava algo muito pior do que um erro técnico: desperdício pesado de investimento em mídia, porque os acessos vinham... mas não viravam venda.

## A reação imediata — e por que estava errada

A primeira reação de muita gente era apontar para infraestrutura:

- "Precisa de mais servidor"
- "O banco não aguenta"
- "Vamos escalar tudo"

Mas antes de sair comprando hardware, resolvemos entender o **fluxo real** do e-commerce.

Foi aí que veio o choque.

## 70 chamadas ao banco em uma única página

Só a página inicial fazia **mais de 70 chamadas ao banco de dados**.

Chamadas para buscar menus, categorias, vitrines, configurações, produtos em destaque... Tudo isso dados que quase não mudavam.

Ou seja: a cada acesso, o site perguntava tudo de novo ao banco. Em campanha, isso virava um massacre. O banco caía. O e-commerce caía junto.

## A solução mais simples — e mais ignorada

Não inventamos nada mirabolante.

A decisão foi quase óbvia depois da análise: colocar uma **camada de cache** nas consultas que sempre retornavam a mesma coisa.

- Cache de 1 hora
- Aplicado nos pontos certos
- Sem impacto na operação
- Sem risco para o negócio

Tempo de implementação: menos de 1 semana. Testes: carga, stress e cenários de pico.

## Os resultados

Os números falaram por si:

| Métrica | Antes | Depois |
|---|---|---|
| Chamadas ao banco por acesso | +70 | < 5 |
| Estabilidade em campanhas | Quedas frequentes | Estável |
| Conversão em picos de mídia | Próxima de zero | Normal |

O e-commerce parou de cair. E o mais importante: o negócio passou a escalar sem jogar dinheiro fora.

## O aprendizado que carrego até hoje

Esse caso me ensinou algo que não esqueci mais:

> **Performance quase nunca é sobre tecnologia nova. Na maioria das vezes, é sobre entender o problema certo.**

Antes de escalar infraestrutura, trocar stack ou "modernizar tudo":

1. Observe o fluxo
2. Meça
3. Questione chamadas desnecessárias
4. Simplifique

Muitas vezes, uma boa decisão simples vale mais do que uma arquitetura complexa mal pensada.

E naquele momento, esse foi só o começo. Muitos outros desafios ainda estavam por vir.
