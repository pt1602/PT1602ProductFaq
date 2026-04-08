<?php declare(strict_types=1);

namespace PT1602ProductFaq\Core\Content\Product;

use PT1602ProductFaq\Core\Content\ProductFaq\ProductFaqDefinition;
use Shopware\Core\Content\Product\ProductDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityExtension;
use Shopware\Core\Framework\DataAbstractionLayer\Field\OneToManyAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;

class ProductExtension extends EntityExtension
{
    public const string EXTENSION_NAME = 'pt1602ProductFaq';

    public function extendFields(FieldCollection $collection): void
    {
        $collection->add(
            new OneToManyAssociationField(
                self::EXTENSION_NAME,
                ProductFaqDefinition::class,
                'product_id'
            )
        );
    }

    public function getEntityName(): string
    {
        return ProductDefinition::ENTITY_NAME;
    }
}
