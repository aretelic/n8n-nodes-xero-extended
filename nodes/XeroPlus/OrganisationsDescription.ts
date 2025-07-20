import type { INodeProperties } from 'n8n-workflow';

export const organisationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['organisation'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get organisation details',
				action: 'Get organisation details',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many connectedorganisations',
				action: 'Get many organisations',
			},
			{
				name: 'Get Users',
				value: 'getUsers',
				description: 'Get users for an organisation',
				action: 'Get users for an organisation',
			},
		],
		default: 'get',
	},
];

export const organisationFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                 organisation:get                           */
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
				resource: ['organisation'],
				operation: ['get'],
			},
		},
		required: true,
	},

    /* -------------------------------------------------------------------------- */
    /*                                organisation:getAll                         */
    /* -------------------------------------------------------------------------- */
    {
        displayName: 'Note: This action will return a list of all organizations connected to your Xero account. No additional parameters are required.',
        name: 'note',
        type: 'notice',
        default: 'This action will return a list of all organizations connected to your Xero account. No additional parameters are required.',
        displayOptions: {
            show: {
                resource: ['organisation'],
                operation: ['getAll'],
            },
        },
    },
	/* -------------------------------------------------------------------------- */
    /*                                organisation:getUsers                       */
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
                resource: ['organisation'],
                operation: ['getUsers'],
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
                resource: ['organisation'],
                operation: ['getUsers'],
            },
        },
        options: [
            {
                displayName: 'Custom Where',
                name: 'customWhere',
                type: 'string',
                default: '',
                description: 'Custom where clause to filter users. See <a href="https://developer.xero.com/documentation/api/requests-and-responses#get-modified">Xero documentation</a> for syntax.',
                placeholder: 'OrganisationRole=="ADMIN"',
            },
            {
                displayName: 'If-Modified-Since',
                name: 'If-Modified-Since',
                type: 'dateTime',
                default: '',
                description: 'Only users modified since this timestamp will be returned (UTC format: yyyy-mm-ddThh:mm:ss)',
            },
            {
                displayName: 'Order By',
                name: 'orderBy',
                type: 'options',
                options: [
                    { name: 'Email Address', value: 'EmailAddress' },
                    { name: 'First Name', value: 'FirstName' },
                    { name: 'Is Subscriber', value: 'IsSubscriber' },
                    { name: 'Last Name', value: 'LastName' },
                    { name: 'Organisation Role', value: 'OrganisationRole' },
                    { name: 'Updated Date UTC', value: 'UpdatedDateUTC' },
                ],
                default: 'FirstName',
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
                default: 'ASC',
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
                description: 'Filter users based on specific criteria',
                options: [
                    {
                        name: 'filters',
                        displayName: 'Filter',
                        values: [
                            {
                                displayName: 'Email Address',
                                name: 'emailAddressValue',
                                type: 'string',
                                default: '',
                                placeholder: 'john.smith@mail.com',
                                description: 'Email address to filter by',
                            },
                            {
                                displayName: 'Field',
                                name: 'field',
                                type: 'options',
                                options: [
                                    {
                                        name: 'Email Address',
                                        value: 'EmailAddress',
                                    },
                                    {
                                        name: 'First Name',
                                        value: 'FirstName',
                                    },
                                    {
                                        name: 'Is Subscriber',
                                        value: 'IsSubscriber',
                                    },
                                    {
                                        name: 'Last Name',
                                        value: 'LastName',
                                    },
                                    {
                                        name: 'Organisation Role',
                                        value: 'OrganisationRole',
                                    },
                                ],
                                default: 'OrganisationRole',
                                description: 'Field to filter on',
                            },
                            {
                                displayName: 'First Name',
                                name: 'firstNameValue',
                                type: 'string',
                                default: '',
                                placeholder: 'John',
                                description: 'First name to filter by',
                            },
                            {
                                displayName: 'Is Subscriber',
                                name: 'isSubscriberValue',
                                type: 'boolean',
                                default: false,
                                description: 'Whether to filter by subscriber status',
                            },
                            {
                                displayName: 'Last Name',
                                name: 'lastNameValue',
                                type: 'string',
                                default: '',
                                placeholder: 'Smith',
                                description: 'Last name to filter by',
                            },
                            {
                                displayName: 'Organisation Role',
                                name: 'organisationRoleValue',
                                type: 'options',
                                options: [
                                    {
                                        name: 'Cashbook Client',
                                        value: 'CASHBOOKCLIENT',
                                    },
                                    {
                                        name: 'Financial Adviser',
                                        value: 'FINANCIALADVISER',
                                    },
                                    {
                                        name: 'Invoice Only',
                                        value: 'INVOICEONLY',
                                    },
                                    {
                                        name: 'Managed Client',
                                        value: 'MANAGEDCLIENT',
                                    },
                                    {
                                        name: 'Read Only',
                                        value: 'READONLY',
                                    },
                                    {
                                        name: 'Standard',
                                        value: 'STANDARD',
                                    },
                                ],
                                default: 'STANDARD',
                                description: 'User role in the organisation',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
