---
title: "Design Pattern: Decorator — Como resolvi quedas constantes em um E-commerce sem refatorar o sistema inteiro"
description: "Esse artigo é uma referência ao texto 'O dia em que o e-commerce não podia cair, e quase sempre caía'. Aqui mostro como o padrão Decorator resolveu um problema crítico de performance sem tocar no código existente."
pubDate: 2026-01-16
tags: ["arquitetura", "design-patterns", "cache", "ecommerce", "csharp", "dotnet"]
---

Esse artigo é uma referência ao post [O dia em que o e-commerce não podia cair, e quase sempre caía](/blog/ecommerce-que-nao-podia-cair).

Lá eu contei o cenário e os resultados. Aqui vou mostrar **como** o problema foi resolvido na prática — o padrão de projeto que tornou possível adicionar cache em um sistema legado sem reescrever nada.

## Contexto do problema

A aplicação era um ASP.NET Web Forms seguindo o padrão tradicional em camadas:

- UI
- BLL
- DAL

Nada de errado com isso por si só. O problema estava no uso ingênuo do banco de dados.

Após algumas horas analisando o código-fonte e os *hot paths* — as navegações mais acessadas como página inicial, categorias e produto — cheguei a um diagnóstico claro:

- Somente a página da HOME fazia mais de 70 consultas ao banco
- Consultas repetidas para dados praticamente estáticos
- A cada request, tudo era buscado novamente no banco

Em momentos de pico, o banco simplesmente não aguentava.

O desafio era igualmente claro: **resolver o problema sem reescrever o sistema, sem grandes refatorações e com risco mínimo — era produção**.

## A solução proposta

A solução mais óbvia seria "colocar cache". Mas onde, como e sem quebrar nada?

Foi aí que entrou o padrão de projeto **Decorator**.

## Por que o padrão Decorator?

- Permite adicionar comportamento a uma classe existente
- Sem alterar o código original
- Mantém a mesma interface
- Impacto mínimo no restante do sistema

A ideia foi simples e poderosa: já existia uma interface de serviço (ex: `IProductService`) e a implementação atual continuaria existindo (ex: `ProductService`). Com isso em mente, criei um Decorator que:

1. Implementa a mesma interface
2. Encapsula o serviço original
3. Adiciona cache antes de chamar o serviço real

Resultado: nenhuma mudança em controllers, pages ou BLL. Apenas troca da injeção de dependência.

## Exemplo de implementação

> O código abaixo não reflete o código real implementado no projeto. Estou recriando o cenário do problema para fins didáticos.

### Interface existente (já usada no sistema)

```csharp
public interface IProductService
{
    IEnumerable<Product> GetFeaturedProducts();
}
```

### Implementação original (sem cache)

```csharp
public class ProductService : IProductService
{
    private readonly ProductRepository _repository;

    public ProductService(ProductRepository repository)
    {
        _repository = repository;
    }

    public IEnumerable<Product> GetFeaturedProducts()
    {
        return _repository.GetFeaturedProductsFromDatabase();
    }
}
```

⚠️ Essa classe não foi alterada.

### Decorator adicionando cache

```csharp
public class CachedProductService : IProductService
{
    private readonly IProductService _innerService;
    private readonly ObjectCache _cache = MemoryCache.Default;

    private const string CacheKey = "featured_products";

    public CachedProductService(IProductService innerService)
    {
        _innerService = innerService;
    }

    public IEnumerable<Product> GetFeaturedProducts()
    {
        if (_cache.Contains(CacheKey))
            return (IEnumerable<Product>)_cache.Get(CacheKey);

        var products = _innerService.GetFeaturedProducts();

        _cache.Add(
            CacheKey,
            products,
            DateTimeOffset.Now.AddMinutes(10)
        );

        return products;
    }
}
```

### Antes do Decorator

```csharp
var productService = new ProductService(repository);

gridFeaturedProducts.DataSource = productService.GetFeaturedProducts();
```

### Após a injeção do Decorator

```csharp
var productService =
    new CachedProductService(
        new ProductService(repository));

gridFeaturedProducts.DataSource = productService.GetFeaturedProducts();
```

Ou, se já houvesse algum container de DI (mesmo simples), bastava alterar o binding. O restante do sistema não precisava saber de nada.

## Resultado prático

📉 Os números falaram por si:

| Métrica | Antes | Depois |
|---|---|---|
| Queries por acesso à HOME | +70 | < 5 |
| Estabilidade em campanhas | Quedas frequentes | Estável |
| Impacto funcional | — | Zero |

## Conclusão

Esse foi um daqueles casos onde o problema não exigia tecnologia nova nem reescrita do sistema — exigia leitura de contexto, bom senso e padrões bem aplicados.

O Decorator permitiu:

- Resolver um problema crítico de performance
- Proteger o banco de dados
- Manter o sistema estável em produção
- Com mínimo risco e máximo impacto

> Arquitetura não é sobre moda. É sobre resolver problemas reais, no contexto real, com as restrições reais.

Se você atua com sistemas legados, alto tráfego ou e-commerce em produção, esse tipo de abordagem vale ouro.

---

Referência do padrão Decorator: [refactoring.guru/pt-br/design-patterns/decorator](https://refactoring.guru/pt-br/design-patterns/decorator/csharp/example)
