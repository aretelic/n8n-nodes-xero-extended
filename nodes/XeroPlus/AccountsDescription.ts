import type { INodeProperties } from 'n8n-workflow';

export const accountsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['accounts'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a account',
				action: 'Create a account',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a account',
				action: 'Delete a account',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a account',
				action: 'Get a account',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many accounts',
				action: 'Get many accounts',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a account',
				action: 'Update a account',
			},
		],
		default: 'create',
	},
];

export const accountsFields: INodeProperties[] = [
    /* -------------------------------------------------------------------------- */
    /*                                accounts:create                              */
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
                resource: ['accounts'],
                operation: ['create'],
            },
        },
        required: true,
    },
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Name of the account (max length = 150)',
        displayOptions: {
            show: {
                resource: ['accounts'],
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
            { name: 'Bank', value: 'BANK' },
            { name: 'Current Asset', value: 'CURRENT' },
            { name: 'Equity', value: 'EQUITY' },
            { name: 'Expense', value: 'EXPENSE' },
            { name: 'Fixed Asset', value: 'FIXED' },
            { name: 'Liability', value: 'LIABILITY' },
            { name: 'Revenue', value: 'REVENUE' },
            { name: 'Sales', value: 'SALES' },
        ],
        default: 'SALES',
        description: 'Account type. See Xero documentation for the full list of types.',
        displayOptions: {
            show: {
                resource: ['accounts'],
                operation: ['create'],
            },
        },
        required: true,
    },
    {
        displayName: 'Code',
        name: 'code',
        type: 'string',
        default: '',
        description: 'Alpha-numeric account code (max length = 10). Required unless Type is BANK.',
        displayOptions: {
            show: {
                resource: ['accounts'],
                operation: ['create'],
            },
        },
    },
    {
        displayName: 'Bank Account Number',
        name: 'bankAccountNumber',
        type: 'string',
        default: '',
        description: 'For bank accounts only (Account Type BANK)',
        displayOptions: {
            show: {
                resource: ['accounts'],
                operation: ['create'],
            },
        },
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['accounts'],
                operation: ['create'],
            },
        },
        options: [
            {
                displayName: 'Bank Account Type',
                name: 'bankAccountType',
                type: 'options',
                options: [
                    { name: 'Bank', value: 'BANK' },
                    { name: 'Credit Card', value: 'CREDITCARD' },
                    { name: 'PayPal', value: 'PAYPAL' },
                    { name: 'Other', value: 'OTHER' },
                ],
                default: 'BANK',
                description: 'For bank accounts only',
            },
            {
                displayName: 'Currency Code',
                name: 'currencyCode',
                type: 'string',
                default: '',
                description: 'ISO currency code. For bank accounts only.',
            },
            {
                displayName: 'Description',
                name: 'description',
                type: 'string',
                typeOptions: { rows: 4 },
                default: '',
                description: 'Description of the account (max length = 4000)',
            },
            {
                displayName: 'Enable Payments To Account',
                name: 'enablePaymentsToAccount',
                type: 'boolean',
                default: false,
            },
            {
                displayName: 'Show In Expense Claims',
                name: 'showInExpenseClaims',
                type: 'boolean',
                default: false,
            },
            {
                displayName: 'Status',
                name: 'status',
                type: 'options',
                options: [
                    { name: 'Active', value: 'ACTIVE' },
                    { name: 'Archived', value: 'ARCHIVED' },
                ],
                default: 'ACTIVE',
                description: 'Account status',
            },
            {
                displayName: 'Tax Type',
                name: 'taxType',
                type: 'string',
                default: '',
                description: 'Tax type to apply to this account',
            },
        ],
    },
	/* -------------------------------------------------------------------------- */
    /*                                accounts:get                                */
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
                resource: ['accounts'],
                operation: ['get'],
            },
        },
        required: true,
    },
    {
        displayName: 'Account Name or ID',
        name: 'accountId',
        type: 'options',
        description: 'Choose from the list, or specify an ID using an expression. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        typeOptions: {
            loadOptionsMethod: 'getAccountCodes',
            loadOptionsDependsOn: ['organizationId'],
        },
        default: '',
        displayOptions: {
            show: {
                resource: ['accounts'],
                operation: ['get'],
            },
        },
        required: true,
    },
	/* -------------------------------------------------------------------------- */
    /*                                accounts:getAll                                */
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
                resource: ['accounts'],
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
				resource: ['accounts'],
				operation: ['getAll'],
			},
		},
		// eslint-disable-next-line n8n-nodes-base/node-param-collection-type-unsorted-items
		options: [
			{
				displayName: 'Modified After',
				name: 'If-Modified-Since',
				type: 'dateTime',
				default: '',
				description: 'Date and time to filter for accounts modified after this date and time',
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'options',
				options: [
					{ name: 'AccountID', value: 'AccountID' },
					{ name: 'Bank Account Type', value: 'BankAccountType' },
					{ name: 'Class', value: 'Class' },
					{ name: 'Code', value: 'Code' },
					{ name: 'Description', value: 'Description' },
					{ name: 'Enable Payments To Account', value: 'EnablePaymentsToAccount' },
					{ name: 'Name', value: 'Name' },
					{ name: 'Show In Expense Claims', value: 'ShowInExpenseClaims' },
					{ name: 'Status', value: 'Status' },
					{ name: 'System Account', value: 'SystemAccount' },
					{ name: 'Tax Type', value: 'TaxType' },
					{ name: 'Type', value: 'Type' },
					{ name: 'Updated Date', value: 'UpdatedDateUTC' },
				],
				default: 'AccountID',
				description: 'Order by any element returned',
			},
			{
				displayName: 'Sort Order',
				name: 'sortOrder',
				type: 'options',
				options: [
					{ name: 'Asc', value: 'ASC' },
					{ name: 'Desc', value: 'DESC' },
				],
				default: 'ASC',
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
				description: 'Filter accounts based on specific criteria',
				options: [
					{
						name: 'filters',
						displayName: 'Filter',
						// eslint-disable-next-line n8n-nodes-base/node-param-fixed-collection-type-unsorted-items
						values: [
							{
								displayName: 'Field',
								name: 'field',
								type: 'options',
								options: [
									{
										name: 'Accounts on Watchlist',
										value: 'AddToWatchlist',
									},
									{
										name: 'Bank Account Type',
										value: 'BankAccountType',
									},
									{
										name: 'Class',
										value: 'Class',
									},
									{
										name: 'Enable Payments To Account',
										value: 'EnablePaymentsToAccount',
									},
									{
										name: 'Status',
										value: 'Status',
									},
									{
										name: 'System Account',
										value: 'SystemAccount',
									},
									{
										name: 'Tax Type',
										value: 'TaxType',
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
								displayName: 'Accounts on Watchlist',
								name: 'AddToWatchlist',
								type: 'boolean',
								default: false,
								description: 'Whether to filter accounts that are on watchlist',
								displayOptions: {
									show: {
										field: ['AddToWatchlist'],
									},
								},
							},
							{
								displayName: 'Bank Account Type',
								name: 'bankAccountTypeValue',
								type: 'options',
								options: [
									{
										name: 'Bank',
										value: 'BANK',
									},
									{
										name: 'Credit Card',
										value: 'CREDITCARD',
									},
									{
										name: 'PayPal',
										value: 'PAYPAL',
									},
									{
										name: 'Other',
										value: 'OTHER',
									},
								],
								default: 'BANK',
								description: 'Bank account type to filter by',
								displayOptions: {
									show: {
										field: ['BankAccountType'],
									},
								},
							},
							{
								displayName: 'Class',
								name: 'classValue',
								type: 'options',
								options: [
									{
										name: 'Asset',
										value: 'ASSET',
									},
									{
										name: 'Equity',
										value: 'EQUITY',
									},
									{
										name: 'Expense',
										value: 'EXPENSE',
									},
									{
										name: 'Liability',
										value: 'LIABILITY',
									},
									{
										name: 'Revenue',
										value: 'REVENUE',
									},
								],
								default: 'ASSET',
								description: 'Account class to filter by',
								displayOptions: {
									show: {
										field: ['Class'],
									},
								},
							},
							{
								displayName: 'Enable Payments To Account',
								name: 'enablePaymentsValue',
								type: 'boolean',
								default: false,
								description: 'Whether to filter accounts that have payments enabled',
								displayOptions: {
									show: {
										field: ['EnablePaymentsToAccount'],
									},
								},
							},
							{
								displayName: 'Status',
								name: 'statusValue',
								type: 'options',
								options: [
									{
										name: 'Active',
										value: 'ACTIVE',
									},
									{
										name: 'Archived',
										value: 'ARCHIVED',
									},
								],
								default: 'ACTIVE',
								description: 'Account status to filter by',
								displayOptions: {
									show: {
										field: ['Status'],
									},
								},
							},
							{
								displayName: 'System Account',
								name: 'systemAccountValue',
								type: 'options',
								options: [
									{
										name: 'Accounts Payable',
										value: 'CREDITORS',
									},
									{
										name: 'Accounts Receivable',
										value: 'DEBTORS',
									},
									{
										name: 'Bank Revaluations',
										value: 'BANKCURRENCYGAIN',
									},
									{
										name: 'CIS Assets (UK Only)',
										value: 'CISASSETS',
									},
									{
										name: 'CIS Labour Expense (UK Only)',
										value: 'CISLABOUREXPENSE',
									},
									{
										name: 'CIS Labour Income (UK Only)',
										value: 'CISLABOURINCOME',
									},
									{
										name: 'CIS Liability (UK Only)',
										value: 'CISLIABILITY',
									},
									{
										name: 'CIS Materials (UK Only)',
										value: 'CISMATERIALS',
									},
									{
										name: 'GST / VAT',
										value: 'GST',
									},
									{
										name: 'GST On Imports',
										value: 'GSTONIMPORTS',
									},
									{
										name: 'Historical Adjustment',
										value: 'HISTORICAL',
									},
									{
										name: 'Realised Currency Gains',
										value: 'REALISEDCURRENCYGAIN',
									},
									{
										name: 'Retained Earnings',
										value: 'RETAINEDEARNINGS',
									},
									{
										name: 'Rounding',
										value: 'ROUNDING',
									},
									{
										name: 'Tracking Transfers',
										value: 'TRACKINGTRANSFERS',
									},
									{
										name: 'Unpaid Expense Claims',
										value: 'UNPAIDEXPCLM',
									},
									{
										name: 'Unrealised Currency Gains',
										value: 'UNREALISEDCURRENCYGAIN',
									},
									{
										name: 'Wages Payable',
										value: 'WAGEPAYABLES',
									},
								],
								default: 'DEBTORS',
								description: 'System account type to filter by',
								displayOptions: {
									show: {
										field: ['SystemAccount'],
									},
								},
							},
							{
								displayName: 'Tax Type',
								name: 'taxTypeValue',
								type: 'string',
								default: '',
								placeholder: 'INPUT, OUTPUT, NONE, etc.',
								description: 'Tax type code to filter by',
								displayOptions: {
									show: {
										field: ['TaxType'],
									},
								},
							},
							{
								displayName: 'Type',
								name: 'typeValue',
								type: 'options',
								options: [
									{
										name: 'Bank',
										value: 'BANK',
									},
									{
										name: 'Current Asset',
										value: 'CURRENT',
									},
									{
										name: 'Current Liability',
										value: 'CURRLIAB',
									},
									{
										name: 'Depreciation',
										value: 'DEPRECIATN',
									},
									{
										name: 'Direct Costs',
										value: 'DIRECTCOSTS',
									},
									{
										name: 'Equity',
										value: 'EQUITY',
									},
									{
										name: 'Expense',
										value: 'EXPENSE',
									},
									{
										name: 'Fixed Asset',
										value: 'FIXED',
									},
									{
										name: 'Inventory',
										value: 'INVENTORY',
									},
									{
										name: 'Liability',
										value: 'LIABILITY',
									},
									{
										name: 'Non-Current Asset',
										value: 'NONCURRENT',
									},
									{
										name: 'Other Income',
										value: 'OTHERINCOME',
									},
									{
										name: 'Overhead',
										value: 'OVERHEADS',
									},
									{
										name: 'Prepayment',
										value: 'PREPAYMENT',
									},
									{
										name: 'Revenue',
										value: 'REVENUE',
									},
									{
										name: 'Sales',
										value: 'SALES',
									},
									{
										name: 'Term Liability',
										value: 'TERMLIAB',
									},
								],
								default: 'BANK',
								description: 'Account type to filter by',
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
			{
				displayName: 'Custom Where',
				name: 'customWhere',
				type: 'string',
				placeholder: 'Type=="BANK" && Status=="ACTIVE"',
				default: '',
				description: 'Advanced: Custom where clause. This will override the Where Filters above if provided.',
			},
		],
	},
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
                resource: ['accounts'],
                operation: ['update'],
            },
        },
        required: true,
    },
    {
        displayName: 'Account Name or ID',
        name: 'accountId',
        type: 'options',
        description: 'Choose from the list, or specify an ID using an expression. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        typeOptions: {
            loadOptionsMethod: 'getAccountCodes',
            loadOptionsDependsOn: ['organizationId'],
        },
        default: '',
        displayOptions: {
            show: {
                resource: ['accounts'],
                operation: ['update'],
            },
        },
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
                resource: ['accounts'],
                operation: ['update'],
            },
        },
        options: [
            {
                displayName: 'Add To Watchlist',
                name: 'AddToWatchlist',
                type: 'boolean',
                default: false,
                description: 'Whether this account is to be shown in the Xero dashboard watchlist widget',
            },
            {
                displayName: 'Bank Account Number',
                name: 'bankAccountNumber',
                type: 'string',
                default: '',
                description: 'For bank accounts only (Account Type BANK)',
            },
            {
                displayName: 'Code',
                name: 'code',
                type: 'string',
                default: '',
                description: 'Alpha-numeric account code (max length = 10). Required unless Type is BANK.',
            },
            {
                displayName: 'Currency Code',
                name: 'currencyCode',
                type: 'string',
                default: '',
                description: 'ISO currency code. For bank accounts only.',
            },
            {
                displayName: 'Description',
                name: 'description',
                type: 'string',
                typeOptions: { rows: 4 },
                default: '',
                description: 'Description of the account (max length = 4000)',
            },
            {
                displayName: 'Enable Payments To Account',
                name: 'enablePaymentsToAccount',
                type: 'boolean',
                default: false,
            },
            {
                displayName: 'Name',
                name: 'name',
                type: 'string',
                default: '',
                description: 'Name of the account (max length = 150)',
            },
            {
                displayName: 'Show In Expense Claims',
                name: 'showInExpenseClaims',
                type: 'boolean',
                default: false,
            },
            {
                displayName: 'Status',
                name: 'status',
                type: 'options',
                options: [
                    { name: 'Active', value: 'ACTIVE' },
                    { name: 'Archived', value: 'ARCHIVED' },
                ],
                default: 'ACTIVE',
                description: 'Account status',
            },
            {
                displayName: 'Tax Type',
                name: 'taxType',
                type: 'string',
                default: '',
                description: 'Tax type to apply to this account',
            },
            {
                displayName: 'Type',
                name: 'type',
                type: 'options',
                options: [
                    { name: 'Bank', value: 'BANK' },
                    { name: 'Current Asset', value: 'CURRENT' },
                    { name: 'Equity', value: 'EQUITY' },
                    { name: 'Expense', value: 'EXPENSE' },
                    { name: 'Fixed Asset', value: 'FIXED' },
                    { name: 'Liability', value: 'LIABILITY' },
                    { name: 'Revenue', value: 'REVENUE' },
                    { name: 'Sales', value: 'SALES' },
                ],
                default: 'SALES',
                description: 'Account type. See Xero documentation for the full list of types.',
            },
        ],
    },	
	/* -------------------------------------------------------------------------- */
    /*                                accounts:delete                                */
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
                resource: ['accounts'],
                operation: ['delete'],
            },
        },
        required: true,
    },
    {
        displayName: 'Account Name or ID',
        name: 'accountId',
        type: 'options',
        description: 'Choose from the list, or specify an ID using an expression. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
        typeOptions: {
            loadOptionsMethod: 'getAccountCodes',
            loadOptionsDependsOn: ['organizationId'],
        },
        default: '',
        displayOptions: {
            show: {
                resource: ['accounts'],
                operation: ['delete'],
            },
        },
        required: true,
    },	
];
