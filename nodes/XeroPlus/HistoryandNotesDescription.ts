import type { INodeProperties } from 'n8n-workflow';

export const historyandnotesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['historyandnotes'],
			},
		},
		options: [
			{
				name: 'Add Note',
				value: 'addNote',
				description: 'Add a note to a transaction',
				action: 'Add a note to a transaction',
				routing: {
					request: {
						method: 'POST',
						url: '/{endpoint}/{guid}/history',
					},
				},
			},
			{
				name: 'Get a List of Changes and Notes',
				value: 'getNotes',
				description: 'Get a history of changes on a transaction',
				action: 'Get a history of changes on a transaction',
				routing: {
					request: {
						method: 'GET',
						url: '/{endpoint}/{guid}/history',
						headers: {
							Accept: 'text/xml',
						},
					},
				},
			},
		],
		default: 'addNote',
	},
];

export const historyandnotesFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                historyandnotes:addNote                          */
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
				resource: ['historyandnotes'],
				operation: ['addNote'],
			},
		},
		required: true,
	},
	{
		displayName: 'Transaction Type',
		name: 'endpoint',
		type: 'options',
		options: [
			{
				name: 'Bank Transactions and Transfers',
				value: 'BankTransactions',
			},
			{
				name: 'Batch Payments',
				value: 'BatchPayments',
			},
			{
				name: 'Contacts',
				value: 'Contacts',
			},
			{
				name: 'Credit Notes',
				value: 'CreditNotes',
			},
			{
				name: 'Invoices',
				value: 'Invoices',
			},
			{
				name: 'Items',
				value: 'Items',
			},
			{
				name: 'Manual Journals',
				value: 'ManualJournals',
			},
			{
				name: 'Organisation',
				value: 'Organisation',
			},
			{
				name: 'Overpayments',
				value: 'Overpayments',
			},
			{
				name: 'Payments',
				value: 'Payments',
			},
			{
				name: 'Prepayments',
				value: 'Prepayments',
			},
			{
				name: 'Purchase Orders',
				value: 'PurchaseOrders',
			},
			{
				name: 'Quotes',
				value: 'Quotes',
			},
			{
				name: 'Repeating Invoices',
				value: 'RepeatingInvoices',
			},
		],
		default: 'Invoices',
		displayOptions: {
			show: {
				resource: ['historyandnotes'],
				operation: ['addNote'],
			},
		},
		required: true,
	},
	{
		displayName: 'Transaction ID',
		name: 'guid',
		type: 'string',
		default: '',
		description: 'The ID of the transaction that the attachment belongs to (e.g. InvoiceID, BankTransactionID, etc.)',
		displayOptions: {
			show: {
				resource: ['historyandnotes'],
				operation: ['addNote'],
			},
		},
		required: true,
	},
	{
		displayName: 'Note',
		name: 'note',
		type: 'string',
		default: '',
		description: 'The note to add to the transaction',
		displayOptions: {
			show: {
				resource: ['historyandnotes'],
				operation: ['addNote'],
			},
		},
		required: true,
	},
	

	/* -------------------------------------------------------------------------- */
	/*                                historyandnotes:getNotes                    */
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
				resource: ['historyandnotes'],
				operation: ['getNotes'],
			},
		},
		required: true,
	},
	{
		displayName: 'Transaction Type',
		name: 'endpoint',
		type: 'options',
		options: [
			{
				name: 'Bank Transactions and Transfers',
				value: 'BankTransactions',
			},
			{
				name: 'Batch Payments',
				value: 'BatchPayments',
			},
			{
				name: 'Contacts',
				value: 'Contacts',
			},
			{
				name: 'Credit Notes',
				value: 'CreditNotes',
			},
			{
				name: 'Invoices',
				value: 'Invoices',
			},
			{
				name: 'Items',
				value: 'Items',
			},
			{
				name: 'Manual Journals',
				value: 'ManualJournals',
			},
			{
				name: 'Organisation',
				value: 'Organisation',
			},
			{
				name: 'Overpayments',
				value: 'Overpayments',
			},
			{
				name: 'Payments',
				value: 'Payments',
			},
			{
				name: 'Prepayments',
				value: 'Prepayments',
			},
			{
				name: 'Purchase Orders',
				value: 'PurchaseOrders',
			},
			{
				name: 'Quotes',
				value: 'Quotes',
			},
			{
				name: 'Repeating Invoices',
				value: 'RepeatingInvoices',
			},
		],
		default: 'Invoices',
		displayOptions: {
			show: {
				resource: ['historyandnotes'],
				operation: ['getNotes'],
			},
		},
		required: true,
	},
	{
		displayName: 'Transaction ID',
		name: 'guid',
		type: 'string',
		default: '',
		description: 'The ID of the transaction to get history for (e.g. InvoiceID, BankTransactionID, etc.)',
		displayOptions: {
			show: {
				resource: ['historyandnotes'],
				operation: ['getNotes'],
			},
		},
		required: true,
	},
];
