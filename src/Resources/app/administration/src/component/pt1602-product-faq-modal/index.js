import template from './pt1602-product-faq-modal.html.twig';
import './pt1602-product-faq-modal.scss';

const { Component } = Shopware;

Component.register('pt1602-product-faq-modal', {
    template,

    props: {
        faq: {
            type: Object,
            required: true,
        },
    },

    computed: {
        modalTitle() {
            return this.faq.isNew()
                ? this.$t('pt1602-product-faq.detail.buttonAddFaq')
                : this.$t('pt1602-product-faq.detail.buttonEdit');
        },
    },

    methods: {
        onSave() {
            this.$emit('save');
        },

        onClose() {
            this.$emit('close');
        },
    },
});
