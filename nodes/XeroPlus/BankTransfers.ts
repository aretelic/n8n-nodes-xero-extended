import type { INodeProperties } from 'n8n-workflow';

export const banktransferOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['banktransfers'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a bank transfer',
				action: 'Create a bank transfer',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a bank transfer',
				action: 'Get a bank transfer',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many bank transfers',
				action: 'Get many bank transfers',
			},
		],
		default: 'create',
	},
];

export const banktransferFields: INodeProperties[] = [
    /* -------------------------------------------------------------------------- */
    /*                                banktransfers:create                     */
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
                resource: ['banktransfers'],
                operation: ['create'],
            },
        },
        required: true,
    },
    {
        displayName: 'From Bank Account Name or ID',
        name: 'fromBankAccountId',
        type: 'options',
        description: 'Choose from the list, or specify an AccountID or Account Code using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        typeOptions: {
            loadOptionsMethod: 'getBankAccounts',
            loadOptionsDependsOn: ['organizationId'],
        },
        default: '',
        displayOptions: {
            show: {
                resource: ['banktransfers'],
                operation: ['create'],
            },
        },
        required: true,
    },   
    {
        displayName: 'To Bank Account Name or ID',
        name: 'toBankAccountId',
        type: 'options',
        description: 'Choose from the list, or specify an AccountID or Account Code using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        typeOptions: {
            loadOptionsMethod: 'getBankAccounts',
            loadOptionsDependsOn: ['organizationId'],
        },
        default: '',
        displayOptions: {
            show: {
                resource: ['banktransfers'],
                operation: ['create'],
            },
        },
        required: true,
    },
    {
        displayName: 'Amount',
        name: 'amount',
        type: 'number',
        default: '',
        displayOptions: {
            show: {
                resource: ['banktransfers'],
                operation: ['create'],
            },
        },
        description: 'Amount of the bank transfer',
        required: true,
    },          
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['banktransfers'],
                operation: ['create'],
            },
        },
        options: [
            {
                displayName: 'Date',
                name: 'date',
                type: 'dateTime',
                default: '',
                description: 'Date of transaction',
            },
            {
                displayName: 'Reference',
                name: 'reference',
                type: 'string',
                default: '',
                description: 'Reference for the transaction',
            },
            {
                displayName: 'Is Reconciled for the Source Account',
                name: 'FromIsReconciled',
                type: 'boolean',
                default: false,
                description: 'Whether the transaction is reconciled for the source account',
            },
            {
                displayName: 'Is Reconciled for the Destination Account',
                name: 'ToIsReconciled',
                type: 'boolean',
                default: false,
                description: 'Whether the transaction is reconciled for the destination account',
            },
        ],
    },
    /* -------------------------------------------------------------------------- */
    /*                                banktransfers:get                         */
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
                resource: ['banktransfers'],
                operation: ['get'],
            },
        },
        required: true,
    },
    {
        displayName: 'Bank Transfer ID',
        name: 'bankTransferId',
        type: 'string',
        default: '',
        description: 'The Xero generated identifier for a BankTransfer',
        displayOptions: {
            show: {
                resource: ['banktransfers'],
                operation: ['get'],
            },
        },
    },
    /* -------------------------------------------------------------------------- */
    /*                                banktransfers:getAll                        */
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
                resource: ['banktransfers'],
                operation: ['getAll'],
            },
        },
        required: true,
    },
    {
        displayName: 'Options',
        name: 'options',
        type: 'collection',
        placeholder: 'Add Option',
        default: {},
        displayOptions: {
            show: {
                resource: ['banktransfers'],
                operation: ['getAll'],
            },
        },
        options: [
            {
                displayName: 'Custom Where',
                name: 'customWhere',
                type: 'string',
                default: '',
                description: 'Custom where clause to filter bank transfers. See <a href="https://developer.xero.com/documentation/api/requests-and-responses#get-modified">Xero documentation</a> for syntax.',
                placeholder: 'Amount>100',
            },
            {
                displayName: 'If-Modified-Since',
                name: 'If-Modified-Since',
                type: 'dateTime',
                default: '',
                description: 'Only bank transfers modified since this timestamp will be returned (UTC format: yyyy-mm-ddThh:mm:ss)',
            },
            {
                displayName: 'Order By',
                name: 'orderBy',
                type: 'options',
                options: [
                    { name: 'Amount', value: 'Amount' },
                    { name: 'Bank Transfer ID', value: 'BankTransferID' },
                    { name: 'Created Date UTC', value: 'CreatedDateUTC' },
                    { name: 'Date', value: 'Date' },
                    { name: 'From Bank Account Name', value: 'FromBankAccount.Name' },
                    { name: 'Reference', value: 'Reference' },
                    { name: 'To Bank Account Name', value: 'ToBankAccount.Name' },
                ],
                default: 'Date',
                description: 'Order by any element returned',
            },
            {
                displayName: 'Sort Order',
                name: 'sortOrder',
                type: 'options',
                options: [
                    { name: 'Ascending', value: 'ASC' },
                    { name: 'Descending', value: 'DESC' },
                ],
                default: 'DESC',
                description: 'Sort order for the results',
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
                description: 'Filter bank transfers based on specific criteria',
                options: [
                    {
                        name: 'filters',
                        displayName: 'Filter',
                        values: [
                            {
                                displayName: 'Amount Range',
                                name: 'amountRange',
                                type: 'fixedCollection',
                                default: {},
                                placeholder: 'Add Amount Range',
                                description: 'Filter by amount range',
                                options: [
                                    {
                                        name: 'amountRangeValues',
                                        displayName: 'Amount Range',
                                        values: [
                                            {
                                                displayName: 'Minimum Amount',
                                                name: 'amountMin',
                                                type: 'number',
                                                default: 0,
                                            },
                                            {
                                                displayName: 'Maximum Amount',
                                                name: 'amountMax',
                                                type: 'number',
                                                default: 0,
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                displayName: 'Date Range',
                                name: 'dateRange',
                                type: 'fixedCollection',
                                default: {},
                                placeholder: 'Add Date Range',
                                description: 'Filter by date range',
                                options: [
                                    {
                                        name: 'dateRangeValues',
                                        displayName: 'Date Range',
                                        values: [
                                            {
                                                displayName: 'From Date',
                                                name: 'dateFrom',
                                                type: 'dateTime',
                                                default: '',
                                            },
                                            {
                                                displayName: 'To Date',
                                                name: 'dateTo',
                                                type: 'dateTime',
                                                default: '',
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                displayName: 'Field',
                                name: 'field',
                                type: 'options',
                                options: [
                                    {
                                        name: 'Amount',
                                        value: 'Amount',
                                    },
                                    {
                                        name: 'Date',
                                        value: 'Date',
                                    },
                                    {
                                        name: 'From Bank Account Name',
                                        value: 'FromBankAccount.Name',
                                    },
                                    {
                                        name: 'From Is Reconciled',
                                        value: 'FromIsReconciled',
                                    },
                                    {
                                        name: 'Has Attachments',
                                        value: 'HasAttachments',
                                    },
                                    {
                                        name: 'Reference',
                                        value: 'Reference',
                                    },
                                    {
                                        name: 'To Bank Account Name',
                                        value: 'ToBankAccount.Name',
                                    },
                                    {
                                        name: 'To Is Reconciled',
                                        value: 'ToIsReconciled',
                                    },
                                ],
                                default: 'Amount',
                                description: 'Field to filter on',
                            },
                            {
                                displayName: 'From Bank Account',
                                name: 'fromBankAccountNameValue',
                                type: 'options',
                                default: '',
                                placeholder: 'Business Bank Account',
                                description: 'Source bank account name to filter by. You can use the expression to use the BankAccountID or BankAccountCode.',
                            },
                            {
                                displayName: 'From Is Reconciled',
                                name: 'fromIsReconciledValue',
                                type: 'boolean',
                                default: false,
                                description: 'Whether to filter by source account reconciliation status',
                            },
                            {
                                displayName: 'Has Attachments',
                                name: 'hasAttachmentsValue',
                                type: 'boolean',
                                default: false,
                                description: 'Whether to filter by attachment status',
                            },
                            {
                                displayName: 'Reference',
                                name: 'referenceValue',
                                type: 'string',
                                default: '',
                                placeholder: 'Transfer reference',
                                description: 'Reference text to filter by',
                            },
                            {
                                displayName: 'To Bank Account',
                                name: 'toBankAccountNameValue',
                                type: 'options',
                                default: '',
                                placeholder: 'Business Savings Account',
                                description: 'Destination bank account name to filter by. You can use the expression to use the BankAccountID or BankAccountCode.',
                            },
                            {
                                displayName: 'To Is Reconciled',
                                name: 'toIsReconciledValue',
                                type: 'boolean',
                                default: false,
                                description: 'Whether to filter by destination account reconciliation status',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
