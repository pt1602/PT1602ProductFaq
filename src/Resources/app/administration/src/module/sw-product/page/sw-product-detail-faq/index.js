import template from './sw-product-detail-faq.html.twig';

const { Context, Component, Mixin, Filter } = Shopware;
const { Criteria } = Shopware.Data;

Component.register('sw-product-detail-faq', {
    template,

    inject: ['repositoryFactory'],

    mixins: [Mixin.getByName('notification')],

    data() {
        return {
            faq: [],
            isLoading: false,
            showModal: false,
            currentFaq: null,
            showDeleteModal: false,
            faqToDelete: null,
        };
    },

    computed: {
        productId() {
            return this.$route.params.id;
        },

        dateFilter() {
            return Filter.getByName('date');
        },

        faqRepository() {
            return this.repositoryFactory.create('pt1602_product_faq');
        },

        faqColumns() {
            return [
                {
                    property: 'question',
                    label: this.$t('pt1602-product-faq.detail.columnQuestion'),
                    rawData: true,
                },
                {
                    property: 'answer',
                    label: this.$t('pt1602-product-faq.detail.columnAnswer'),
                    rawData: true,
                },
            ];
        },
    },

    created() {
        this.loadFaqs();
    },

    methods: {
        loadFaqs() {
            this.isLoading = true;
            const criteria = new Criteria();
            criteria.addFilter(Criteria.equals('productId', this.productId));

            this.faqRepository
                .search(criteria, Context.api)
                .then((result) => {
                    this.faq = result;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },

        onAddFaq() {
            this.currentFaq = this.faqRepository.create(Context.api);
            this.currentFaq.productId = this.productId;
            this.showModal = true;
        },

        onEditFaq(faq) {
            this.currentFaq = faq;
            this.showModal = true;
        },

        onDeleteFaq(faq) {
            this.faqToDelete = faq;
            this.showDeleteModal = true;
        },

        onConfirmDelete() {
            if (!this.faqToDelete) {
                return;
            }

            this.faqRepository
                .delete(this.faqToDelete.id, Context.api)
                .then(() => {
                    this.createNotificationSuccess({
                        message: this.$t(
                            'pt1602-product-faq.detail.messageDeleteSuccess'
                        ),
                    });
                    this.loadFaqs();
                })
                .catch(() => {
                    this.createNotificationError({
                        message: this.$t(
                            'pt1602-product-faq.detail.messageError'
                        ),
                    });
                })
                .finally(() => {
                    this.showDeleteModal = false;
                    this.faqToDelete = null;
                });
        },

        onCancelDelete() {
            this.showDeleteModal = false;
            this.faqToDelete = null;
        },

        onSaveFaq() {
            this.faqRepository
                .save(this.currentFaq, Context.api)
                .then(() => {
                    this.createNotificationSuccess({
                        message: this.$t(
                            'pt1602-product-faq.detail.messageSaveSuccess'
                        ),
                    });
                    this.showModal = false;
                    this.loadFaqs();
                })
                .catch(() => {
                    this.createNotificationError({
                        message: this.$t(
                            'pt1602-product-faq.detail.messageError'
                        ),
                    });
                });
        },

        onCloseModal() {
            this.showModal = false;
            this.currentFaq = null;
        },
    },
});
