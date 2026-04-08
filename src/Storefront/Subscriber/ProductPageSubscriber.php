<?php declare(strict_types=1);

namespace PT1602ProductFaq\Storefront\Subscriber;

use Shopware\Storefront\Page\Product\ProductPageCriteriaEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ProductPageSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            ProductPageCriteriaEvent::class => 'onProductPageCriteriaLoaded',
        ];
    }

    public function onProductPageCriteriaLoaded(ProductPageCriteriaEvent $event): void
    {
        $event->getCriteria()->addAssociation('pt1602ProductFaq');
    }
}
