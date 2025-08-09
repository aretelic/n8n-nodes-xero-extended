"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoiceFields = exports.invoiceOperations = void 0;
exports.invoiceOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['invoice'],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a invoice',
                action: 'Create an invoice',
            },
            {
                name: 'Get',
                value: 'get',
                description: 'Get a invoice',
                action: 'Get an invoice',
            },
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'Get many invoices',
                action: 'Get many invoices',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update a invoice',
                action: 'Update an invoice',
            },
        ],
        default: 'create',
    },
];
exports.invoiceFields = [
    {
        displayName: 'Organization Name or ID',
        name: 'organizationId',
        type: 'options',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        typeOptions: {
            loadOptionsMethod: 'getTenants',
        },
        default: '',
        displayOptions: {
            show: {
                resource: ['invoice'],
                operation: ['create'],
            },
        },
        required: true,
    },
    {
        displayName: 'Type',
        name: 'type',
        type: 'options',
        options: [
            {
                name: 'Bill',
                value: 'ACCPAY',
                description: 'Accounts Payable or supplier invoice',
            },
            {
                name: 'Sales Invoice',
                value: 'ACCREC',
                description: 'Accounts Receivable or customer invoice',
            },
        ],
        default: 'ACCPAY',
        displayOptions: {
            show: {
                resource: ['invoice'],
                operation: ['create'],
            },
        },
        required: true,
        description: 'Invoice Type',
    },
    {
        displayName: 'Contact Name or ID',
        name: 'contactId',
        type: 'options',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        typeOptions: {
            loadOptionsMethod: 'getContacts',
            loadOptionsDependsOn: ['organizationId'],
        },
        default: '',
        displayOptions: {
            show: {
                resource: ['invoice'],
                operation: ['create'],
            },
        },
        required: true,
    },
    {
        displayName: 'Line Items',
        name: 'lineItemsUi',
        placeholder: 'Add Line Item',
        type: 'fixedCollection',
        default: {},
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                resource: ['invoice'],
                operation: ['create'],
            },
        },
        description: 'Line item data',
        options: [
            {
                name: 'lineItemsValues',
                displayName: 'Line Item',
                values: [
                    {
                        displayName: 'Account Code Name or ID',
                        name: 'accountCode',
                        type: 'options',
                        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                        default: '',
                    },
                    {
                        displayName: 'Description',
                        name: 'description',
                        type: 'string',
                        default: '',
                        description: 'A line item with just a description',
                    },
                    {
                        displayName: 'Discount Rate',
                        name: 'discountRate',
                        type: 'string',
                        default: '',
                        description: 'Percentage discount or discount amount being applied to a line item. Only supported on ACCREC invoices	-	ACCPAY invoices and credit notes in Xero do not support discounts.',
                    },
                    {
                        displayName: 'Item Code Name or ID',
                        name: 'itemCode',
                        type: 'options',
                        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                        default: '',
                    },
                    {
                        displayName: 'Line Amount',
                        name: 'lineAmount',
                        type: 'string',
                        default: '',
                        description: 'The line amount reflects the discounted price if a DiscountRate has been used',
                    },
                    {
                        displayName: 'Quantity',
                        name: 'quantity',
                        type: 'number',
                        default: 1,
                        description: 'LineItem Quantity',
                    },
                    {
                        displayName: 'Tax Amount',
                        name: 'taxAmount',
                        type: 'string',
                        default: '',
                        description: 'The tax amount is auto calculated as a percentage of the line amount based on the tax rate',
                    },
                    {
                        displayName: 'Tax Type',
                        name: 'taxType',
                        type: 'options',
                        options: [
                            {
                                name: 'Tax on Purchases',
                                value: 'INPUT',
                            },
                            {
                                name: 'Tax Exempt',
                                value: 'NONE',
                            },
                            {
                                name: 'Tax on Sales',
                                value: 'OUTPUT',
                            },
                            {
                                name: 'Sales Tax on Imports',
                                value: 'GSTONIMPORTS',
                            },
                        ],
                        default: 'INPUT',
                        required: true,
                    },
                    {
                        displayName: 'Tracking',
                        name: 'trackingUi',
                        placeholder: 'Add Tracking',
                        description: 'Any LineItem can have a maximum of 2 TrackingCategory elements',
                        type: 'fixedCollection',
                        default: {},
                        options: [
                            {
                                name: 'trackingValues',
                                displayName: 'Tracking',
                                values: [
                                    {
                                        displayName: 'Name',
                                        name: 'name',
                                        type: 'string',
                                        default: '',
                                        description: 'Name of the tracking category',
                                    },
                                    {
                                        displayName: 'Option',
                                        name: 'option',
                                        type: 'string',
                                        default: '',
                                        description: 'Name of the option',
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        displayName: 'Unit Amount',
                        name: 'unitAmount',
                        type: 'string',
                        default: '',
                        description: 'Lineitem unit amount. By default, unit amount will be rounded to two decimal places.',
                    },
                ],
            },
        ],
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['invoice'],
                operation: ['create'],
            },
        },
        options: [
            {
                displayName: 'Branding Theme Name or ID',
                name: 'brandingThemeId',
                type: 'options',
                description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                typeOptions: {
                    loadOptionsMethod: 'getBrandingThemes',
                    loadOptionsDependsOn: ['organizationId'],
                },
                default: '',
            },
            {
                displayName: 'Currency Name or ID',
                name: 'currency',
                type: 'options',
                description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                typeOptions: {
                    loadOptionsMethod: 'getCurrencies',
                    loadOptionsDependsOn: ['organizationId'],
                },
                default: '',
            },
            {
                displayName: 'Currency Rate',
                name: 'currencyRate',
                type: 'string',
                default: '',
                description: 'The currency rate for a multicurrency invoice. If no rate is specified, the XE.com day rate is used.',
            },
            {
                displayName: 'Date',
                name: 'date',
                type: 'dateTime',
                default: '',
                description: 'Date invoice was issued - YYYY-MM-DD. If the Date element is not specified it will default to the current date based on the timezone setting of the organisation.',
            },
            {
                displayName: 'Due Date',
                name: 'dueDate',
                type: 'dateTime',
                default: '',
                description: 'Date invoice is due - YYYY-MM-DD',
            },
            {
                displayName: 'Expected Payment Date',
                name: 'expectedPaymentDate',
                type: 'dateTime',
                default: '',
                description: 'Shown on sales invoices (Accounts Receivable) when this has been set',
            },
            {
                displayName: 'Invoice Number',
                name: 'invoiceNumber',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Line Amount Type',
                name: 'lineAmountType',
                type: 'options',
                options: [
                    {
                        name: 'Exclusive',
                        value: 'Exclusive',
                        description: 'Line items are exclusive of tax',
                    },
                    {
                        name: 'Inclusive',
                        value: 'Inclusive',
                        description: 'Line items are inclusive tax',
                    },
                    {
                        name: 'NoTax',
                        value: 'NoTax',
                        description: 'Line have no tax',
                    },
                ],
                default: 'Exclusive',
            },
            {
                displayName: 'Planned Payment Date',
                name: 'plannedPaymentDate',
                type: 'dateTime',
                default: '',
                description: 'Shown on bills (Accounts Payable) when this has been set',
            },
            {
                displayName: 'Reference',
                name: 'reference',
                type: 'string',
                default: '',
                description: 'ACCREC only - additional reference number (max length = 255)',
            },
            {
                displayName: 'Send To Contact',
                name: 'sendToContact',
                type: 'boolean',
                default: false,
                description: 'Whether the invoice in the Xero app should be marked as "sent". This can be set only on invoices that have been approved.',
            },
            {
                displayName: 'Status',
                name: 'status',
                type: 'options',
                options: [
                    {
                        name: 'Draft',
                        value: 'DRAFT',
                    },
                    {
                        name: 'Submitted',
                        value: 'SUBMITTED',
                    },
                    {
                        name: 'Authorised',
                        value: 'AUTHORISED',
                    },
                ],
                default: 'DRAFT',
            },
            {
                displayName: 'URL',
                name: 'url',
                type: 'string',
                default: '',
                description: 'URL link to a source document - shown as "Go to [appName]" in the Xero app',
            },
        ],
    },
    {
        displayName: 'Organization Name or ID',
        name: 'organizationId',
        type: 'options',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        typeOptions: {
            loadOptionsMethod: 'getTenants',
        },
        default: '',
        displayOptions: {
            show: {
                resource: ['invoice'],
                operation: ['update'],
            },
        },
        required: true,
    },
    {
        displayName: 'Invoice ID',
        name: 'invoiceId',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['invoice'],
                operation: ['update'],
            },
        },
    },
    {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['invoice'],
                operation: ['update'],
            },
        },
        options: [
            {
                displayName: 'Branding Theme Name or ID',
                name: 'brandingThemeId',
                type: 'options',
                description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                typeOptions: {
                    loadOptionsMethod: 'getBrandingThemes',
                    loadOptionsDependsOn: ['organizationId'],
                },
                default: '',
            },
            {
                displayName: 'Contact ID',
                name: 'contactId',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Currency Name or ID',
                name: 'currency',
                type: 'options',
                description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                typeOptions: {
                    loadOptionsMethod: 'getCurrencies',
                    loadOptionsDependsOn: ['organizationId'],
                },
                default: '',
            },
            {
                displayName: 'Currency Rate',
                name: 'currencyRate',
                type: 'string',
                default: '',
                description: 'The currency rate for a multicurrency invoice. If no rate is specified, the XE.com day rate is used.',
            },
            {
                displayName: 'Date',
                name: 'date',
                type: 'dateTime',
                default: '',
                description: 'Date invoice was issued - YYYY-MM-DD. If the Date element is not specified it will default to the current date based on the timezone setting of the organisation.',
            },
            {
                displayName: 'Due Date',
                name: 'dueDate',
                type: 'dateTime',
                default: '',
                description: 'Date invoice is due - YYYY-MM-DD',
            },
            {
                displayName: 'Expected Payment Date',
                name: 'expectedPaymentDate',
                type: 'dateTime',
                default: '',
                description: 'Shown on sales invoices (Accounts Receivable) when this has been set',
            },
            {
                displayName: 'Invoice Number',
                name: 'invoiceNumber',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Line Amount Type',
                name: 'lineAmountType',
                type: 'options',
                options: [
                    {
                        name: 'Exclusive',
                        value: 'Exclusive',
                        description: 'Line items are exclusive of tax',
                    },
                    {
                        name: 'Inclusive',
                        value: 'Inclusive',
                        description: 'Line items are inclusive tax',
                    },
                    {
                        name: 'NoTax',
                        value: 'NoTax',
                        description: 'Line have no tax',
                    },
                ],
                default: 'Exclusive',
            },
            {
                displayName: 'Line Items',
                name: 'lineItemsUi',
                placeholder: 'Add Line Item',
                type: 'fixedCollection',
                default: {},
                typeOptions: {
                    multipleValues: true,
                },
                description: 'Line item data',
                options: [
                    {
                        name: 'lineItemsValues',
                        displayName: 'Line Item',
                        values: [
                            {
                                displayName: 'Account Code Name or ID',
                                name: 'accountCode',
                                type: 'options',
                                description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                                default: '',
                            },
                            {
                                displayName: 'Description',
                                name: 'description',
                                type: 'string',
                                default: '',
                                description: 'A line item with just a description',
                            },
                            {
                                displayName: 'Discount Rate',
                                name: 'discountRate',
                                type: 'string',
                                default: '',
                                description: 'Percentage discount or discount amount being applied to a line item. Only supported on ACCREC invoices	-	ACCPAY invoices and credit notes in Xero do not support discounts.',
                            },
                            {
                                displayName: 'Item Code Name or ID',
                                name: 'itemCode',
                                type: 'options',
                                description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                                default: '',
                            },
                            {
                                displayName: 'Line Amount',
                                name: 'lineAmount',
                                type: 'string',
                                default: '',
                                description: 'The line amount reflects the discounted price if a DiscountRate has been used',
                            },
                            {
                                displayName: 'Line Item ID',
                                name: 'lineItemId',
                                type: 'string',
                                default: '',
                                description: 'The Xero generated identifier for a LineItem',
                            },
                            {
                                displayName: 'Quantity',
                                name: 'quantity',
                                type: 'number',
                                default: 1,
                                description: 'LineItem Quantity',
                            },
                            {
                                displayName: 'Tax Amount',
                                name: 'taxAmount',
                                type: 'string',
                                default: '',
                                description: 'The tax amount is auto calculated as a percentage of the line amount based on the tax rate',
                            },
                            {
                                displayName: 'Tax Type',
                                name: 'taxType',
                                type: 'options',
                                options: [
                                    {
                                        name: 'Tax on Purchases',
                                        value: 'INPUT',
                                    },
                                    {
                                        name: 'Tax Exempt',
                                        value: 'NONE',
                                    },
                                    {
                                        name: 'Tax on Sales',
                                        value: 'OUTPUT',
                                    },
                                    {
                                        name: 'Sales Tax on Imports',
                                        value: 'GSTONIMPORTS',
                                    },
                                ],
                                default: 'INPUT',
                                required: true,
                            },
                            {
                                displayName: 'Unit Amount',
                                name: 'unitAmount',
                                type: 'string',
                                default: '',
                                description: 'Lineitem unit amount. By default, unit amount will be rounded to two decimal places.',
                            },
                        ],
                    },
                ],
            },
            {
                displayName: 'Planned Payment Date',
                name: 'plannedPaymentDate',
                type: 'dateTime',
                default: '',
                description: 'Shown on bills (Accounts Payable) when this has been set',
            },
            {
                displayName: 'Reference',
                name: 'reference',
                type: 'string',
                default: '',
                description: 'ACCREC only - additional reference number (max length = 255)',
            },
            {
                displayName: 'Send To Contact',
                name: 'sendToContact',
                type: 'boolean',
                default: false,
                description: 'Whether the invoice in the Xero app should be marked as "sent". This can be set only on invoices that have been approved.',
            },
            {
                displayName: 'Status',
                name: 'status',
                type: 'options',
                options: [
                    {
                        name: 'Draft',
                        value: 'DRAFT',
                    },
                    {
                        name: 'Submitted',
                        value: 'SUBMITTED',
                    },
                    {
                        name: 'Authorised',
                        value: 'AUTHORISED',
                    },
                ],
                default: 'DRAFT',
            },
            {
                displayName: 'URL',
                name: 'url',
                type: 'string',
                default: '',
                description: 'URL link to a source document - shown as "Go to [appName]" in the Xero app',
            },
        ],
    },
    {
        displayName: 'Organization Name or ID',
        name: 'organizationId',
        type: 'options',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        typeOptions: {
            loadOptionsMethod: 'getTenants',
        },
        default: '',
        displayOptions: {
            show: {
                resource: ['invoice'],
                operation: ['get'],
            },
        },
        required: true,
    },
    {
        displayName: 'Invoice ID',
        name: 'invoiceId',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['invoice'],
                operation: ['get'],
            },
        },
    },
    {
        displayName: 'Organization Name or ID',
        name: 'organizationId',
        type: 'options',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        typeOptions: {
            loadOptionsMethod: 'getTenants',
        },
        default: '',
        displayOptions: {
            show: {
                resource: ['invoice'],
                operation: ['getAll'],
            },
        },
        required: true,
    },
    {
        displayName: 'Options',
        name: 'options',
        type: 'collection',
        placeholder: 'Add option',
        default: {},
        displayOptions: {
            show: {
                resource: ['invoice'],
                operation: ['getAll'],
            },
        },
        options: [
            {
                displayName: 'Created By My App',
                name: 'createdByMyApp',
                type: 'boolean',
                default: false,
                description: "Whether you'll only retrieve Invoices created by your app",
            },
            {
                displayName: 'Custom Where',
                name: 'customWhere',
                type: 'string',
                placeholder: 'Status=="AUTHORISED" && Type=="ACCREC"',
                default: '',
                description: 'Advanced: Custom where clause. This will override the Where Filters above if provided. Examples: Status=="AUTHORISED", Contact.ContactID=guid("96988e67-ecf9-466d-bfbf-0afa1725a649"), Date>=DateTime(2024,01,01)',
            },
            {
                displayName: 'Order By',
                name: 'orderBy',
                type: 'string',
                placeholder: 'InvoiceID',
                default: '',
                description: 'Order by any element returned',
            },
            {
                displayName: 'Search Term',
                name: 'searchTerm',
                type: 'string',
                placeholder: '',
                default: '',
                description: 'Search parameter that performs a case-insensitive text search across the fields: InvoiceNumber, Reference',
            },
            {
                displayName: 'Sort Order',
                name: 'sortOrder',
                type: 'options',
                options: [
                    {
                        name: 'Asc',
                        value: 'ASC',
                    },
                    {
                        name: 'Desc',
                        value: 'DESC',
                    },
                ],
                default: 'ASC',
            },
            {
                displayName: 'Statuses',
                name: 'statuses',
                type: 'multiOptions',
                options: [
                    {
                        name: 'Draft',
                        value: 'DRAFT',
                    },
                    {
                        name: 'Submitted',
                        value: 'SUBMITTED',
                    },
                    {
                        name: 'Authorised',
                        value: 'AUTHORISED',
                    },
                ],
                default: [],
            },
            {
                displayName: 'Summary Only',
                name: 'summaryOnly',
                type: 'boolean',
                default: false,
                description: 'Whether to return lightweight fields, excluding computation-heavy fields from the response, making the API calls quick and efficient',
            },
            {
                displayName: 'Where Filters',
                name: 'whereFilters',
                type: 'fixedCollection',
                placeholder: 'Add Filter',
                default: {},
                typeOptions: {
                    multipleValues: true,
                },
                description: 'Filter invoices based on specific criteria',
                options: [
                    {
                        name: 'filters',
                        displayName: 'Filter',
                        values: [
                            {
                                displayName: 'Contact Name',
                                name: 'contactNameValue',
                                type: 'string',
                                default: '',
                                placeholder: 'ABC Limited',
                                description: 'Contact name to filter by',
                                displayOptions: {
                                    show: {
                                        field: ['Contact.Name'],
                                    },
                                },
                            },
                            {
                                displayName: 'Contact Name or ID',
                                name: 'contactIdValue',
                                type: 'options',
                                description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                                typeOptions: {
                                    loadOptionsMethod: 'getContacts',
                                    loadOptionsDependsOn: ['/organizationId'],
                                },
                                default: '',
                                displayOptions: {
                                    show: {
                                        field: ['Contact.ContactID'],
                                    },
                                },
                            },
                            {
                                displayName: 'Contact Number',
                                name: 'contactNumberValue',
                                type: 'string',
                                default: '',
                                placeholder: 'ID001',
                                description: 'Contact number to filter by',
                                displayOptions: {
                                    show: {
                                        field: ['Contact.ContactNumber'],
                                    },
                                },
                            },
                            {
                                displayName: 'Date From',
                                name: 'dateFromValue',
                                type: 'dateTime',
                                default: '',
                                description: 'Filter invoices from this date',
                                displayOptions: {
                                    show: {
                                        field: ['DateRange'],
                                    },
                                },
                            },
                            {
                                displayName: 'Date To',
                                name: 'dateToValue',
                                type: 'dateTime',
                                default: '',
                                description: 'Filter invoices to this date',
                                displayOptions: {
                                    show: {
                                        field: ['DateRange'],
                                    },
                                },
                            },
                            {
                                displayName: 'Due Date From',
                                name: 'dueDateFromValue',
                                type: 'dateTime',
                                default: '',
                                description: 'Filter invoices with due date from this date',
                                displayOptions: {
                                    show: {
                                        field: ['DueDateRange'],
                                    },
                                },
                            },
                            {
                                displayName: 'Due Date To',
                                name: 'dueDateToValue',
                                type: 'dateTime',
                                default: '',
                                description: 'Filter invoices with due date to this date',
                                displayOptions: {
                                    show: {
                                        field: ['DueDateRange'],
                                    },
                                },
                            },
                            {
                                displayName: 'Field',
                                name: 'field',
                                type: 'options',
                                options: [
                                    {
                                        name: 'Amount Due Range',
                                        value: 'AmountDueRange',
                                    },
                                    {
                                        name: 'Amount Paid Range',
                                        value: 'AmountPaidRange',
                                    },
                                    {
                                        name: 'Contact ID',
                                        value: 'Contact.ContactID',
                                    },
                                    {
                                        name: 'Contact Name',
                                        value: 'Contact.Name',
                                    },
                                    {
                                        name: 'Contact Number',
                                        value: 'Contact.ContactNumber',
                                    },
                                    {
                                        name: 'Date Range',
                                        value: 'DateRange',
                                    },
                                    {
                                        name: 'Due Date Range',
                                        value: 'DueDateRange',
                                    },
                                    {
                                        name: 'Invoice ID',
                                        value: 'InvoiceId',
                                    },
                                    {
                                        name: 'Invoice Number',
                                        value: 'InvoiceNumber',
                                    },
                                    {
                                        name: 'Reference',
                                        value: 'Reference',
                                    },
                                    {
                                        name: 'Status',
                                        value: 'Status',
                                    },
                                    {
                                        name: 'Type',
                                        value: 'Type',
                                    },
                                ],
                                default: 'Status',
                                description: 'Field to filter on',
                            },
                            {
                                displayName: 'Invoice ID',
                                name: 'invoiceIdValue',
                                type: 'string',
                                default: '',
                                placeholder: '220ddca8-3144-4085-9a88-2d72c5133734',
                                description: 'Invoice GUID to filter by',
                                displayOptions: {
                                    show: {
                                        field: ['InvoiceId'],
                                    },
                                },
                            },
                            {
                                displayName: 'Invoice Number',
                                name: 'invoiceNumberValue',
                                type: 'string',
                                default: '',
                                placeholder: 'INV-001',
                                description: 'Invoice number to filter by',
                                displayOptions: {
                                    show: {
                                        field: ['InvoiceNumber'],
                                    },
                                },
                            },
                            {
                                displayName: 'Maximum Amount Due',
                                name: 'amountDueMaxValue',
                                type: 'number',
                                default: '',
                                description: 'Filter invoices with amount due less than or equal to this amount',
                                displayOptions: {
                                    show: {
                                        field: ['AmountDueRange'],
                                    },
                                },
                            },
                            {
                                displayName: 'Maximum Amount Paid',
                                name: 'amountPaidMaxValue',
                                type: 'number',
                                default: '',
                                description: 'Filter invoices with amount paid less than or equal to this amount',
                                displayOptions: {
                                    show: {
                                        field: ['AmountPaidRange'],
                                    },
                                },
                            },
                            {
                                displayName: 'Minimum Amount Due',
                                name: 'amountDueMinValue',
                                type: 'number',
                                default: '',
                                description: 'Filter invoices with amount due greater than or equal to this amount',
                                displayOptions: {
                                    show: {
                                        field: ['AmountDueRange'],
                                    },
                                },
                            },
                            {
                                displayName: 'Minimum Amount Paid',
                                name: 'amountPaidMinValue',
                                type: 'number',
                                default: '',
                                description: 'Filter invoices with amount paid greater than or equal to this amount',
                                displayOptions: {
                                    show: {
                                        field: ['AmountPaidRange'],
                                    },
                                },
                            },
                            {
                                displayName: 'Reference',
                                name: 'referenceValue',
                                type: 'string',
                                default: '',
                                placeholder: 'REF12',
                                description: 'Invoice reference to filter by',
                                displayOptions: {
                                    show: {
                                        field: ['Reference'],
                                    },
                                },
                            },
                            {
                                displayName: 'Status',
                                name: 'statusValue',
                                type: 'options',
                                options: [
                                    {
                                        name: 'Authorised',
                                        value: 'AUTHORISED',
                                    },
                                    {
                                        name: 'Deleted',
                                        value: 'DELETED',
                                    },
                                    {
                                        name: 'Draft',
                                        value: 'DRAFT',
                                    },
                                    {
                                        name: 'Overpaid',
                                        value: 'OVERPAID',
                                    },
                                    {
                                        name: 'Paid',
                                        value: 'PAID',
                                    },
                                    {
                                        name: 'Partially Paid',
                                        value: 'PARTIALLYPAID',
                                    },
                                    {
                                        name: 'Submitted',
                                        value: 'SUBMITTED',
                                    },
                                    {
                                        name: 'Voided',
                                        value: 'VOIDED',
                                    },
                                ],
                                default: 'AUTHORISED',
                                description: 'Status to filter by',
                                displayOptions: {
                                    show: {
                                        field: ['Status'],
                                    },
                                },
                            },
                            {
                                displayName: 'Type',
                                name: 'typeValue',
                                type: 'options',
                                options: [
                                    {
                                        name: 'Sales Invoice',
                                        value: 'ACCREC',
                                    },
                                    {
                                        name: 'Bill',
                                        value: 'ACCPAY',
                                    },
                                ],
                                default: 'ACCREC',
                                description: 'Invoice type to filter by',
                                displayOptions: {
                                    show: {
                                        field: ['Type'],
                                    },
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
//# sourceMappingURL=InvoiceDescription.js.map