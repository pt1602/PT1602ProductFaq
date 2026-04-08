import './page/sw-product-detail';
import './page/sw-product-detail-faq';

const productModule = Shopware.Module.getModuleRegistry().get('sw-product');

if (productModule) {
    productModule.routes.get('sw.product.detail').children.push({
        name: 'sw.product.detail.productFaq',
        path: '/sw/product/detail/:id?/product-faq',
        component: 'sw-product-detail-faq',
        meta: {
            parentPath: 'sw.product.index',
            privilege: 'product.viewer',
        },
    });
}
