import type { INodeProperties } from 'n8n-workflow';

export const manualjournalsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['manualjournals'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a manual journal entry',
				action: 'Create a manual journal entry',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a manual journal entry',
				action: 'Get a manual journal entry',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many manual journal entries',
				action: 'Get many manual journal entries',
			},
		],
		default: 'create',
	},
];

export const manualjournalsFields: INodeProperties[] = [
    /* -------------------------------------------------------------------------- */
    /*                                manualjournals:create                     */
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
                resource: ['manualjournals'],
                operation: ['create'],
            },
        },
        required: true,
    },
    {
        displayName: 'Narration',
        name: 'narration',
        type: 'string',
        default: '',
        description: 'Description of journal being posted',
        displayOptions: {
            show: {
                resource: ['manualjournals'],
                operation: ['create'],
            },
        },
        required: true,
    },
    {
        displayName: 'Journal Lines Input Method',
        name: 'journalLinesInputMethod',
        type: 'options',
        options: [
            {
                name: 'Using UI',
                value: 'ui',
                description: 'Add journal lines one by one using the UI',
            },
            {
                name: 'Using JSON',
                value: 'json',
                description: 'Provide journal lines as a JSON array',
            },
        ],
        default: 'ui',
        displayOptions: {
            show: {
                resource: ['manualjournals'],
                operation: ['create'],
            },
        },
    },
    {
        displayName: 'Journal Lines',
        name: 'journalLinesUi',
        placeholder: 'Add Journal Line',
        type: 'fixedCollection',
        default: {},
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                resource: ['manualjournals'],
                operation: ['create'],
                journalLinesInputMethod: ['ui'],
            },
        },
        description: 'Journal line data (minimum 2 lines required)',
        options: [
            {
                name: 'journalLinesValues',
                displayName: 'Journal Line',
                values: [
                    {
                        displayName: 'Account Code Name or ID',
                        name: 'accountCode',
                        type: 'options',
                        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                        typeOptions: {
                            loadOptionsMethod: 'getAccountCodes',
                            loadOptionsDependsOn: ['organizationId'],
                        },
                        default: '',
                        required: true,
                    },
                    {
                        displayName: 'Description',
                        name: 'description',
                        type: 'string',
                        default: '',
                        description: 'Description for journal line',
                    },
                    {
                        displayName: 'Line Amount',
                        name: 'lineAmount',
                        type: 'string',
                        default: '',
                        description: 'Total for line. Debits are positive, credits are negative value.',
                        required: true,
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
                        default: 'NONE',
                        description: 'Used as an override if the default Tax Code for the selected AccountCode is not correct',
                    },
                    {
                        displayName: 'Tracking Categories',
                        name: 'trackingUi',
                        placeholder: 'Add Tracking Category',
                        type: 'fixedCollection',
                        default: {},
                        description: 'Optional Tracking Category. Maximum of 2 tracking categories per line.',
                        typeOptions: {
                            multipleValues: true,
                        },
                        options: [
                            {
                                name: 'trackingValues',
                                displayName: 'Tracking Category',
                                values: [
                                    {
                                        displayName: 'Name',
                                        name: 'name',
                                        type: 'string',
                                        default: '',
                                        description: 'Name of the tracking category',
                                        required: true,
                                    },
                                    {
                                        displayName: 'Option',
                                        name: 'option',
                                        type: 'string',
                                        default: '',
                                        description: 'Option within the tracking category',
                                        required: true,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        displayName: 'Journal Lines JSON',
        name: 'journalLinesJson',
        type: 'json',
        default: '[]',
        description: 'Journal lines as JSON array. Each item should contain at minimum: lineAmount and accountCode. Minimum 2 lines required.',
        displayOptions: {
            show: {
                resource: ['manualjournals'],
                operation: ['create'],
                journalLinesInputMethod: ['json'],
            },
        },
        placeholder: `[
  {
    "lineAmount": 55.00,
    "accountCode": "433",
    "description": "Accrued expenses"
  },
  {
    "lineAmount": -55.00,
    "accountCode": "620",
    "description": "Prepaid insurance"
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
                resource: ['manualjournals'],
                operation: ['create'],
            },
        },
        options: [
            {
                displayName: 'Date',
                name: 'date',
                type: 'dateTime',
                default: '',
                description: 'Date journal was posted – YYYY-MM-DD. Defaults to current date if not provided.',
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
                default: 'NoTax',
                description: 'NoTax by default if you don\'t specify this element',
            },
            {
                displayName: 'Show On Cash Basis Reports',
                name: 'showOnCashBasisReports',
                type: 'boolean',
                default: true,
                description: 'Whether to show on cash basis reports. Default is true if not specified.',
            },
            {
                displayName: 'Status',
                name: 'status',
                type: 'options',
                options: [
                    { name: 'Draft', value: 'DRAFT' },
                    { name: 'Posted', value: 'POSTED' },
                ],
                default: 'DRAFT',
                description: 'Status of the manual journal',
            },
            {
                displayName: 'URL',
                name: 'url',
                type: 'string',
                default: '',
                description: 'URL link to a source document – shown as "Go to [appName]" in the Xero app',
            },
        ],
    },
    /* -------------------------------------------------------------------------- */
    /*                                manualjournals:get                      */
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
                resource: ['manualjournals'],
                operation: ['get'],
            },
        },
        required: true,
    },
    {
        displayName: 'Manual Journal ID',
        name: 'manualJournalId',
        type: 'string',
        default: '',
        description: 'The Xero generated identifier for a ManualJournal',
        displayOptions: {
            show: {
                resource: ['manualjournals'],
                operation: ['get'],
            },
        },
        required: true,
    },

    /* -------------------------------------------------------------------------- */
    /*                                manualjournals:getAll                     */
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
                resource: ['manualjournals'],
                operation: ['getAll'],
            },
        },
        required: true,
    },
    {
        displayName: 'Note: To get journal lines, you must set the page and page size options.',
        name: 'note',
        type: 'notice',
        default: 'To get journal lines, you must set the page and page size options.',
        displayOptions: {
            show: {
                resource: ['manualjournals'],
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
                resource: ['manualjournals'],
                operation: ['getAll'],
            },
        },
        options: [
            {
                displayName: 'Custom Where Clause',
                name: 'customWhere',
                type: 'string',
                default: '',
                description: 'Custom WHERE clause for advanced filtering (e.g., "Status==\\"POSTED\\" && Date>=DateTime(2023,01,01)")',
                placeholder: 'Status=="POSTED" && Date>=DateTime(2023,01,01)',
            },
            {
                displayName: 'If-Modified-Since',
                name: 'If-Modified-Since',
                type: 'dateTime',
                default: '',
                description: 'Only return manual journals created or modified since this timestamp',
            },
            {
                displayName: 'Order By',
                name: 'orderBy',
                type: 'options',
                options: [
                    { name: 'Manual Journal ID', value: 'ManualJournalID' },
                    { name: 'Updated Date UTC', value: 'UpdatedDateUTC' },
                    { name: 'Date', value: 'Date' },
                ],
                default: 'UpdatedDateUTC',
                description: 'Order results by a specific field',
            },
            {
                displayName: 'Page',
                name: 'page',
                type: 'number',
                default: 1,
                description: 'Page number for paginated results (100 journals per page by default)',
                typeOptions: {
                    minValue: 1,
                },
            },
            {
                displayName: 'Page Size',
                name: 'pageSize',
                type: 'number',
                default: 100,
                description: 'Number of journals to return per page (max 1000)',
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
                default: 'ASC',
                description: 'Sort order for results',
                displayOptions: {
                    show: {
                        orderBy: ['ManualJournalID', 'UpdatedDateUTC', 'Date'],
                    },
                },
            },
            {
                displayName: 'Statuses',
                name: 'statuses',
                type: 'multiOptions',
                options: [
                    { name: 'Draft', value: 'DRAFT' },
                    { name: 'Posted', value: 'POSTED' },
                ],
                default: [],
                description: 'Filter by manual journal statuses',
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
                        // eslint-disable-next-line n8n-nodes-base/node-param-fixed-collection-type-unsorted-items
                        values: [
                            {
                                displayName: 'Field',
                                name: 'field',
                                type: 'options',
                                options: [
                                    { name: 'Date Range', value: 'DateRange' },
                                    { name: 'Narration', value: 'Narration' },
                                    { name: 'Status', value: 'Status' },
                                ],
                                default: 'Status',
                                description: 'Field to filter on',
                            },
                            {
                                displayName: 'Date From',
                                name: 'dateFromValue',
                                type: 'dateTime',
                                default: '',
                                description: 'Filter journals from this date',
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
                                description: 'Filter journals to this date',
                                displayOptions: {
                                    show: {
                                        field: ['DateRange'],
                                    },
                                },
                            },
                            {
                                displayName: 'Narration',
                                name: 'narrationValue',
                                type: 'string',
                                default: '',
                                description: 'Narration to filter by',
                                displayOptions: {
                                    show: {
                                        field: ['Narration'],
                                    },
                                },
                            },
                            {
                                displayName: 'Status',
                                name: 'statusValue',
                                type: 'options',
                                options: [
                                    { name: 'Draft', value: 'DRAFT' },
                                    { name: 'Posted', value: 'POSTED' },
                                ],
                                default: 'DRAFT',
                                description: 'Status to filter by',
                                displayOptions: {
                                    show: {
                                        field: ['Status'],
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
