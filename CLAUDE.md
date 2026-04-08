# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a **Shopware 6.7 plugin** (`PT1602ProductFaq`) that adds a FAQ (Frequently Asked Questions) tab to the product detail page in the Shopware administration. FAQs are stored per product in a custom `pt1602_product_faq` database table.

## Commands

All commands are run from the **Shopware root directory** (typically `/home/pt1602/projects/sw67`), not from the plugin directory.

**Run plugin tests:**
```bash
./vendor/bin/phpunit --testsuite "PT1602ProductFaq Testsuite"
```

**Run a single test file:**
```bash
./vendor/bin/phpunit custom/plugins/PT1602ProductFaq/tests/path/to/TestFile.php
```

**Build the administration frontend:**
```bash
./bin/build-administration.sh
```

**Run migrations:**
```bash
./bin/console database:migrate PT1602ProductFaq --all
```

**Clear cache after PHP changes:**
```bash
./bin/console cache:clear
```

## Architecture

### PHP notes

The Shopware environment runs **PHP < 8.3**. Do not use typed class constants (`public const string FOO = ...`) — use untyped constants (`public const FOO = ...`) instead.

### PHP Backend

- **`src/PT1602ProductFaq.php`** — Plugin entry point (extends `Shopware\Core\Framework\Plugin`).
- **`src/Core/Content/ProductFaq/`** — DAL entity for `pt1602_product_faq`: Definition, Entity, Collection classes.
- **`src/Core/Content/Product/ProductExtension.php`** — Extends Shopware's `ProductDefinition` with a `OneToMany` association named `pt1602ProductFaq`, making FAQs accessible via `$product->getExtension('pt1602ProductFaq')`.
- **`src/Migration/`** — Database migration creating the `pt1602_product_faq` table with a cascading FK to `product`.
- **`src/Resources/config/services.xml`** — Registers `ProductFaqDefinition` (tag: `shopware.entity.definition`) and `ProductExtension` (tag: `shopware.entity.extension`).

### JavaScript Administration

All JS lives in `src/Resources/app/administration/src/`:

- **`main.js`** — Entry point; imports the `sw-product` module override and the modal component.
- **`module/sw-product/`** — Extends the core `sw-product` module:
  - `index.js` — Registers a new child route `sw.product.detail.productFaq` at path `/sw/product/detail/:id?/product-faq`.
  - `page/sw-product-detail/` — Overrides `sw-product-detail` to add the `pt1602ProductFaq` association to the product criteria (so FAQ data is loaded with the product).
  - `page/sw-product-detail-faq/` — New page component (`sw-product-detail-faq`) that lists, creates, edits, and deletes FAQs via `repositoryFactory.create('pt1602_product_faq')`.
- **`component/pt1602-product-faq-modal/`** — Modal component for creating/editing a single FAQ entry.
- **`snippet/`** — i18n strings in `de-DE.json` and `en-GB.json` under the `pt1602-product-faq` namespace.

### Data flow

The FAQ tab appears in the Shopware admin product detail view. The `sw-product-detail-faq` page component fetches FAQs directly via the DAL repository, filtered by `productId`. Save/delete operations also go through the repository. The modal (`pt1602-product-faq-modal`) receives the current FAQ entity as a prop and emits `save`/`close` events.
