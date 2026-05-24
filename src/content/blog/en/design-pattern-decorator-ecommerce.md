---
title: "Design Pattern: Decorator — How I fixed constant e-commerce crashes without rewriting the whole system"
description: "This article is a follow-up to 'The day the e-commerce couldn't go down — and almost always did.' Here I show how the Decorator pattern solved a critical performance problem without touching any existing code."
pubDate: 2026-01-16
tags: ["architecture", "design-patterns", "cache", "ecommerce", "csharp", "dotnet"]
---

This article is a follow-up to [The day the e-commerce couldn't go down — and almost always did](/en/blog/ecommerce-that-couldnt-go-down).

There I described the scenario and the results. Here I'll show **how** the problem was actually solved — the design pattern that made it possible to add caching to a legacy system without rewriting anything.

## Context

The application was an ASP.NET Web Forms project following the traditional layered architecture:

- UI
- BLL
- DAL

Nothing wrong with that on its own. The problem was the naive use of the database.

After a few hours analyzing the source code and the *hot paths* — the most accessed routes like the homepage, category pages, and product pages — I reached a clear diagnosis:

- The homepage alone was making more than 70 database queries
- Repeated queries for data that almost never changed
- On every request, everything was fetched from the database again

Under peak load, the database simply couldn't keep up.

The challenge was equally clear: **fix the problem without rewriting the system, without major refactoring, and with minimal risk — this was production**.

## The proposed solution

The most obvious answer was "add a cache layer." But where, how, and without breaking anything?

That's where the **Decorator** design pattern came in.

## Why the Decorator pattern?

- Lets you add behavior to an existing class
- Without changing the original code
- While keeping the same interface
- With minimal impact on the rest of the system

The idea was simple and powerful: there was already a service interface (e.g. `IProductService`) and the current implementation would stay untouched (e.g. `ProductService`). With that in mind, I created a Decorator that:

1. Implements the same interface
2. Wraps the original service
3. Adds caching before delegating to the real service

Result: no changes to controllers, pages, or the BLL. Just a swap at the dependency injection binding.

## Implementation example

> The code below does not reflect the actual production implementation. I'm recreating the scenario for educational purposes.

### Existing interface (already in use across the system)

```csharp
public interface IProductService
{
    IEnumerable<Product> GetFeaturedProducts();
}
```

### Original implementation (no caching)

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

⚠️ This class was never modified.

### Decorator adding cache

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

### Before the Decorator

```csharp
var productService = new ProductService(repository);

gridFeaturedProducts.DataSource = productService.GetFeaturedProducts();
```

### After injecting the Decorator

```csharp
var productService =
    new CachedProductService(
        new ProductService(repository));

gridFeaturedProducts.DataSource = productService.GetFeaturedProducts();
```

Or, if a DI container was already in place (even a simple one), just updating the binding was enough. The rest of the system didn't need to know anything had changed.

## Practical results

📉 The numbers spoke for themselves:

| Metric | Before | After |
|---|---|---|
| Database queries per homepage load | 70+ | < 5 |
| Stability during campaigns | Frequent crashes | Stable |
| Functional impact | — | Zero |

## Conclusion

This was one of those cases where the problem didn't require new technology or a system rewrite — it required reading context, good judgment, and well-applied patterns.

The Decorator made it possible to:

- Solve a critical performance issue
- Protect the database
- Keep the system stable in production
- With minimal risk and maximum impact

> Architecture isn't about trends. It's about solving real problems, in a real context, with real constraints.

If you work with legacy systems, high-traffic applications, or production e-commerce, this kind of approach is invaluable.

---

Decorator pattern reference: [refactoring.guru/design-patterns/decorator](https://refactoring.guru/design-patterns/decorator/csharp/example)
