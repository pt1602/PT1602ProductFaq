<?php declare(strict_types=1);

namespace PT1602ProductFaq\Core\Content\ProductFaq;

use Shopware\Core\Content\Product\ProductEntity;
use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;

class ProductFaqEntity extends Entity
{
    use EntityIdTrait;

    protected string $productId;

    protected string $productVersionId;

    protected string $question;
    protected string $answer;

    protected ?ProductEntity $product = null;

    public function getProductId(): string
    {
        return $this->productId;
    }

    public function setProductId(string $productId): void
    {
        $this->productId = $productId;
    }

    public function getProductVersionId(): string
    {
        return $this->productVersionId;
    }

    public function setProductVersionId(string $productVersionId): void
    {
        $this->productVersionId = $productVersionId;
    }

    public function getQuestion(): string
    {
        return $this->question;
    }

    public function setQuestion(string $question): void
    {
        $this->question = $question;
    }

    public function getAnswer(): string
    {
        return $this->answer;
    }

    public function setAnswer(string $answer): void
    {
        $this->answer = $answer;
    }

    public function getProduct(): ?ProductEntity
    {
        return $this->product;
    }

    public function setProduct(?ProductEntity $product): void
    {
        $this->product = $product;
    }
}
