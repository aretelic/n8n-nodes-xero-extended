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
				name: 'Get All',
				value: 'getAll',
				description: 'Get all connectedorganisations',
				action: 'Get all organisations',
			},
		],
		default: 'get',
	},
];

export const organisationFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                 organisation:get                                */
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
    /*                                organisation:getAll                              */
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
];
