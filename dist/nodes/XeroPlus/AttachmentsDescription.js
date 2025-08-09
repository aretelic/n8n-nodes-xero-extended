"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachmentsFields = exports.attachmentsOperations = void 0;
exports.attachmentsOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['attachments'],
            },
        },
        options: [
            {
                name: 'Upload Attachment',
                value: 'upload',
                description: 'Upload an attachment',
                action: 'Upload an attachment',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/{endpoint}/{guid}/Attachments/{filename}',
                    },
                },
            },
            {
                name: 'Get List of Attachments',
                value: 'getlist',
                description: 'Get a list of attachments',
                action: 'Get a list of attachments',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/{endpoint}/{guid}/Attachments/',
                        headers: {
                            Accept: 'text/xml',
                        },
                    },
                },
            },
            {
                name: 'Get Attachment',
                value: 'get',
                description: 'Get an attachment',
                action: 'Get an attachment',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/{endpoint}/{guid}/Attachments/{filename}',
                        headers: {
                            'Xero-Tenant-Id': '={{$parameter["organizationId"]}}',
                        },
                    },
                },
            },
        ],
        default: 'upload',
    },
];
exports.attachmentsFields = [
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
                resource: ['attachments'],
                operation: ['upload'],
            },
        },
        required: true,
    },
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            {
                name: 'Invoices',
                value: 'Invoices',
            },
            {
                name: 'Bank Transactions',
                value: 'BankTransactions',
            },
            {
                name: 'Bank Transfers',
                value: 'BankTransfers',
            },
        ],
        default: 'Invoices',
        displayOptions: {
            show: {
                resource: ['attachments'],
                operation: ['upload'],
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
                resource: ['attachments'],
                operation: ['upload'],
            },
        },
        required: true,
    },
    {
        displayName: 'Binary Property',
        name: 'binaryPropertyName',
        type: 'string',
        default: 'data',
        description: 'Name of the binary property that contains the file data to upload',
        displayOptions: {
            show: {
                resource: ['attachments'],
                operation: ['upload'],
            },
        },
        required: true,
    },
    {
        displayName: 'File Name',
        name: 'filename',
        type: 'string',
        default: '',
        description: 'Filename for the attachment. Leave empty to use the filename from the binary data.',
        displayOptions: {
            show: {
                resource: ['attachments'],
                operation: ['upload'],
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
                resource: ['attachments'],
                operation: ['getlist'],
            },
        },
        required: true,
    },
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            {
                name: 'Invoices',
                value: 'Invoices',
            },
            {
                name: 'Bank Transactions',
                value: 'BankTransactions',
            },
            {
                name: 'Bank Transfers',
                value: 'BankTransfers',
            },
        ],
        default: 'Invoices',
        displayOptions: {
            show: {
                resource: ['attachments'],
                operation: ['getlist'],
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
                resource: ['attachments'],
                operation: ['getlist'],
            },
        },
        required: true,
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
                resource: ['attachments'],
                operation: ['get'],
            },
        },
        required: true,
    },
    {
        displayName: 'Endpoint',
        name: 'endpoint',
        type: 'options',
        options: [
            {
                name: 'Invoices',
                value: 'Invoices',
            },
            {
                name: 'Bank Transactions',
                value: 'BankTransactions',
            },
            {
                name: 'Bank Transfers',
                value: 'BankTransfers',
            },
        ],
        default: 'Invoices',
        displayOptions: {
            show: {
                resource: ['attachments'],
                operation: ['get'],
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
                resource: ['attachments'],
                operation: ['get'],
            },
        },
        required: true,
    },
    {
        displayName: 'File Name',
        name: 'filename',
        type: 'string',
        default: '',
        description: 'The name of the attachment to get',
        displayOptions: {
            show: {
                resource: ['attachments'],
                operation: ['get'],
            },
        },
        required: true,
    },
];
//# sourceMappingURL=AttachmentsDescription.js.map