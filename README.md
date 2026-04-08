# PT1602ProductFaq

A Shopware 6 plugin that adds a **FAQ (Frequently Asked Questions)** tab to the product detail page in the administration. Shop managers can create, edit, and delete Q&A entries per product directly from the admin UI.

## Requirements

- Shopware 6.7.x

## Installation

1. Copy the plugin into `custom/plugins/PT1602ProductFaq` within your Shopware installation.
2. Install and activate the plugin:
   ```bash
   ./bin/console plugin:install --activate PT1602ProductFaq
   ```
3. Run the database migration:
   ```bash
   ./bin/console database:migrate PT1602ProductFaq --all
   ```
4. Build the administration assets:
   ```bash
   ./bin/build-administration.sh
   ```
5. Clear the cache:
   ```bash
   ./bin/console cache:clear
   ```

## Features

- New **FAQ tab** on every product detail page in the Shopware administration.
- Create, edit, and delete FAQ entries (question + answer) per product.
- FAQ data is stored in a dedicated `pt1602_product_faq` table, linked to the product via a cascading foreign key.
- Available in **English** and **German**.

## License

MIT
