import type { INodeProperties } from 'n8n-workflow';

export const reportOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['report'],
			},
		},
		options: [
			{
				name: 'Get 1099 Report',
				value: 'get1099',
				description: 'Get a 1099 report',
				action: 'Get a 1099 report',
				routing: {
					request: {
						method: 'GET',
						url: '/Reports/TenNinetyNine',
					},
				},
			},
			{
				name: 'Get Balance Sheet Report',
				value: 'getBalanceSheet',
				description: 'Get a Balance Sheet Report',
				action: 'Get a balance sheet report',
				routing: {
					request: {
						method: 'GET',
						url: '/Reports/BalanceSheet',
					},
				},
			},
			{
				name: 'Get Budget Summary Report',
				value: 'getBudgetSummary',
				description: 'Get a Budget Summary Report',
				action: 'Get a budget summary report',
				routing: {
					request: {
						method: 'GET',
						url: '/Reports/BudgetSummary',
					},
				},
			},
			{
				name: 'Get Profit and Loss Report',
				value: 'getProfitAndLoss',
				description: 'Get a Profit and Loss Report',
				action: 'Get a profit and loss report',
				routing: {
					request: {
						method: 'GET',
						url: '/Reports/ProfitAndLoss',
					},
				},
			},
			{
				name: 'Get Trial Balance Report',
				value: 'getTrialBalance',
				description: 'Get a Trial Balance Report',
				action: 'Get a trial balance report',
			},
		],
		default: 'get1099',
	},
];

export const reportFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                report:get1099                          */
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
				resource: ['report'],
				operation: ['get1099'],
			},
		},
		required: true,
	},
	{
		displayName: 'Report Year',
		name: 'reportYear',
		type: 'string',
		default: '',
		description: 'The year of the report to get',
		displayOptions: {
			show: {
				resource: ['report'],
				operation: ['get1099'],
			},
		},
		required: true,
	},

	/* -------------------------------------------------------------------------- */
	/*                                report:getBalanceSheet                          */
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
				resource: ['report'],
				operation: ['getBalanceSheet'],
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
				resource: ['report'],
				operation: ['getBalanceSheet'],
			},
		},
		options: [
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				description: 'Date for the balance sheet report (e.g. 2014-04-30). Returns balance sheet for the end of the month of the specified date.',
			},
			{
				displayName: 'Format Report in Simple Format',
				name: 'formatReport',
				type: 'boolean',
				default: false,
				description: 'Whether to transform the complex Xero report structure into a simple format with flat arrays of line items',
			},
			{
				displayName: 'Payments Only',
				name: 'paymentsOnly',
				type: 'boolean',
				default: false,
				description: 'Whether to get cash transactions only. Ex. Cash Basis Accounting',
			},
			{
				displayName: 'Periods',
				name: 'periods',
				type: 'number',
				default: 1,
				typeOptions: {
					minValue: 1,
					maxValue: 11,
				},
				description: 'The number of periods to compare (integer between 1 and 11)',
			},
			{
				displayName: 'Standard Layout',
				name: 'standardLayout',
				type: 'boolean',
				default: false,
				description: 'Whether to apply custom report layouts. Set to true to use standard layout only.',
			},
			{
				displayName: 'Timeframe',
				name: 'timeframe',
				type: 'options',
				options: [
					{
						name: 'Month',
						value: 'MONTH',
					},
					{
						name: 'Quarter',
						value: 'QUARTER',
					},
					{
						name: 'Year',
						value: 'YEAR',
					},
				],
				default: 'MONTH',
				description: 'The period size to compare to',
			},
			// Todo: Add tracking options search method
			{
				displayName: 'Tracking Option ID 1',
				name: 'trackingOptionID1',
				type: 'string',
				default: '',
				description: 'The balance sheet will be filtered by this tracking option if supplied',
			},
			{
				displayName: 'Tracking Option ID 2',
				name: 'trackingOptionID2',
				type: 'string',
				default: '',
				description: 'Filter by a second tracking category option',
			},
		],
	},
	/* -------------------------------------------------------------------------- */
	/*                                report:getBudgetSummary                          */
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
				resource: ['report'],
				operation: ['getBudgetSummary'],
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
				resource: ['report'],
				operation: ['getBudgetSummary'],
			},
		},
		options: [
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				description: 'Date for the balance sheet report (e.g. 2014-04-30). Returns balance sheet for the end of the month of the specified date.',
			},
			{
				displayName: 'Periods',
				name: 'periods',
				type: 'number',
				default: 1,
				typeOptions: {
					minValue: 1,
					maxValue: 11,
				},
				description: 'The number of periods to compare (integer between 1 and 11)',
			},
			{
				displayName: 'Timeframe',
				name: 'timeframe',
				type: 'options',
				options: [
					{
						name: 'Month',
						value: '1',
					},
					{
						name: 'Quarter',
						value: '3',
					},
					{
						name: 'Year',
						value: '12',
					},
				],
				default: '1',
				description: 'The period size to compare to',
			},
			{
				displayName: 'Format Report in Simple Format',
				name: 'formatReport',
				type: 'boolean',
				default: false,
				description: 'Whether to transform the complex Xero report structure into a simple format with flat arrays of line items',
			},
		],
	},
	/* -------------------------------------------------------------------------- */
	/*                                report:getProfitAndLoss                          */
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
				resource: ['report'],
				operation: ['getProfitAndLoss'],
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
				resource: ['report'],
				operation: ['getProfitAndLoss'],
			},
		},
		options: [
			{
				displayName: 'Format Report in Simple Format',
				name: 'formatReport',
				type: 'boolean',
				default: false,
				description: 'Whether to transform the complex Xero report structure into a simple format with flat arrays of line items',
			},
			{
				displayName: 'From Date',
				name: 'fromDate',
				type: 'dateTime',
				default: '',
				description: 'The date the report starts (e.g. 2021-03-01). Defaults to the beginning of the current month if not provided.',
			},
			{
				displayName: 'Payments Only',
				name: 'paymentsOnly',
				type: 'boolean',
				default: false,
				description: 'Whether to get cash transactions only. Ex. Cash Basis Accounting',
			},
			{
				displayName: 'Periods',
				name: 'periods',
				type: 'number',
				default: 1,
				typeOptions: {
					minValue: 1,
					maxValue: 11,
				},
				description: 'The number of periods to compare (integer between 1 and 11). If used with fromDate/toDate, the specified date range will apply to each period.',
			},
			{
				displayName: 'Standard Layout',
				name: 'standardLayout',
				type: 'boolean',
				default: false,
				description: 'Whether to apply custom report layouts. Set to true to use standard layout only.',
			},
			{
				displayName: 'Timeframe',
				name: 'timeframe',
				type: 'options',
				options: [
					{
						name: 'Month',
						value: 'MONTH',
					},
					{
						name: 'Quarter',
						value: 'QUARTER',
					},
					{
						name: 'Year',
						value: 'YEAR',
					},
				],
				default: 'MONTH',
				description: 'The period size to compare to',
			},
			{
				displayName: 'To Date',
				name: 'toDate',
				type: 'dateTime',
				default: '',
				description: 'The date the report ends (e.g. 2021-03-31). Defaults to the end of the current month if not provided.',
			},
			// Todo: Add tracking options search method
			{
				displayName: 'Tracking Category ID',
				name: 'trackingCategoryID',
				type: 'string',
				default: '',
				description: 'Show figures for each option in the tracking category as separate columns',
			},
			{
				displayName: 'Tracking Category ID 2',
				name: 'trackingCategoryID2',
				type: 'string',
				default: '',
				description: 'Second tracking category to show combinations of options from two categories',
			},
			{
				displayName: 'Tracking Option ID',
				name: 'trackingOptionID',
				type: 'string',
				default: '',
				description: 'Show only one option from the tracking category (use with trackingCategoryID)',
			},
			{
				displayName: 'Tracking Option ID 2',
				name: 'trackingOptionID2',
				type: 'string',
				default: '',
				description: 'Show only one option from the second tracking category (use with trackingCategoryID2)',
			},
		],
	},	
	/* -------------------------------------------------------------------------- */
	/*                                report:getTrialBalance                          */
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
				resource: ['report'],
				operation: ['getTrialBalance'],
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
				resource: ['report'],
				operation: ['getTrialBalance'],
			},
		},
		options: [
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				description: 'Date for the balance sheet report (e.g. 2014-04-30). Returns balance sheet for the end of the month of the specified date.',
			},
			{
				displayName: 'Payments Only',
				name: 'paymentsOnly',
				type: 'boolean',
				default: false,
				description: 'Whether to get cash transactions only. Ex. Cash Basis Accounting',
			},			
			{
				displayName: 'Format Report in Simple Format',
				name: 'formatReport',
				type: 'boolean',
				default: false,
				description: 'Whether to transform the complex Xero report structure into a simple format with flat arrays of line items',
			},
		],
	},		
];
