---
title: "Solve the problem. Write code if necessary."
description: "How we delivered real value to one of our key e-commerce clients without building a single new feature."
pubDate: 2026-02-12
tags: ["engineering", "architecture", "ecommerce", "automation", "leadership"]
---

There is a silent trap that many technology teams fall into without realizing it: the belief that every problem requires a new system or a new feature.

A few years ago, I experienced a situation with one of our key e-commerce clients that reinforced one of my most important convictions as a CTO.

## The problem wasn't technical. It was about time.

The marketing team needed to collect customer reviews after order delivery. They submitted a request to build a new feature that would trigger a review request as soon as an order was marked as delivered in the back office.

The goal was clear: generate real insights to improve the experience across the site, app, logistics, and support.

But there was a classic blocker. The engineering team was already at capacity:

- a packed backlog
- critical ongoing demands
- keeping the operation running
- committed new features
- integrations in progress

There was no room to build something new. The alternative was to purchase an NPS tool, but that would mean:

- budget approval
- procurement process
- internal sign-off
- vendor negotiation
- deployment and integration

Weeks. Maybe months. The problem needed to be solved now.

Given that scenario, the right question was: **"How can we solve this with what we already have?"**

That shift in mindset is where engineering starts generating real value.

## The solution didn't involve writing code

After a meeting with the client's team to fully understand the problem, I evaluated the options we had available.

We were already using **Apache NiFi** in the client's infrastructure for integrations and automations. So I built an extremely simple workflow that did three things:

1. Identified orders marked as delivered
2. Captured the customer's email address
3. Automatically sent an email with a link to leave a review

And the form? It was created by the marketing team themselves using **Google Forms**, fully customized with the company's visual identity.

Simple. Direct. No friction.

**Total implementation time: under one hour.**

No backlog. No project. No sprint. No deploy.

In less than an hour, the solution was already in production.

## The result

The workflow ran for an entire month. Result: **more than 7,000 reviews collected**.

7,000 customers sharing their real experience, generating valuable insights about:

- browsing experience
- delivery quality
- friction points in the journey
- clear opportunities for improvement

All of this with a solution built in less time than many meetings take to wrap up.

## Engineering's true role isn't to write code

It's to remove blockers.

It's to accelerate learning.

It's to deliver value with speed.

Many teams stay stuck waiting for the perfect moment, the perfect tool, the perfect project. But companies that grow fast learn fast. And they learn fast because they **execute fast**.

Modern engineering isn't about complexity. It's about pragmatism. It's about impact.

> That's the difference between technology as a cost and technology as a competitive advantage.

The answer isn't always more software or more features. Sometimes it's more clarity. More speed. And more execution.
