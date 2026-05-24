---
title: "The day the e-commerce couldn't go down — and almost always did"
description: "How a recurring crash problem at Centauro taught me that performance is almost never about new technology — it's about understanding the right problem."
pubDate: 2026-01-14
tags: ["performance", "architecture", "ecommerce", "cache"]
---

Early in my career as a developer, around 2010/2011, I had the opportunity — and the pressure — to work on a major account: **Centauro**, already one of Brazil's largest sporting goods retailers at the time.

We had just taken over the technical operation of their e-commerce when a recurring problem became impossible to ignore.

**Every time a big campaign went live, the site went down.**

Not "slow." Actually down.

This caused something far worse than a technical error: heavy waste of media investment, because traffic was coming in... but not converting into sales.

## The knee-jerk reaction — and why it was wrong

The first instinct from most people was to point at infrastructure:

- "We need more servers"
- "The database can't handle it"
- "Let's scale everything"

But before rushing out to buy hardware, we decided to understand the **real flow** of the e-commerce platform.

That's when the shock came.

## 70 database queries on a single page

The homepage alone was making **more than 70 database calls**.

Calls to fetch menus, categories, product carousels, configurations, featured items... All data that almost never changed.

In other words: every single page view asked the database everything from scratch. During a campaign, that became a bloodbath. The database buckled. The e-commerce went down with it.

## The simplest solution — and the most overlooked one

We didn't invent anything brilliant.

The decision was almost obvious once we did the analysis: add a **caching layer** to queries that always returned the same result.

- 1-hour cache
- Applied at the right points
- No impact on operations
- No business risk

Implementation time: under one week. Testing: load, stress, and peak-traffic scenarios.

## The results

The numbers spoke for themselves:

| Metric | Before | After |
|---|---|---|
| Database calls per page view | 70+ | < 5 |
| Stability during campaigns | Frequent crashes | Stable |
| Conversion during media peaks | Near zero | Normal |

The e-commerce stopped crashing. More importantly, the business could finally scale without burning through ad spend with nothing to show for it.

## The lesson I still carry today

That case taught me something I haven't forgotten since:

> **Performance is almost never about new technology. Most of the time, it's about understanding the right problem.**

Before scaling infrastructure, switching stacks, or "modernizing everything":

1. Observe the flow
2. Measure
3. Question unnecessary calls
4. Simplify

A good simple decision is often worth more than a poorly thought-out complex architecture.

And at that point, this was just the beginning. Many more challenges were still ahead.
