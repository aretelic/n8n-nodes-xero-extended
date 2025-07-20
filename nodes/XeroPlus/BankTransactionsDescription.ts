import type { INodeProperties } from 'n8n-workflow';

export const banktransactionsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['banktransactions'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a bank transaction',
				action: 'Create a bank transaction',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a bank transaction',
				action: 'Get a bank transaction',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many bank transactions',
				action: 'Get many bank transactions',
			},
            /*
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a bank transaction',
				action: 'Delete a bank transaction',
			},
            */
		],
		default: 'create',
	},
];

export const banktransactionsFields: INodeProperties[] = [
    /* -------------------------------------------------------------------------- */
    /*                                banktransactions:create                     */
    /* -------------------------------------------------------------------------- */
    {
        displayName: 'Organization Name or ID',
        name: 'organizationId',
        type: 'options',
        description:
            'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        typeOptions: {
            loadOptionsMethod: 'getTenants',
        },
        default: '',
        displayOptions: {
            show: {
                resource: ['banktransactions'],
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
            { name: 'Receive Money', value: 'RECEIVE' },
            { name: 'Receive Overpayment', value: 'RECEIVE-OVERPAYMENT' },
            { name: 'Receive Prepayment', value: 'RECEIVE-PREPAYMENT' },
            { name: 'Spend Money', value: 'SPEND' },
            { name: 'Spend Overpayment', value: 'SPEND-OVERPAYMENT' },
            { name: 'Spend Prepayment', value: 'SPEND-PREPAYMENT' },
        ],
        default: 'SPEND',
        description: 'Type of bank transaction',
        displayOptions: {
            show: {
                resource: ['banktransactions'],
                operation: ['create'],
            },
        },
        required: true,
    },
    {
        displayName: 'Contact Name or ID',
        name: 'contactId',
        type: 'options',
        description:
            'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        typeOptions: {
            loadOptionsMethod: 'getContacts',
            loadOptionsDependsOn: ['organizationId'],
        },
        default: '',
        displayOptions: {
            show: {
                resource: ['banktransactions'],
                operation: ['create'],
            },
        },
        required: true,
    },
    {
        displayName: 'Bank Account Name or ID',
        name: 'bankAccountId',
        type: 'options',
        description:
            'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        typeOptions: {
            loadOptionsMethod: 'getBankAccounts',
            loadOptionsDependsOn: ['organizationId'],
        },
        default: '',
        displayOptions: {
            show: {
                resource: ['banktransactions'],
                operation: ['create'],
            },
        },
        required: true,
    },
    {
        displayName: 'Line Items Input Method',
        name: 'lineItemsInputMethod',
        type: 'options',
        options: [
            {
                name: 'Using UI',
                value: 'ui',
                description: 'Add line items one by one using the UI',
            },
            {
                name: 'Using JSON',
                value: 'json',
                description: 'Provide line items as a JSON array',
            },
        ],
        default: 'ui',
        displayOptions: {
            show: {
                resource: ['banktransactions'],
                operation: ['create'],
            },
        },
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
                resource: ['banktransactions'],
                operation: ['create'],
                lineItemsInputMethod: ['ui'],
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
														description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Account code must be active for the organization.',
														default: '',
													},
													{
														displayName: 'Description',
														name: 'description',
														type: 'string',
														default: '',
														description: 'Description needs to be at least 1 char long',
															required:	true,
													},
													{
														displayName: 'Item Code Name or ID',
														name: 'itemCode',
														type: 'options',
														description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Item code can only be used when the Bank Transaction Type is SPEND or RECEIVE.',
														default: '',
													},
													{
														displayName: 'Line Amount',
														name: 'lineAmount',
														type: 'string',
														default: '',
														description: 'If you wish to omit either Quantity or UnitAmount you can provide a LineAmount and Xero will calculate the missing amount',
													},
													{
														displayName: 'Line Item ID',
														name: 'lineItemId',
														type: 'string',
														default: '',
														description: 'The Xero generated identifier for a LineItem (used for updates)',
													},
													{
														displayName: 'Quantity',
														name: 'quantity',
														type: 'number',
														default: 1,
														description: 'Quantity must be	>	0',
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
														description: 'Used as an override if the default Tax Code for the selected AccountCode is not correct',
													},
													{
														displayName: 'Tracking Categories',
														name: 'trackingUi',
														placeholder: 'Add Tracking Category',
														type: 'fixedCollection',
														default: {},
														description: 'Optional Tracking Category. Maximum of 2 tracking categories per line item.',
														options: [
																	{
																		name: 'trackingValues',
																		displayName: 'Tracking Category',
																			values:	[
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
																				description: 'Option within the tracking category',
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
														description: 'Unit amount must not equal 0. Line item amounts may be negative, but the total value for the document must be positive.',
													},
													],
            },
        ],
    },
    {
        displayName: 'Line Items JSON',
        name: 'lineItemsJson',
        type: 'json',
        default: '[]',
        description: 'Line items as JSON array. Each item should contain at minimum: description, and either (quantity + unitAmount) or lineAmount, plus accountCode.',
        displayOptions: {
            show: {
                resource: ['banktransactions'],
                operation: ['create'],
                lineItemsInputMethod: ['json'],
            },
        },
        placeholder: `[
  {
    "description": "Yearly Bank Account Fee",
    "unitAmount": "20.00",
    "accountCode": "404"
  }
]`,
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['banktransactions'],
                operation: ['create'],
            },
        },
        options: [
            {
                displayName: 'Currency Code',
                name: 'currencyCode',
                type: 'string',
                default: '',
                description: 'The currency that bank transaction has been raised in. Setting currency is only supported on overpayments.',
                displayOptions: {
                    show: {
                        '/type': ['SPEND-OVERPAYMENT', 'RECEIVE-OVERPAYMENT'],
                    },
                },
            },
            {
                displayName: 'Currency Rate',
                name: 'currencyRate',
                type: 'string',
                default: '',
                description: 'Exchange rate to base currency when money is spent or received. Only used for bank transactions in non base currency.',
                displayOptions: {
                    show: {
                        '/type': ['SPEND-OVERPAYMENT', 'RECEIVE-OVERPAYMENT'],
                    },
                },
            },
            {
                displayName: 'Date',
                name: 'date',
                type: 'dateTime',
                default: '',
                description: 'Date of transaction',
            },
            {
                displayName: 'Is Reconciled',
                name: 'isReconciled',
                type: 'boolean',
                default: false,
                description: 'Whether the transaction is reconciled',
            },
            {
                displayName: 'Line Amount Types',
                name: 'lineAmountTypes',
                type: 'options',
                options: [
                    { name: 'Exclusive', value: 'Exclusive' },
                    { name: 'Inclusive', value: 'Inclusive' },
                    { name: 'No Tax', value: 'NoTax' },
                ],
                default: 'Exclusive',
                description: 'Line amounts are inclusive of tax by default if you don\'t specify this element',
            },
            {
                displayName: 'Reference',
                name: 'reference',
                type: 'string',
                default: '',
                description: 'Reference for the transaction. Only supported for SPEND and RECEIVE transactions.',
                displayOptions: {
                    show: {
                        '/type': ['SPEND', 'RECEIVE'],
                    },
                },
            },
            {
                displayName: 'Status',
                name: 'status',
                type: 'options',
                options: [
                    { name: 'Authorised', value: 'AUTHORISED' },
                    { name: 'Deleted', value: 'DELETED' },
                ],
                default: 'AUTHORISED',
                description: 'Status of the bank transaction',
            },
            {
                displayName: 'URL',
                name: 'url',
                type: 'string',
                default: '',
                description: 'URL link to a source document – shown as "Go to App Name"',
            },
        ],
    },
    /* -------------------------------------------------------------------------- */
    /*                                banktransactions:get                      */
    /* -------------------------------------------------------------------------- */
    {
        displayName: 'Organization Name or ID',
        name: 'organizationId',
        type: 'options',
        description:
            'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        typeOptions: {
            loadOptionsMethod: 'getTenants',
        },
        default: '',
        displayOptions: {
            show: {
                resource: ['banktransactions'],
                operation: ['get'],
            },
        },
        required: true,
    },
    {
        displayName: 'Bank Transaction ID',
        name: 'bankTransactionId',
        type: 'string',
        default: '',
        description: 'The Xero generated identifier for a BankTransaction',
        displayOptions: {
            show: {
                resource: ['banktransactions'],
                operation: ['get'],
            },
        },
    },

    /* -------------------------------------------------------------------------- */
    /*                                banktransactions:getAll                     */
    /* -------------------------------------------------------------------------- */
    {
        displayName: 'Organization Name or ID',
        name: 'organizationId',
        type: 'options',
        description:
            'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        typeOptions: {
            loadOptionsMethod: 'getTenants',
        },
        default: '',
        displayOptions: {
            show: {
                resource: ['banktransactions'],
                operation: ['getAll'],
            },
        },
        required: true,
    },
    {
        displayName: 'Note: To get line items, you must set the page and page size options.',
        name: 'note',
        type: 'notice',
        default: 'To get line items, you must set the page and page size options.',
        displayOptions: {
            show: {
                resource: ['banktransactions'],
                operation: ['getAll'],
            },
        },
    },	
    {
        displayName: 'Options',
        name: 'options',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['banktransactions'],
                operation: ['getAll'],
            },
        },
        options: [
            {
                displayName: 'Custom Where Clause',
                name: 'customWhere',
                type: 'string',
                default: '',
                description: 'Custom WHERE clause for advanced filtering (e.g., "Type==\\"SPEND\\" && IsReconciled==true")',
                placeholder: 'Type=="SPEND" && Date>=DateTime(2023,01,01)',
            },
            {
                displayName: 'If-Modified-Since',
                name: 'If-Modified-Since',
                type: 'dateTime',
                default: '',
                description: 'Only return bank transactions created or modified since this timestamp',
            },
            {
                displayName: 'Order By',
                name: 'orderBy',
                type: 'options',
                options: [
                    { name: 'Date', value: 'Date' },
                    { name: 'Reference', value: 'Reference' },
                    { name: 'Total', value: 'Total' },
                    { name: 'Type', value: 'Type' },
                    { name: 'Updated Date', value: 'UpdatedDateUTC' },
                ],
                default: 'Date',
                description: 'Order results by a specific field',
            },
            {
                displayName: 'Page',
                name: 'page',
                type: 'number',
                default: 1,
                description: 'Page number for paginated results (100 transactions per page by default)',
                typeOptions: {
                    minValue: 1,
                },
            },
            {
                displayName: 'Page Size',
                name: 'pageSize',
                type: 'number',
                default: 100,
                description: 'Number of transactions to return per page (max 1000)',
                typeOptions: {
                    minValue: 1,
                    maxValue: 1000,
                },
            },
            {
                displayName: 'Sort Order',
                name: 'sortOrder',
                type: 'options',
                options: [
                    { name: 'ASC', value: 'ASC' },
                    { name: 'DESC', value: 'DESC' },
                ],
                default: 'DESC',
                description: 'Sort order for results',
                displayOptions: {
                    show: {
                        orderBy: ['Date', 'UpdatedDateUTC', 'Type', 'Reference', 'Total'],
                    },
                },
            },
            {
                displayName: 'Statuses',
                name: 'statuses',
                type: 'multiOptions',
                options: [
                    { name: 'Authorised', value: 'AUTHORISED' },
                    { name: 'Deleted', value: 'DELETED' },
                ],
                default: [],
                description: 'Filter by bank transaction statuses',
            },
            {
                displayName: 'Types',
                name: 'types',
                type: 'multiOptions',
                options: [
                    { name: 'Receive Money', value: 'RECEIVE' },
                    { name: 'Receive Overpayment', value: 'RECEIVE-OVERPAYMENT' },
                    { name: 'Receive Prepayment', value: 'RECEIVE-PREPAYMENT' },
                    { name: 'Spend Money', value: 'SPEND' },
                    { name: 'Spend Overpayment', value: 'SPEND-OVERPAYMENT' },
                    { name: 'Spend Prepayment', value: 'SPEND-PREPAYMENT' },
                ],
                default: [],
                description: 'Filter by bank transaction types',
            },
            {
                displayName: 'Where Filters',
                name: 'whereFilters',
                placeholder: 'Add Filter',
                type: 'fixedCollection',
                default: {},
                typeOptions: {
                    multipleValues: true,
                },
                description: 'Structured filters for common use cases',
                options: [
                    {
                        name: 'filters',
                        displayName: 'Filter',
                        values: [
																			{
																				displayName: 'Bank Account Code',
																				name: 'bankAccountCodeValue',
																				type: 'string',
																				default: '',
																				description: 'Bank account code to filter by',
																			},
																			{
																				displayName: 'Bank Account ID',
																				name: 'bankAccountIdValue',
																				type: 'options',
																				description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
																				default: '',
																			},
																			{
																				displayName: 'Contact ID',
																				name: 'contactIdValue',
																				type: 'options',
																				description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
																				default: '',
																			},
																			{
																				displayName: 'Contact Name',
																				name: 'contactNameValue',
																				type: 'string',
																				default: '',
																				description: 'Contact name to filter by',
																			},
																			{
																				displayName: 'Date From',
																				name: 'dateFromValue',
																				type: 'dateTime',
																				default: '',
																				description: 'Filter transactions from this date',
																			},
																			{
																				displayName: 'Date To',
																				name: 'dateToValue',
																				type: 'dateTime',
																				default: '',
																				description: 'Filter transactions to this date',
																			},
																			{
																				displayName: 'Field',
																				name: 'field',
																				type: 'options',
																				options: [
																							{
																								name: 'Bank Account Code',
																								value: 'BankAccount.Code',
																							},
																							{
																								name: 'Bank Account ID',
																								value: 'BankAccount.AccountID',
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
																								name: 'Date Range',
																								value: 'DateRange',
																							},
																							{
																								name: 'Is Reconciled',
																								value: 'IsReconciled',
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
																								name: 'Total Range',
																								value: 'TotalRange',
																							},
																							{
																								name: 'Type',
																								value: 'Type',
																							},
																						],
																				default: 'Type',
																				description: 'Field to filter on',
																			},
																			{
																				displayName: 'Is Reconciled',
																				name: 'isReconciledValue',
																				type: 'boolean',
																				default: false,
																				description: 'Whether to filter by reconciliation status',
																			},
																			{
																				displayName: 'Reference',
																				name: 'referenceValue',
																				type: 'string',
																				default: '',
																				description: 'Reference to filter by',
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
																					],
																				default: 'AUTHORISED',
																				description: 'Status to filter by',
																			},
																			{
																				displayName: 'Total Maximum',
																				name: 'totalMaxValue',
																				type: 'number',
																				default: '',
																				description: 'Filter transactions with total less than or equal to this amount',
																			},
																			{
																				displayName: 'Total Minimum',
																				name: 'totalMinValue',
																				type: 'number',
																				default: '',
																				description: 'Filter transactions with total greater than or equal to this amount',
																			},
																			{
																				displayName: 'Type',
																				name: 'typeValue',
																				type: 'options',
																				options: [
																							{
																								name: 'Receive Money',
																								value: 'RECEIVE',
																							},
																							{
																								name: 'Receive Overpayment',
																								value: 'RECEIVE-OVERPAYMENT',
																							},
																							{
																								name: 'Receive Prepayment',
																								value: 'RECEIVE-PREPAYMENT',
																							},
																							{
																								name: 'Spend Money',
																								value: 'SPEND',
																							},
																							{
																								name: 'Spend Overpayment',
																								value: 'SPEND-OVERPAYMENT',
																							},
																							{
																								name: 'Spend Prepayment',
																								value: 'SPEND-PREPAYMENT',
																							},
																					],
																				default: 'SPEND',
																				description: 'Transaction type to filter by',
																			},
																			],
                    },
                ],
            },
        ],
    },
    
];
