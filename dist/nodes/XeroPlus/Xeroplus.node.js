"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Xeroplus = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const ContactDescription_1 = require("./ContactDescription");
const GenericFunctions_1 = require("./GenericFunctions");
const InvoiceDescription_1 = require("./InvoiceDescription");
const AttachmentsDescription_1 = require("./AttachmentsDescription");
const AccountsDescription_1 = require("./AccountsDescription");
const OrganisationsDescription_1 = require("./OrganisationsDescription");
const ReportDescription_1 = require("./ReportDescription");
const BankTransactionsDescription_1 = require("./BankTransactionsDescription");
const BankTransfersDescription_1 = require("./BankTransfersDescription");
const HistoryandNotesDescription_1 = require("./HistoryandNotesDescription");
const ManualJournalsDescription_1 = require("./ManualJournalsDescription");
class Xeroplus {
    constructor() {
        this.description = {
            displayName: 'Xero +',
            name: 'xeroplus',
            icon: 'file:xero-dark-logo.svg',
            group: ['output'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Consume Xero API',
            defaults: {
                name: 'Xero +',
            },
            usableAsTool: true,
            inputs: ["main"],
            outputs: ["main"],
            credentials: [
                {
                    name: 'xeroplusOAuth2Api',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Account',
                            value: 'accounts',
                        },
                        {
                            name: 'Attachment',
                            value: 'attachments',
                        },
                        {
                            name: 'Bank Transaction',
                            value: 'banktransactions',
                        },
                        {
                            name: 'Bank Transfer',
                            value: 'banktransfers',
                        },
                        {
                            name: 'Contact',
                            value: 'contact',
                        },
                        {
                            name: 'History and Note',
                            value: 'historyandnotes',
                        },
                        {
                            name: 'Invoice',
                            value: 'invoice',
                        },
                        {
                            name: 'Manual Journal',
                            value: 'manualjournals',
                        },
                        {
                            name: 'Organisation',
                            value: 'organisation',
                        },
                        {
                            name: 'Report',
                            value: 'report',
                        },
                    ],
                    default: 'invoice',
                },
                ...OrganisationsDescription_1.organisationOperations,
                ...OrganisationsDescription_1.organisationFields,
                ...ContactDescription_1.contactOperations,
                ...ContactDescription_1.contactFields,
                ...InvoiceDescription_1.invoiceOperations,
                ...InvoiceDescription_1.invoiceFields,
                ...AccountsDescription_1.accountsOperations,
                ...AccountsDescription_1.accountsFields,
                ...AttachmentsDescription_1.attachmentsOperations,
                ...AttachmentsDescription_1.attachmentsFields,
                ...ReportDescription_1.reportOperations,
                ...ReportDescription_1.reportFields,
                ...BankTransactionsDescription_1.banktransactionsOperations,
                ...BankTransactionsDescription_1.banktransactionsFields,
                ...BankTransfersDescription_1.banktransferOperations,
                ...BankTransfersDescription_1.banktransferFields,
                ...HistoryandNotesDescription_1.historyandnotesOperations,
                ...HistoryandNotesDescription_1.historyandnotesFields,
                ...ManualJournalsDescription_1.manualjournalsOperations,
                ...ManualJournalsDescription_1.manualjournalsFields,
            ],
        };
        this.methods = {
            loadOptions: {
                async getItemCodes() {
                    const organizationId = this.getCurrentNodeParameter('organizationId');
                    const returnData = [];
                    const { Items: items } = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', '/items', {
                        organizationId,
                    });
                    for (const item of items) {
                        const itemName = item.Description;
                        const itemId = item.Code;
                        returnData.push({
                            name: itemName,
                            value: itemId,
                        });
                    }
                    return returnData;
                },
                async getAccountCodes() {
                    const organizationId = this.getCurrentNodeParameter('organizationId');
                    const returnData = [];
                    const { Accounts: accounts } = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', '/Accounts', {
                        organizationId,
                    });
                    for (const account of accounts) {
                        const accountName = account.Name;
                        const accountId = account.Code;
                        returnData.push({
                            name: accountName,
                            value: accountId,
                        });
                    }
                    return returnData;
                },
                async getTenants() {
                    const returnData = [];
                    const tenants = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', '', {}, {}, 'https://api.xero.com/connections');
                    for (const tenant of tenants) {
                        const tenantName = tenant.tenantName;
                        const tenantId = tenant.tenantId;
                        returnData.push({
                            name: tenantName,
                            value: tenantId,
                        });
                    }
                    return returnData;
                },
                async getBrandingThemes() {
                    const organizationId = this.getCurrentNodeParameter('organizationId');
                    const returnData = [];
                    const { BrandingThemes: themes } = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', '/BrandingThemes', { organizationId });
                    for (const theme of themes) {
                        const themeName = theme.Name;
                        const themeId = theme.BrandingThemeID;
                        returnData.push({
                            name: themeName,
                            value: themeId,
                        });
                    }
                    return returnData;
                },
                async getCurrencies() {
                    const organizationId = this.getCurrentNodeParameter('organizationId');
                    const returnData = [];
                    const { Currencies: currencies } = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', '/Currencies', {
                        organizationId,
                    });
                    for (const currency of currencies) {
                        const currencyName = currency.Code;
                        const currencyId = currency.Description;
                        returnData.push({
                            name: currencyName,
                            value: currencyId,
                        });
                    }
                    return returnData;
                },
                async getBankAccounts() {
                    const organizationId = this.getCurrentNodeParameter('organizationId');
                    const returnData = [];
                    if (!organizationId) {
                        return returnData;
                    }
                    const { Accounts: accounts } = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', '/Accounts', { organizationId });
                    for (const account of accounts) {
                        if (account.Type === 'BANK') {
                            const name = `${account.Name} (${account.Code})`;
                            const id = account.AccountID;
                            returnData.push({ name, value: id });
                        }
                    }
                    return returnData;
                },
                async getContacts() {
                    const organizationId = this.getCurrentNodeParameter('organizationId');
                    const returnData = [];
                    if (!organizationId) {
                        return returnData;
                    }
                    const { Contacts: contacts } = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', '/Contacts', { organizationId }, { order: 'Name ASC' });
                    for (const contact of contacts) {
                        const name = contact.Name;
                        const id = contact.ContactID;
                        returnData.push({ name, value: id });
                    }
                    return returnData;
                },
            },
        };
    }
    async execute() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const items = this.getInputData();
        const returnData = [];
        const length = items.length;
        const qs = {};
        let responseData;
        for (let i = 0; i < length; i++) {
            try {
                const resource = this.getNodeParameter('resource', 0);
                const operation = this.getNodeParameter('operation', 0);
                if (resource === 'organisation') {
                    if (operation === 'get') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', '/Organisation', { organizationId });
                        responseData = responseData.Organisations;
                    }
                    if (operation === 'getAll') {
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', '', {}, {}, 'https://api.xero.com/connections');
                        responseData = responseData;
                    }
                    if (operation === 'getUsers') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const options = this.getNodeParameter('options', i);
                        const headers = {};
                        if (options.orderBy) {
                            qs.order = `${options.orderBy} ${(_a = options.sortOrder) !== null && _a !== void 0 ? _a : 'ASC'}`;
                        }
                        let whereClause = '';
                        if (options.customWhere) {
                            whereClause = options.customWhere;
                        }
                        else if (options.whereFilters) {
                            const filters = options.whereFilters.filters;
                            if (filters && filters.length > 0) {
                                const whereParts = [];
                                for (const filter of filters) {
                                    const field = filter.field;
                                    switch (field) {
                                        case 'EmailAddress':
                                            if (filter.emailAddressValue) {
                                                whereParts.push(`EmailAddress=="${filter.emailAddressValue}"`);
                                            }
                                            break;
                                        case 'FirstName':
                                            if (filter.firstNameValue) {
                                                whereParts.push(`FirstName=="${filter.firstNameValue}"`);
                                            }
                                            break;
                                        case 'LastName':
                                            if (filter.lastNameValue) {
                                                whereParts.push(`LastName=="${filter.lastNameValue}"`);
                                            }
                                            break;
                                        case 'IsSubscriber':
                                            if (filter.isSubscriberValue !== undefined) {
                                                whereParts.push(`IsSubscriber==${filter.isSubscriberValue}`);
                                            }
                                            break;
                                        case 'OrganisationRole':
                                            if (filter.organisationRoleValue) {
                                                whereParts.push(`OrganisationRole=="${filter.organisationRoleValue}"`);
                                            }
                                            break;
                                    }
                                }
                                whereClause = whereParts.join(' && ');
                            }
                        }
                        if (whereClause) {
                            qs.where = whereClause;
                        }
                        if (options['If-Modified-Since']) {
                            headers['If-Modified-Since'] = options['If-Modified-Since'];
                        }
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', '/Users', { organizationId }, qs, undefined, headers);
                        responseData = responseData.Users;
                    }
                }
                if (resource === 'invoice') {
                    if (operation === 'create') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const type = this.getNodeParameter('type', i);
                        const additionalFields = this.getNodeParameter('additionalFields', i);
                        const contactId = this.getNodeParameter('contactId', i);
                        const lineItemsValues = this.getNodeParameter('lineItemsUi', i)
                            .lineItemsValues;
                        const body = {
                            organizationId,
                            Type: type,
                            Contact: { ContactID: contactId },
                        };
                        if (lineItemsValues) {
                            const lineItems = [];
                            for (const lineItemValue of lineItemsValues) {
                                const lineItem = {
                                    Tracking: [],
                                };
                                lineItem.AccountCode = lineItemValue.accountCode;
                                lineItem.Description = lineItemValue.description;
                                lineItem.DiscountRate = lineItemValue.discountRate;
                                lineItem.ItemCode = lineItemValue.itemCode;
                                lineItem.LineAmount = lineItemValue.lineAmount;
                                lineItem.Quantity = lineItemValue.quantity.toString();
                                lineItem.TaxAmount = lineItemValue.taxAmount;
                                lineItem.TaxType = lineItemValue.taxType;
                                lineItem.UnitAmount = lineItemValue.unitAmount;
                                lineItems.push(lineItem);
                            }
                            body.LineItems = lineItems;
                        }
                        if (additionalFields.brandingThemeId) {
                            body.BrandingThemeID = additionalFields.brandingThemeId;
                        }
                        if (additionalFields.currency) {
                            body.CurrencyCode = additionalFields.currency;
                        }
                        if (additionalFields.currencyRate) {
                            body.CurrencyRate = additionalFields.currencyRate;
                        }
                        if (additionalFields.date) {
                            body.Date = additionalFields.date;
                        }
                        if (additionalFields.dueDate) {
                            body.DueDate = additionalFields.dueDate;
                        }
                        if (additionalFields.dueDate) {
                            body.DueDate = additionalFields.dueDate;
                        }
                        if (additionalFields.expectedPaymentDate) {
                            body.ExpectedPaymentDate = additionalFields.expectedPaymentDate;
                        }
                        if (additionalFields.invoiceNumber) {
                            body.InvoiceNumber = additionalFields.invoiceNumber;
                        }
                        if (additionalFields.lineAmountType) {
                            body.LineAmountTypes = additionalFields.lineAmountType;
                        }
                        if (additionalFields.plannedPaymentDate) {
                            body.PlannedPaymentDate = additionalFields.plannedPaymentDate;
                        }
                        if (additionalFields.reference) {
                            body.Reference = additionalFields.reference;
                        }
                        if (additionalFields.sendToContact) {
                            body.SentToContact = additionalFields.sendToContact;
                        }
                        if (additionalFields.status) {
                            body.Status = additionalFields.status;
                        }
                        if (additionalFields.url) {
                            body.Url = additionalFields.url;
                        }
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'POST', '/Invoices', body);
                        responseData = responseData.Invoices;
                    }
                    if (operation === 'update') {
                        const invoiceId = this.getNodeParameter('invoiceId', i);
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const updateFields = this.getNodeParameter('updateFields', i);
                        const body = {
                            organizationId,
                        };
                        if (updateFields.lineItemsUi) {
                            const lineItemsValues = updateFields.lineItemsUi
                                .lineItemsValues;
                            if (lineItemsValues) {
                                const lineItems = [];
                                for (const lineItemValue of lineItemsValues) {
                                    const lineItem = {
                                        Tracking: [],
                                    };
                                    lineItem.AccountCode = lineItemValue.accountCode;
                                    lineItem.Description = lineItemValue.description;
                                    lineItem.DiscountRate = lineItemValue.discountRate;
                                    lineItem.ItemCode = lineItemValue.itemCode;
                                    lineItem.LineAmount = lineItemValue.lineAmount;
                                    lineItem.Quantity = lineItemValue.quantity.toString();
                                    lineItem.TaxAmount = lineItemValue.taxAmount;
                                    lineItem.TaxType = lineItemValue.taxType;
                                    lineItem.UnitAmount = lineItemValue.unitAmount;
                                    lineItems.push(lineItem);
                                }
                                body.LineItems = lineItems;
                            }
                        }
                        if (updateFields.type) {
                            body.Type = updateFields.type;
                        }
                        if (updateFields.Contact) {
                            body.Contact = { ContactID: updateFields.contactId };
                        }
                        if (updateFields.brandingThemeId) {
                            body.BrandingThemeID = updateFields.brandingThemeId;
                        }
                        if (updateFields.currency) {
                            body.CurrencyCode = updateFields.currency;
                        }
                        if (updateFields.currencyRate) {
                            body.CurrencyRate = updateFields.currencyRate;
                        }
                        if (updateFields.date) {
                            body.Date = updateFields.date;
                        }
                        if (updateFields.dueDate) {
                            body.DueDate = updateFields.dueDate;
                        }
                        if (updateFields.dueDate) {
                            body.DueDate = updateFields.dueDate;
                        }
                        if (updateFields.expectedPaymentDate) {
                            body.ExpectedPaymentDate = updateFields.expectedPaymentDate;
                        }
                        if (updateFields.invoiceNumber) {
                            body.InvoiceNumber = updateFields.invoiceNumber;
                        }
                        if (updateFields.lineAmountType) {
                            body.LineAmountTypes = updateFields.lineAmountType;
                        }
                        if (updateFields.plannedPaymentDate) {
                            body.PlannedPaymentDate = updateFields.plannedPaymentDate;
                        }
                        if (updateFields.reference) {
                            body.Reference = updateFields.reference;
                        }
                        if (updateFields.sendToContact) {
                            body.SentToContact = updateFields.sendToContact;
                        }
                        if (updateFields.status) {
                            body.Status = updateFields.status;
                        }
                        if (updateFields.url) {
                            body.Url = updateFields.url;
                        }
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'POST', `/Invoices/${invoiceId}`, body);
                        responseData = responseData.Invoices;
                    }
                    if (operation === 'get') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const invoiceId = this.getNodeParameter('invoiceId', i);
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', `/Invoices/${invoiceId}`, {
                            organizationId,
                        });
                        responseData = responseData.Invoices;
                    }
                    if (operation === 'getAll') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const options = this.getNodeParameter('options', i);
                        if (options.statuses) {
                            qs.statuses = options.statuses.join(',');
                        }
                        if (options.orderBy) {
                            qs.order = `${options.orderBy} ${options.sortOrder === undefined ? 'DESC' : options.sortOrder}`;
                        }
                        let whereClause = '';
                        if (options.customWhere) {
                            whereClause = options.customWhere;
                        }
                        else if (options.whereFilters) {
                            const filters = options.whereFilters.filters;
                            if (filters && filters.length > 0) {
                                const whereParts = [];
                                for (const filter of filters) {
                                    const field = filter.field;
                                    switch (field) {
                                        case 'Status':
                                            if (filter.statusValue) {
                                                whereParts.push(`Status=="${filter.statusValue}"`);
                                            }
                                            break;
                                        case 'Contact.ContactID':
                                            if (filter.contactIdValue) {
                                                whereParts.push(`Contact.ContactID==guid("${filter.contactIdValue}")`);
                                            }
                                            break;
                                        case 'Contact.Name':
                                            if (filter.contactNameValue) {
                                                whereParts.push(`Contact.Name=="${filter.contactNameValue}"`);
                                            }
                                            break;
                                        case 'Contact.ContactNumber':
                                            if (filter.contactNumberValue) {
                                                whereParts.push(`Contact.ContactNumber=="${filter.contactNumberValue}"`);
                                            }
                                            break;
                                        case 'Reference':
                                            if (filter.referenceValue) {
                                                whereParts.push(`Reference=="${filter.referenceValue}"`);
                                            }
                                            break;
                                        case 'InvoiceNumber':
                                            if (filter.invoiceNumberValue) {
                                                whereParts.push(`InvoiceNumber=="${filter.invoiceNumberValue}"`);
                                            }
                                            break;
                                        case 'InvoiceId':
                                            if (filter.invoiceIdValue) {
                                                whereParts.push(`InvoiceId==guid("${filter.invoiceIdValue}")`);
                                            }
                                            break;
                                        case 'DateRange':
                                            const dateFrom = filter.dateFromValue;
                                            const dateTo = filter.dateToValue;
                                            const dateParts = [];
                                            if (dateFrom) {
                                                const fromDate = new Date(dateFrom);
                                                dateParts.push(`Date>=DateTime(${fromDate.getFullYear()}, ${String(fromDate.getMonth() + 1).padStart(2, '0')}, ${String(fromDate.getDate()).padStart(2, '0')})`);
                                            }
                                            if (dateTo) {
                                                const toDate = new Date(dateTo);
                                                dateParts.push(`Date<=DateTime(${toDate.getFullYear()}, ${String(toDate.getMonth() + 1).padStart(2, '0')}, ${String(toDate.getDate()).padStart(2, '0')})`);
                                            }
                                            if (dateParts.length > 0) {
                                                whereParts.push(dateParts.join(' && '));
                                            }
                                            break;
                                        case 'Type':
                                            if (filter.typeValue) {
                                                whereParts.push(`Type=="${filter.typeValue}"`);
                                            }
                                            break;
                                        case 'AmountDueRange':
                                            const amountDueMin = filter.amountDueMinValue;
                                            const amountDueMax = filter.amountDueMaxValue;
                                            const amountDueParts = [];
                                            if (amountDueMin !== undefined && amountDueMin !== null && !isNaN(amountDueMin)) {
                                                amountDueParts.push(`AmountDue>=${amountDueMin}`);
                                            }
                                            if (amountDueMax !== undefined && amountDueMax !== null && !isNaN(amountDueMax)) {
                                                amountDueParts.push(`AmountDue<=${amountDueMax}`);
                                            }
                                            if (amountDueParts.length > 0) {
                                                whereParts.push(amountDueParts.join(' && '));
                                            }
                                            break;
                                        case 'AmountPaidRange':
                                            const amountPaidMin = filter.amountPaidMinValue;
                                            const amountPaidMax = filter.amountPaidMaxValue;
                                            const amountPaidParts = [];
                                            if (amountPaidMin !== undefined && amountPaidMin !== null && !isNaN(amountPaidMin)) {
                                                amountPaidParts.push(`AmountPaid>=${amountPaidMin}`);
                                            }
                                            if (amountPaidMax !== undefined && amountPaidMax !== null && !isNaN(amountPaidMax)) {
                                                amountPaidParts.push(`AmountPaid<=${amountPaidMax}`);
                                            }
                                            if (amountPaidParts.length > 0) {
                                                whereParts.push(amountPaidParts.join(' && '));
                                            }
                                            break;
                                        case 'DueDateRange':
                                            const dueDateFrom = filter.dueDateFromValue;
                                            const dueDateTo = filter.dueDateToValue;
                                            const dueDateParts = [];
                                            if (dueDateFrom) {
                                                const fromDate = new Date(dueDateFrom);
                                                dueDateParts.push(`DueDate>=DateTime(${fromDate.getFullYear()}, ${String(fromDate.getMonth() + 1).padStart(2, '0')}, ${String(fromDate.getDate()).padStart(2, '0')})`);
                                            }
                                            if (dueDateTo) {
                                                const toDate = new Date(dueDateTo);
                                                dueDateParts.push(`DueDate<=DateTime(${toDate.getFullYear()}, ${String(toDate.getMonth() + 1).padStart(2, '0')}, ${String(toDate.getDate()).padStart(2, '0')})`);
                                            }
                                            if (dueDateParts.length > 0) {
                                                whereParts.push(dueDateParts.join(' && '));
                                            }
                                            break;
                                    }
                                }
                                whereClause = whereParts.join(' && ');
                            }
                        }
                        if (whereClause) {
                            qs.where = whereClause;
                        }
                        if (options.createdByMyApp) {
                            qs.createdByMyApp = options.createdByMyApp;
                        }
                        if (options.searchTerm) {
                            qs.searchTerm = options.searchTerm;
                        }
                        if (options.summaryOnly) {
                            qs.summaryOnly = true;
                            qs.pageSize = 1000;
                            responseData = await GenericFunctions_1.xeroApiRequestAllItems.call(this, 'Invoices', 'GET', '/Invoices', { organizationId }, qs);
                        }
                        else {
                            responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', '/Invoices', { organizationId }, qs);
                            responseData = responseData.Invoices;
                        }
                    }
                }
                if (resource === 'attachments') {
                    if (operation === 'upload') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const endpoint = this.getNodeParameter('endpoint', i);
                        const guid = this.getNodeParameter('guid', i);
                        const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i);
                        let filename = this.getNodeParameter('filename', i, '');
                        const item = items[i];
                        if (!item.binary || !item.binary[binaryPropertyName]) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Binary property "${binaryPropertyName}" not found on input item ${i}`);
                        }
                        if (!filename) {
                            const binaryInfo = item.binary[binaryPropertyName];
                            filename = binaryInfo.fileName || 'file';
                        }
                        let binaryData;
                        if (this.helpers.getBinaryDataBuffer) {
                            binaryData = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
                        }
                        else {
                            binaryData = Buffer.from(item.binary[binaryPropertyName].data, 'base64');
                        }
                        const uri = `https://api.xero.com/api.xro/2.0/${endpoint}/${guid}/Attachments/${filename}`;
                        const requestOptions = {
                            method: 'POST',
                            body: binaryData,
                            uri,
                            json: true,
                            headers: {
                                'Content-Type': 'application/octet-stream',
                                Accept: 'application/json',
                                'Xero-Tenant-Id': organizationId,
                            },
                        };
                        responseData = await this.helpers.requestOAuth2.call(this, 'xeroplusOAuth2Api', requestOptions);
                        responseData = (_b = responseData.Attachments) !== null && _b !== void 0 ? _b : responseData;
                    }
                    if (operation === 'getlist') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const endpoint = this.getNodeParameter('endpoint', i);
                        const guid = this.getNodeParameter('guid', i);
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', `/${endpoint}/${guid}/Attachments`, { organizationId });
                        responseData = (_c = responseData.Attachments) !== null && _c !== void 0 ? _c : responseData;
                    }
                    if (operation === 'get') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const endpoint = this.getNodeParameter('endpoint', i);
                        const guid = this.getNodeParameter('guid', i);
                        const filename = this.getNodeParameter('filename', i);
                        const uri = `https://api.xero.com/api.xro/2.0/${endpoint}/${guid}/Attachments/${filename}`;
                        const buffer = (await this.helpers.requestOAuth2.call(this, 'xeroplusOAuth2Api', {
                            method: 'GET',
                            uri,
                            encoding: null,
                            json: false,
                            headers: {
                                'Xero-Tenant-Id': organizationId,
                                Accept: 'application/octet-stream',
                            },
                        }));
                        const binaryData = await this.helpers.prepareBinaryData(buffer, filename);
                        responseData = { success: true };
                        const executionBinary = {
                            json: responseData,
                            binary: {
                                data: binaryData,
                            },
                        };
                        returnData.push(executionBinary);
                        continue;
                    }
                }
                if (resource === 'contact') {
                    if (operation === 'create') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const name = this.getNodeParameter('name', i);
                        const additionalFields = this.getNodeParameter('additionalFields', i);
                        const addressesUi = additionalFields.addressesUi;
                        const phonesUi = additionalFields.phonesUi;
                        const body = {
                            Name: name,
                        };
                        if (additionalFields.accountNumber) {
                            body.AccountNumber = additionalFields.accountNumber;
                        }
                        if (additionalFields.bankAccountDetails) {
                            body.BankAccountDetails = additionalFields.bankAccountDetails;
                        }
                        if (additionalFields.contactNumber) {
                            body.ContactNumber = additionalFields.contactNumber;
                        }
                        if (additionalFields.contactStatus) {
                            body.ContactStatus = additionalFields.contactStatus;
                        }
                        if (additionalFields.defaultCurrency) {
                            body.DefaultCurrency = additionalFields.defaultCurrency;
                        }
                        if (additionalFields.emailAddress) {
                            body.EmailAddress = additionalFields.emailAddress;
                        }
                        if (additionalFields.firstName) {
                            body.FirstName = additionalFields.firstName;
                        }
                        if (additionalFields.lastName) {
                            body.LastName = additionalFields.lastName;
                        }
                        if (additionalFields.purchasesDefaultAccountCode) {
                            body.PurchasesDefaultAccountCode =
                                additionalFields.purchasesDefaultAccountCode;
                        }
                        if (additionalFields.salesDefaultAccountCode) {
                            body.SalesDefaultAccountCode = additionalFields.salesDefaultAccountCode;
                        }
                        if (additionalFields.skypeUserName) {
                            body.SkypeUserName = additionalFields.skypeUserName;
                        }
                        if (additionalFields.taxNumber) {
                            body.taxNumber = additionalFields.taxNumber;
                        }
                        if (additionalFields.xeroNetworkKey) {
                            body.xeroNetworkKey = additionalFields.xeroNetworkKey;
                        }
                        if (phonesUi) {
                            const phoneValues = phonesUi === null || phonesUi === void 0 ? void 0 : phonesUi.phonesValues;
                            if (phoneValues) {
                                const phones = [];
                                for (const phoneValue of phoneValues) {
                                    const phone = {};
                                    phone.PhoneType = phoneValue.phoneType;
                                    phone.PhoneNumber = phoneValue.phoneNumber;
                                    phone.PhoneAreaCode = phoneValue.phoneAreaCode;
                                    phone.PhoneCountryCode = phoneValue.phoneCountryCode;
                                    phones.push(phone);
                                }
                                body.Phones = phones;
                            }
                        }
                        if (addressesUi) {
                            const addressValues = addressesUi === null || addressesUi === void 0 ? void 0 : addressesUi.addressesValues;
                            if (addressValues) {
                                const addresses = [];
                                for (const addressValue of addressValues) {
                                    const address = {};
                                    address.AddressType = addressValue.type;
                                    address.AddressLine1 = addressValue.line1;
                                    address.AddressLine2 = addressValue.line2;
                                    address.City = addressValue.city;
                                    address.Region = addressValue.region;
                                    address.PostalCode = addressValue.postalCode;
                                    address.Country = addressValue.country;
                                    address.AttentionTo = addressValue.attentionTo;
                                    addresses.push(address);
                                }
                                body.Addresses = addresses;
                            }
                        }
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'POST', '/Contacts', {
                            organizationId,
                            Contacts: [body],
                        });
                        responseData = responseData.Contacts;
                    }
                    if (operation === 'get') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const contactId = this.getNodeParameter('contactId', i);
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', `/Contacts/${contactId}`, { organizationId });
                        responseData = responseData.Contacts;
                    }
                    if (operation === 'getAll') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const options = this.getNodeParameter('options', i);
                        if (options.statuses) {
                            qs.statuses = options.statuses.join(',');
                        }
                        if (options.orderBy) {
                            qs.order = `${options.orderBy} ${(_d = options.sortOrder) !== null && _d !== void 0 ? _d : 'DESC'}`;
                        }
                        let whereClause = '';
                        if (options.customWhere) {
                            whereClause = options.customWhere;
                        }
                        else if (options.whereFilters) {
                            const filters = options.whereFilters.filters;
                            if (filters && filters.length > 0) {
                                const whereParts = [];
                                for (const filter of filters) {
                                    const field = filter.field;
                                    switch (field) {
                                        case 'AccountNumber':
                                            if (filter.accountNumberValue) {
                                                whereParts.push(`AccountNumber=="${filter.accountNumberValue}"`);
                                            }
                                            break;
                                        case 'EmailAddress':
                                            if (filter.emailAddressValue) {
                                                whereParts.push(`EmailAddress=="${filter.emailAddressValue}"`);
                                            }
                                            break;
                                        case 'Name':
                                            if (filter.nameValue) {
                                                whereParts.push(`Name=="${filter.nameValue}"`);
                                            }
                                            break;
                                    }
                                }
                                whereClause = whereParts.join(' && ');
                            }
                        }
                        if (whereClause) {
                            qs.where = whereClause;
                        }
                        else if (options.where) {
                            qs.where = options.where;
                        }
                        if (options.createdByMyApp) {
                            qs.createdByMyApp = options.createdByMyApp;
                        }
                        if (options.searchTerm) {
                            qs.searchTerm = options.searchTerm;
                        }
                        if (options.summaryOnly) {
                            qs.summaryOnly = true;
                            qs.pageSize = 1000;
                            responseData = await GenericFunctions_1.xeroApiRequestAllItems.call(this, 'Contacts', 'GET', '/Contacts', { organizationId }, qs);
                        }
                        else {
                            responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', '/Contacts', { organizationId }, qs);
                            responseData = responseData.Contacts;
                        }
                    }
                    if (operation === 'update') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const contactId = this.getNodeParameter('contactId', i);
                        const updateFields = this.getNodeParameter('updateFields', i);
                        const addressesUi = updateFields.addressesUi;
                        const phonesUi = updateFields.phonesUi;
                        const body = {};
                        if (updateFields.accountNumber) {
                            body.AccountNumber = updateFields.accountNumber;
                        }
                        if (updateFields.name) {
                            body.Name = updateFields.name;
                        }
                        if (updateFields.bankAccountDetails) {
                            body.BankAccountDetails = updateFields.bankAccountDetails;
                        }
                        if (updateFields.contactNumber) {
                            body.ContactNumber = updateFields.contactNumber;
                        }
                        if (updateFields.contactStatus) {
                            body.ContactStatus = updateFields.contactStatus;
                        }
                        if (updateFields.defaultCurrency) {
                            body.DefaultCurrency = updateFields.defaultCurrency;
                        }
                        if (updateFields.emailAddress) {
                            body.EmailAddress = updateFields.emailAddress;
                        }
                        if (updateFields.firstName) {
                            body.FirstName = updateFields.firstName;
                        }
                        if (updateFields.lastName) {
                            body.LastName = updateFields.lastName;
                        }
                        if (updateFields.purchasesDefaultAccountCode) {
                            body.PurchasesDefaultAccountCode = updateFields.purchasesDefaultAccountCode;
                        }
                        if (updateFields.salesDefaultAccountCode) {
                            body.SalesDefaultAccountCode = updateFields.salesDefaultAccountCode;
                        }
                        if (updateFields.skypeUserName) {
                            body.SkypeUserName = updateFields.skypeUserName;
                        }
                        if (updateFields.taxNumber) {
                            body.taxNumber = updateFields.taxNumber;
                        }
                        if (updateFields.xeroNetworkKey) {
                            body.xeroNetworkKey = updateFields.xeroNetworkKey;
                        }
                        if (phonesUi) {
                            const phoneValues = phonesUi === null || phonesUi === void 0 ? void 0 : phonesUi.phonesValues;
                            if (phoneValues) {
                                const phones = [];
                                for (const phoneValue of phoneValues) {
                                    const phone = {};
                                    phone.PhoneType = phoneValue.phoneType;
                                    phone.PhoneNumber = phoneValue.phoneNumber;
                                    phone.PhoneAreaCode = phoneValue.phoneAreaCode;
                                    phone.PhoneCountryCode = phoneValue.phoneCountryCode;
                                    phones.push(phone);
                                }
                                body.Phones = phones;
                            }
                        }
                        if (addressesUi) {
                            const addressValues = addressesUi === null || addressesUi === void 0 ? void 0 : addressesUi.addressesValues;
                            if (addressValues) {
                                const addresses = [];
                                for (const addressValue of addressValues) {
                                    const address = {};
                                    address.AddressType = addressValue.type;
                                    address.AddressLine1 = addressValue.line1;
                                    address.AddressLine2 = addressValue.line2;
                                    address.City = addressValue.city;
                                    address.Region = addressValue.region;
                                    address.PostalCode = addressValue.postalCode;
                                    address.Country = addressValue.country;
                                    address.AttentionTo = addressValue.attentionTo;
                                    addresses.push(address);
                                }
                                body.Addresses = addresses;
                            }
                        }
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'POST', `/Contacts/${contactId}`, {
                            organizationId,
                            Contacts: [body],
                        });
                        responseData = responseData.Contacts;
                    }
                }
                if (resource === 'accounts') {
                    if (operation === 'create') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const name = this.getNodeParameter('name', i);
                        const type = this.getNodeParameter('type', i);
                        const code = this.getNodeParameter('code', i, '');
                        const bankAccountNumber = this.getNodeParameter('bankAccountNumber', i, '');
                        const additionalFields = this.getNodeParameter('additionalFields', i);
                        const body = {
                            organizationId,
                            Name: name,
                            Type: type,
                        };
                        if (code)
                            body.Code = code;
                        if (bankAccountNumber)
                            body.BankAccountNumber = bankAccountNumber;
                        if (additionalFields.status)
                            body.Status = additionalFields.status;
                        if (additionalFields.description)
                            body.Description = additionalFields.description;
                        if (additionalFields.bankAccountType)
                            body.BankAccountType = additionalFields.bankAccountType;
                        if (additionalFields.currencyCode)
                            body.CurrencyCode = additionalFields.currencyCode;
                        if (additionalFields.taxType)
                            body.TaxType = additionalFields.taxType;
                        if (additionalFields.enablePaymentsToAccount !== undefined)
                            body.EnablePaymentsToAccount = additionalFields.enablePaymentsToAccount;
                        if (additionalFields.showInExpenseClaims !== undefined)
                            body.ShowInExpenseClaims = additionalFields.showInExpenseClaims;
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'PUT', '/Accounts', body);
                        responseData = (_e = responseData.Accounts) !== null && _e !== void 0 ? _e : responseData;
                    }
                    if (operation === 'get') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const accountId = this.getNodeParameter('accountId', i);
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', `/Accounts/${accountId}`, { organizationId });
                        responseData = responseData.Accounts;
                    }
                    if (operation === 'getAll') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const options = this.getNodeParameter('options', i);
                        const headers = {};
                        if (options.orderBy) {
                            qs.order = `${options.orderBy} ${(_f = options.sortOrder) !== null && _f !== void 0 ? _f : 'DESC'}`;
                        }
                        let whereClause = '';
                        if (options.customWhere) {
                            whereClause = options.customWhere;
                        }
                        else if (options.whereFilters) {
                            const filters = options.whereFilters.filters;
                            if (filters && filters.length > 0) {
                                const whereParts = [];
                                for (const filter of filters) {
                                    const field = filter.field;
                                    switch (field) {
                                        case 'Type':
                                            if (filter.typeValue) {
                                                whereParts.push(`Type=="${filter.typeValue}"`);
                                            }
                                            break;
                                        case 'Class':
                                            if (filter.classValue) {
                                                whereParts.push(`Class=="${filter.classValue}"`);
                                            }
                                            break;
                                        case 'Status':
                                            if (filter.statusValue) {
                                                whereParts.push(`Status=="${filter.statusValue}"`);
                                            }
                                            break;
                                        case 'BankAccountType':
                                            if (filter.bankAccountTypeValue) {
                                                whereParts.push(`BankAccountType=="${filter.bankAccountTypeValue}"`);
                                            }
                                            break;
                                        case 'TaxType':
                                            if (filter.taxTypeValue) {
                                                whereParts.push(`TaxType=="${filter.taxTypeValue}"`);
                                            }
                                            break;
                                        case 'EnablePaymentsToAccount':
                                            if (filter.enablePaymentsValue) {
                                                whereParts.push(`EnablePaymentsToAccount==${filter.enablePaymentsValue}`);
                                            }
                                            break;
                                        case 'SystemAccount':
                                            if (filter.systemAccountValue) {
                                                whereParts.push(`SystemAccount=="${filter.systemAccountValue}"`);
                                            }
                                            break;
                                        case 'AddToWatchlist':
                                            if (filter.AddToWatchlist) {
                                                whereParts.push(`AddToWatchlist==${filter.AddToWatchlist}`);
                                            }
                                            break;
                                    }
                                }
                                whereClause = whereParts.join(' && ');
                            }
                        }
                        if (whereClause) {
                            qs.where = whereClause;
                        }
                        if (options.searchTerm) {
                            qs.searchTerm = options.searchTerm;
                        }
                        if (options['If-Modified-Since']) {
                            headers['If-Modified-Since'] = options['If-Modified-Since'];
                        }
                        if (options.summaryOnly) {
                            qs.summaryOnly = true;
                            qs.pageSize = 1000;
                            responseData = await GenericFunctions_1.xeroApiRequestAllItems.call(this, 'Accounts', 'GET', '/Accounts', { organizationId }, qs, headers);
                        }
                        else {
                            responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', '/Accounts', { organizationId }, qs, undefined, headers);
                            responseData = responseData.Accounts;
                        }
                    }
                    if (operation === 'update') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const accountId = this.getNodeParameter('accountId', i);
                        const additionalFields = this.getNodeParameter('additionalFields', i);
                        const body = {
                            organizationId,
                        };
                        if (additionalFields.name)
                            body.Name = additionalFields.name;
                        if (additionalFields.type)
                            body.Type = additionalFields.type;
                        if (additionalFields.code)
                            body.Code = additionalFields.code;
                        if (additionalFields.bankAccountNumber)
                            body.BankAccountNumber = additionalFields.bankAccountNumber;
                        if (additionalFields.status)
                            body.Status = additionalFields.status;
                        if (additionalFields.description)
                            body.Description = additionalFields.description;
                        if (additionalFields.bankAccountType)
                            body.BankAccountType = additionalFields.bankAccountType;
                        if (additionalFields.currencyCode)
                            body.CurrencyCode = additionalFields.currencyCode;
                        if (additionalFields.taxType)
                            body.TaxType = additionalFields.taxType;
                        if (additionalFields.enablePaymentsToAccount !== undefined)
                            body.EnablePaymentsToAccount = additionalFields.enablePaymentsToAccount;
                        if (additionalFields.showInExpenseClaims !== undefined)
                            body.ShowInExpenseClaims = additionalFields.showInExpenseClaims;
                        if (additionalFields.AddToWatchlist !== undefined)
                            body.AddToWatchlist = additionalFields.AddToWatchlist;
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'POST', `/Accounts/${accountId}`, body);
                        responseData = (_g = responseData.Accounts) !== null && _g !== void 0 ? _g : responseData;
                    }
                    if (operation === 'delete') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const accountId = this.getNodeParameter('accountId', i);
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'DELETE', `/Accounts/${accountId}`, { organizationId });
                        responseData = responseData.Accounts;
                    }
                }
                if (resource === 'report') {
                    if (operation === 'get1099') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const reportYear = this.getNodeParameter('reportYear', i);
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', `/Reports/TenNinetyNine`, { organizationId, reportYear });
                        responseData = responseData.Reports;
                    }
                    if (operation === 'getBalanceSheet') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const options = this.getNodeParameter('options', i, {});
                        const queryParams = {};
                        if (options.date) {
                            queryParams.date = options.date;
                        }
                        if (options.periods) {
                            queryParams.periods = options.periods;
                        }
                        if (options.timeframe) {
                            queryParams.timeframe = options.timeframe;
                        }
                        if (options.trackingOptionID1) {
                            queryParams.trackingOptionID1 = options.trackingOptionID1;
                        }
                        if (options.trackingOptionID2) {
                            queryParams.trackingOptionID2 = options.trackingOptionID2;
                        }
                        if (options.standardLayout) {
                            queryParams.standardLayout = options.standardLayout;
                        }
                        if (options.paymentsOnly) {
                            queryParams.paymentsOnly = options.paymentsOnly;
                        }
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', `/Reports/BalanceSheet`, { organizationId }, queryParams);
                        responseData = responseData.Reports;
                        if (options.formatReport) {
                            responseData = (0, GenericFunctions_1.transformReport)(responseData);
                        }
                    }
                    if (operation === 'getBudgetSummary') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const options = this.getNodeParameter('options', i, {});
                        const queryParams = {};
                        if (options.date) {
                            queryParams.date = options.date;
                        }
                        if (options.periods) {
                            queryParams.periods = options.periods;
                        }
                        if (options.timeframe) {
                            queryParams.timeframe = options.timeframe;
                        }
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', `/Reports/BudgetSummary`, { organizationId }, queryParams);
                        responseData = responseData.Reports;
                        if (options.formatReport) {
                            responseData = (0, GenericFunctions_1.transformReport)(responseData);
                        }
                    }
                    if (operation === 'getProfitAndLoss') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const options = this.getNodeParameter('options', i, {});
                        const queryParams = {};
                        if (options.fromDate) {
                            queryParams.fromDate = options.fromDate;
                        }
                        if (options.toDate) {
                            queryParams.toDate = options.toDate;
                        }
                        if (options.periods) {
                            queryParams.periods = options.periods;
                        }
                        if (options.timeframe) {
                            queryParams.timeframe = options.timeframe;
                        }
                        if (options.trackingCategoryID) {
                            queryParams.trackingCategoryID = options.trackingCategoryID;
                        }
                        if (options.trackingOptionID) {
                            queryParams.trackingOptionID = options.trackingOptionID;
                        }
                        if (options.trackingCategoryID2) {
                            queryParams.trackingCategoryID2 = options.trackingCategoryID2;
                        }
                        if (options.trackingOptionID2) {
                            queryParams.trackingOptionID2 = options.trackingOptionID2;
                        }
                        if (options.standardLayout) {
                            queryParams.standardLayout = options.standardLayout;
                        }
                        if (options.paymentsOnly) {
                            queryParams.paymentsOnly = options.paymentsOnly;
                        }
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', `/Reports/ProfitAndLoss`, { organizationId }, queryParams);
                        responseData = responseData.Reports;
                        if (options.formatReport) {
                            responseData = (0, GenericFunctions_1.transformReport)(responseData);
                        }
                    }
                    if (operation === 'getTrialBalance') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const options = this.getNodeParameter('options', i, {});
                        const queryParams = {};
                        if (options.date) {
                            queryParams.date = options.date;
                        }
                        if (options.paymentsOnly) {
                            queryParams.paymentsOnly = options.paymentsOnly;
                        }
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', `/Reports/TrialBalance`, { organizationId }, queryParams);
                        responseData = responseData.Reports;
                        if (options.formatReport) {
                            responseData = (0, GenericFunctions_1.transformReport)(responseData);
                        }
                    }
                }
                if (resource === 'banktransactions') {
                    if (operation === 'create') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const type = this.getNodeParameter('type', i);
                        const contactId = this.getNodeParameter('contactId', i);
                        const bankAccountId = this.getNodeParameter('bankAccountId', i);
                        const lineItemsInputMethod = this.getNodeParameter('lineItemsInputMethod', i);
                        const additionalFields = this.getNodeParameter('additionalFields', i);
                        const body = {
                            organizationId,
                            Type: type,
                            Contact: { ContactID: contactId },
                            BankAccount: { AccountID: bankAccountId },
                            LineItems: [],
                        };
                        if (lineItemsInputMethod === 'ui') {
                            const lineItemsValues = this.getNodeParameter('lineItemsUi', i)
                                .lineItemsValues;
                            if (lineItemsValues && lineItemsValues.length > 0) {
                                const lineItems = [];
                                for (const lineItemValue of lineItemsValues) {
                                    const lineItem = {};
                                    if (lineItemValue.description)
                                        lineItem.Description = lineItemValue.description;
                                    if (lineItemValue.quantity)
                                        lineItem.Quantity = lineItemValue.quantity;
                                    if (lineItemValue.unitAmount)
                                        lineItem.UnitAmount = lineItemValue.unitAmount;
                                    if (lineItemValue.lineAmount)
                                        lineItem.LineAmount = lineItemValue.lineAmount;
                                    if (lineItemValue.accountCode)
                                        lineItem.AccountCode = lineItemValue.accountCode;
                                    if (lineItemValue.itemCode)
                                        lineItem.ItemCode = lineItemValue.itemCode;
                                    if (lineItemValue.taxType)
                                        lineItem.TaxType = lineItemValue.taxType;
                                    if (lineItemValue.taxAmount)
                                        lineItem.TaxAmount = lineItemValue.taxAmount;
                                    if (lineItemValue.lineItemId)
                                        lineItem.LineItemID = lineItemValue.lineItemId;
                                    if (lineItemValue.trackingUi) {
                                        const trackingValues = lineItemValue.trackingUi
                                            .trackingValues;
                                        if (trackingValues && trackingValues.length > 0) {
                                            const tracking = [];
                                            for (const trackingValue of trackingValues) {
                                                const categoryName = trackingValue.name;
                                                const optionName = trackingValue.option;
                                                if (categoryName && optionName) {
                                                    tracking.push({
                                                        Name: categoryName,
                                                        Option: optionName,
                                                    });
                                                }
                                            }
                                            lineItem.Tracking = tracking;
                                        }
                                    }
                                    lineItems.push(lineItem);
                                }
                                body.LineItems = lineItems;
                            }
                        }
                        else if (lineItemsInputMethod === 'json') {
                            const lineItemsJson = this.getNodeParameter('lineItemsJson', i);
                            try {
                                const lineItems = JSON.parse(lineItemsJson);
                                body.LineItems = lineItems;
                            }
                            catch (error) {
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid JSON in Line Items: ${error.message}`);
                            }
                        }
                        if (additionalFields.date)
                            body.Date = additionalFields.date;
                        if (additionalFields.reference)
                            body.Reference = additionalFields.reference;
                        if (additionalFields.isReconciled !== undefined)
                            body.IsReconciled = additionalFields.isReconciled;
                        if (additionalFields.currencyCode)
                            body.CurrencyCode = additionalFields.currencyCode;
                        if (additionalFields.currencyRate)
                            body.CurrencyRate = additionalFields.currencyRate;
                        if (additionalFields.url)
                            body.Url = additionalFields.url;
                        if (additionalFields.status)
                            body.Status = additionalFields.status;
                        if (additionalFields.lineAmountTypes)
                            body.LineAmountTypes = additionalFields.lineAmountTypes;
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'PUT', '/BankTransactions', body);
                        responseData = responseData.BankTransactions;
                    }
                    if (operation === 'get') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const bankTransactionId = this.getNodeParameter('bankTransactionId', i);
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', `/BankTransactions/${bankTransactionId}`, { organizationId });
                        responseData = responseData.BankTransactions;
                    }
                    if (operation === 'getAll') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const options = this.getNodeParameter('options', i);
                        const headers = {};
                        if (options.types) {
                            qs.types = options.types.join(',');
                        }
                        if (options.statuses) {
                            qs.statuses = options.statuses.join(',');
                        }
                        if (options.orderBy) {
                            qs.order = `${options.orderBy} ${(_h = options.sortOrder) !== null && _h !== void 0 ? _h : 'DESC'}`;
                        }
                        let whereClause = '';
                        if (options.customWhere) {
                            whereClause = options.customWhere;
                        }
                        else if (options.whereFilters) {
                            const filters = options.whereFilters.filters;
                            if (filters && filters.length > 0) {
                                const whereParts = [];
                                for (const filter of filters) {
                                    const field = filter.field;
                                    switch (field) {
                                        case 'Type':
                                            if (filter.typeValue) {
                                                whereParts.push(`Type=="${filter.typeValue}"`);
                                            }
                                            break;
                                        case 'Status':
                                            if (filter.statusValue) {
                                                whereParts.push(`Status=="${filter.statusValue}"`);
                                            }
                                            break;
                                        case 'Contact.ContactID':
                                            if (filter.contactIdValue) {
                                                whereParts.push(`Contact.ContactID==guid("${filter.contactIdValue}")`);
                                            }
                                            break;
                                        case 'Contact.Name':
                                            if (filter.contactNameValue) {
                                                whereParts.push(`Contact.Name=="${filter.contactNameValue}"`);
                                            }
                                            break;
                                        case 'BankAccount.AccountID':
                                            if (filter.bankAccountIdValue) {
                                                whereParts.push(`BankAccount.AccountID==guid("${filter.bankAccountIdValue}")`);
                                            }
                                            break;
                                        case 'BankAccount.Code':
                                            if (filter.bankAccountCodeValue) {
                                                whereParts.push(`BankAccount.Code=="${filter.bankAccountCodeValue}"`);
                                            }
                                            break;
                                        case 'Reference':
                                            if (filter.referenceValue) {
                                                whereParts.push(`Reference=="${filter.referenceValue}"`);
                                            }
                                            break;
                                        case 'IsReconciled':
                                            if (filter.isReconciledValue !== undefined) {
                                                whereParts.push(`IsReconciled==${filter.isReconciledValue}`);
                                            }
                                            break;
                                        case 'DateRange':
                                            const dateFrom = filter.dateFromValue;
                                            const dateTo = filter.dateToValue;
                                            const dateParts = [];
                                            if (dateFrom) {
                                                const fromDate = new Date(dateFrom);
                                                dateParts.push(`Date>=DateTime(${fromDate.getFullYear()}, ${String(fromDate.getMonth() + 1).padStart(2, '0')}, ${String(fromDate.getDate()).padStart(2, '0')})`);
                                            }
                                            if (dateTo) {
                                                const toDate = new Date(dateTo);
                                                dateParts.push(`Date<=DateTime(${toDate.getFullYear()}, ${String(toDate.getMonth() + 1).padStart(2, '0')}, ${String(toDate.getDate()).padStart(2, '0')})`);
                                            }
                                            if (dateParts.length > 0) {
                                                whereParts.push(dateParts.join(' && '));
                                            }
                                            break;
                                        case 'TotalRange':
                                            const totalMin = filter.totalMinValue;
                                            const totalMax = filter.totalMaxValue;
                                            const totalParts = [];
                                            if (totalMin !== undefined && totalMin !== null && !isNaN(totalMin)) {
                                                totalParts.push(`Total>=${totalMin}`);
                                            }
                                            if (totalMax !== undefined && totalMax !== null && !isNaN(totalMax)) {
                                                totalParts.push(`Total<=${totalMax}`);
                                            }
                                            if (totalParts.length > 0) {
                                                whereParts.push(totalParts.join(' && '));
                                            }
                                            break;
                                    }
                                }
                                whereClause = whereParts.join(' && ');
                            }
                        }
                        if (whereClause) {
                            qs.where = whereClause;
                        }
                        if (options['If-Modified-Since']) {
                            headers['If-Modified-Since'] = options['If-Modified-Since'];
                        }
                        if (options.page) {
                            qs.page = options.page;
                        }
                        if (options.pageSize) {
                            qs.pageSize = options.pageSize;
                        }
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', '/BankTransactions', { organizationId }, qs, undefined, headers);
                        responseData = responseData.BankTransactions;
                    }
                    if (operation === 'create') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const type = this.getNodeParameter('type', i);
                        const contactId = this.getNodeParameter('contactId', i);
                        const bankAccountId = this.getNodeParameter('bankAccountId', i);
                        const lineItemsInputMethod = this.getNodeParameter('lineItemsInputMethod', i);
                        const additionalFields = this.getNodeParameter('additionalFields', i);
                        const body = {
                            organizationId,
                            Type: type,
                            Contact: { ContactID: contactId },
                            BankAccount: { AccountID: bankAccountId },
                            LineItems: [],
                        };
                        if (lineItemsInputMethod === 'ui') {
                            const lineItemsValues = this.getNodeParameter('lineItemsUi', i)
                                .lineItemsValues;
                            if (lineItemsValues && lineItemsValues.length > 0) {
                                const lineItems = [];
                                for (const lineItemValue of lineItemsValues) {
                                    const lineItem = {};
                                    if (lineItemValue.description)
                                        lineItem.Description = lineItemValue.description;
                                    if (lineItemValue.quantity)
                                        lineItem.Quantity = lineItemValue.quantity;
                                    if (lineItemValue.unitAmount)
                                        lineItem.UnitAmount = lineItemValue.unitAmount;
                                    if (lineItemValue.lineAmount)
                                        lineItem.LineAmount = lineItemValue.lineAmount;
                                    if (lineItemValue.accountCode)
                                        lineItem.AccountCode = lineItemValue.accountCode;
                                    if (lineItemValue.itemCode)
                                        lineItem.ItemCode = lineItemValue.itemCode;
                                    if (lineItemValue.taxType)
                                        lineItem.TaxType = lineItemValue.taxType;
                                    if (lineItemValue.taxAmount)
                                        lineItem.TaxAmount = lineItemValue.taxAmount;
                                    if (lineItemValue.lineItemId)
                                        lineItem.LineItemID = lineItemValue.lineItemId;
                                    if (lineItemValue.trackingUi) {
                                        const trackingValues = lineItemValue.trackingUi
                                            .trackingValues;
                                        if (trackingValues && trackingValues.length > 0) {
                                            const tracking = [];
                                            for (const trackingValue of trackingValues) {
                                                const categoryName = trackingValue.name;
                                                const optionName = trackingValue.option;
                                                if (categoryName && optionName) {
                                                    tracking.push({
                                                        Name: categoryName,
                                                        Option: optionName,
                                                    });
                                                }
                                            }
                                            lineItem.Tracking = tracking;
                                        }
                                    }
                                    lineItems.push(lineItem);
                                }
                                body.LineItems = lineItems;
                            }
                        }
                        else if (lineItemsInputMethod === 'json') {
                            const lineItemsJson = this.getNodeParameter('lineItemsJson', i);
                            try {
                                const lineItems = JSON.parse(lineItemsJson);
                                body.LineItems = lineItems;
                            }
                            catch (error) {
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid JSON in Line Items: ${error.message}`);
                            }
                        }
                        if (additionalFields.date)
                            body.Date = additionalFields.date;
                        if (additionalFields.reference)
                            body.Reference = additionalFields.reference;
                        if (additionalFields.isReconciled !== undefined)
                            body.IsReconciled = additionalFields.isReconciled;
                        if (additionalFields.currencyCode)
                            body.CurrencyCode = additionalFields.currencyCode;
                        if (additionalFields.currencyRate)
                            body.CurrencyRate = additionalFields.currencyRate;
                        if (additionalFields.url)
                            body.Url = additionalFields.url;
                        if (additionalFields.status)
                            body.Status = additionalFields.status;
                        if (additionalFields.lineAmountTypes)
                            body.LineAmountTypes = additionalFields.lineAmountTypes;
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'PUT', '/BankTransactions', body);
                        responseData = responseData.BankTransactions;
                    }
                }
                if (resource === 'banktransfers') {
                    if (operation === 'create') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const fromBankAccountId = this.getNodeParameter('fromBankAccountId', i);
                        const toBankAccountId = this.getNodeParameter('toBankAccountId', i);
                        const amount = this.getNodeParameter('amount', i);
                        const additionalFields = this.getNodeParameter('additionalFields', i);
                        const bankTransfer = {
                            FromBankAccount: { AccountID: fromBankAccountId },
                            ToBankAccount: { AccountID: toBankAccountId },
                            Amount: amount,
                        };
                        if (additionalFields.date) {
                            bankTransfer.Date = additionalFields.date;
                        }
                        if (additionalFields.reference) {
                            bankTransfer.Reference = additionalFields.reference;
                        }
                        if (additionalFields.FromIsReconciled !== undefined) {
                            bankTransfer.FromIsReconciled = additionalFields.FromIsReconciled;
                        }
                        if (additionalFields.ToIsReconciled !== undefined) {
                            bankTransfer.ToIsReconciled = additionalFields.ToIsReconciled;
                        }
                        const body = {
                            organizationId,
                            BankTransfers: [bankTransfer],
                        };
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'PUT', '/BankTransfers', body);
                        responseData = responseData.BankTransfers;
                    }
                    if (operation === 'get') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const bankTransferId = this.getNodeParameter('bankTransferId', i);
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', `/BankTransfers/${bankTransferId}`, { organizationId });
                        responseData = responseData.BankTransfers;
                    }
                    if (operation === 'getAll') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const options = this.getNodeParameter('options', i);
                        const headers = {};
                        if (options.orderBy) {
                            qs.order = `${options.orderBy} ${(_j = options.sortOrder) !== null && _j !== void 0 ? _j : 'DESC'}`;
                        }
                        let whereClause = '';
                        if (options.customWhere) {
                            whereClause = options.customWhere;
                        }
                        else if (options.whereFilters) {
                            const filters = options.whereFilters.filters;
                            if (filters && filters.length > 0) {
                                const whereParts = [];
                                for (const filter of filters) {
                                    const field = filter.field;
                                    switch (field) {
                                        case 'Amount':
                                            if (filter.amountRange) {
                                                const amountRangeValues = filter.amountRange.amountRangeValues;
                                                if (amountRangeValues) {
                                                    const amountMin = amountRangeValues.amountMin;
                                                    const amountMax = amountRangeValues.amountMax;
                                                    const amountParts = [];
                                                    if (amountMin !== undefined && amountMin !== null && !isNaN(amountMin)) {
                                                        amountParts.push(`Amount>=${amountMin}`);
                                                    }
                                                    if (amountMax !== undefined && amountMax !== null && !isNaN(amountMax)) {
                                                        amountParts.push(`Amount<=${amountMax}`);
                                                    }
                                                    if (amountParts.length > 0) {
                                                        whereParts.push(amountParts.join(' && '));
                                                    }
                                                }
                                            }
                                            break;
                                        case 'Date':
                                            if (filter.dateRange) {
                                                const dateRangeValues = filter.dateRange.dateRangeValues;
                                                if (dateRangeValues) {
                                                    const dateFrom = dateRangeValues.dateFrom;
                                                    const dateTo = dateRangeValues.dateTo;
                                                    const dateParts = [];
                                                    if (dateFrom) {
                                                        const fromDate = new Date(dateFrom);
                                                        dateParts.push(`Date>=DateTime(${fromDate.getFullYear()}, ${String(fromDate.getMonth() + 1).padStart(2, '0')}, ${String(fromDate.getDate()).padStart(2, '0')})`);
                                                    }
                                                    if (dateTo) {
                                                        const toDate = new Date(dateTo);
                                                        dateParts.push(`Date<=DateTime(${toDate.getFullYear()}, ${String(toDate.getMonth() + 1).padStart(2, '0')}, ${String(toDate.getDate()).padStart(2, '0')})`);
                                                    }
                                                    if (dateParts.length > 0) {
                                                        whereParts.push(dateParts.join(' && '));
                                                    }
                                                }
                                            }
                                            break;
                                        case 'Reference':
                                            if (filter.referenceValue) {
                                                whereParts.push(`Reference=="${filter.referenceValue}"`);
                                            }
                                            break;
                                        case 'FromIsReconciled':
                                            if (filter.fromIsReconciledValue !== undefined) {
                                                whereParts.push(`FromIsReconciled==${filter.fromIsReconciledValue}`);
                                            }
                                            break;
                                        case 'ToIsReconciled':
                                            if (filter.toIsReconciledValue !== undefined) {
                                                whereParts.push(`ToIsReconciled==${filter.toIsReconciledValue}`);
                                            }
                                            break;
                                        case 'HasAttachments':
                                            if (filter.hasAttachmentsValue !== undefined) {
                                                whereParts.push(`HasAttachments==${filter.hasAttachmentsValue}`);
                                            }
                                            break;
                                        case 'FromBankAccount.Name':
                                            if (filter.fromBankAccountNameValue) {
                                                whereParts.push(`FromBankAccount.Name=="${filter.fromBankAccountNameValue}"`);
                                            }
                                            break;
                                        case 'ToBankAccount.Name':
                                            if (filter.toBankAccountNameValue) {
                                                whereParts.push(`ToBankAccount.Name=="${filter.toBankAccountNameValue}"`);
                                            }
                                            break;
                                    }
                                }
                                whereClause = whereParts.join(' && ');
                            }
                        }
                        if (whereClause) {
                            qs.where = whereClause;
                        }
                        if (options['If-Modified-Since']) {
                            headers['If-Modified-Since'] = options['If-Modified-Since'];
                        }
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', '/BankTransfers', { organizationId }, qs, undefined, headers);
                        responseData = responseData.BankTransfers;
                    }
                }
                if (resource === 'historyandnotes') {
                    if (operation === 'addNote') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const endpoint = this.getNodeParameter('endpoint', i);
                        const guid = this.getNodeParameter('guid', i);
                        const note = this.getNodeParameter('note', i);
                        const body = {
                            organizationId,
                            HistoryRecords: [
                                {
                                    Details: note,
                                },
                            ],
                        };
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'PUT', `/${endpoint}/${guid}/history`, body);
                        responseData = responseData.HistoryRecords;
                    }
                    if (operation === 'getNotes') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const endpoint = this.getNodeParameter('endpoint', i);
                        const guid = this.getNodeParameter('guid', i);
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', `/${endpoint}/${guid}/history`, { organizationId });
                        responseData = responseData.HistoryRecords;
                    }
                }
                if (resource === 'manualjournals') {
                    if (operation === 'create') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const narration = this.getNodeParameter('narration', i);
                        const journalLinesInputMethod = this.getNodeParameter('journalLinesInputMethod', i);
                        const additionalFields = this.getNodeParameter('additionalFields', i);
                        let journalLines = [];
                        if (journalLinesInputMethod === 'ui') {
                            const journalLinesUi = this.getNodeParameter('journalLinesUi', i);
                            if (journalLinesUi.journalLinesValues) {
                                const journalLinesValues = journalLinesUi.journalLinesValues;
                                for (const line of journalLinesValues) {
                                    const journalLine = {
                                        AccountCode: line.accountCode,
                                        LineAmount: parseFloat(line.lineAmount),
                                    };
                                    if (line.description) {
                                        journalLine.Description = line.description;
                                    }
                                    if (line.taxType) {
                                        journalLine.TaxType = line.taxType;
                                    }
                                    if (line.trackingUi) {
                                        const trackingUi = line.trackingUi;
                                        if (trackingUi.trackingValues) {
                                            const trackingValues = trackingUi.trackingValues;
                                            journalLine.Tracking = trackingValues.map((tracking) => ({
                                                Name: tracking.name,
                                                Option: tracking.option,
                                            }));
                                        }
                                    }
                                    journalLines.push(journalLine);
                                }
                            }
                        }
                        else {
                            journalLines = this.getNodeParameter('journalLinesJson', i);
                        }
                        if (journalLines.length < 2) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Manual journal must have at least 2 journal lines');
                        }
                        const body = {
                            organizationId,
                            Narration: narration,
                            JournalLines: journalLines,
                        };
                        if (additionalFields.date) {
                            const date = new Date(additionalFields.date);
                            body.Date = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                        }
                        if (additionalFields.lineAmountTypes) {
                            body.LineAmountTypes = additionalFields.lineAmountTypes;
                        }
                        if (additionalFields.status) {
                            body.Status = additionalFields.status;
                        }
                        if (additionalFields.url) {
                            body.Url = additionalFields.url;
                        }
                        if (additionalFields.showOnCashBasisReports !== undefined) {
                            body.ShowOnCashBasisReports = additionalFields.showOnCashBasisReports;
                        }
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'POST', '/ManualJournals', body);
                        responseData = responseData.ManualJournals;
                    }
                    if (operation === 'get') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const manualJournalId = this.getNodeParameter('manualJournalId', i);
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', `/ManualJournals/${manualJournalId}`, { organizationId });
                        responseData = responseData.ManualJournals;
                    }
                    if (operation === 'getAll') {
                        const organizationId = this.getNodeParameter('organizationId', i);
                        const options = this.getNodeParameter('options', i);
                        const headers = {};
                        if (options.orderBy) {
                            qs.order = `${options.orderBy} ${(_k = options.sortOrder) !== null && _k !== void 0 ? _k : 'ASC'}`;
                        }
                        let whereClause = '';
                        if (options.customWhere) {
                            whereClause = options.customWhere;
                        }
                        else if (options.whereFilters) {
                            const filters = options.whereFilters.filters;
                            if (filters && filters.length > 0) {
                                const whereParts = [];
                                for (const filter of filters) {
                                    const field = filter.field;
                                    switch (field) {
                                        case 'DateRange':
                                            if (filter.dateFromValue || filter.dateToValue) {
                                                const dateParts = [];
                                                if (filter.dateFromValue) {
                                                    const fromDate = new Date(filter.dateFromValue);
                                                    dateParts.push(`Date>=DateTime(${fromDate.getFullYear()}, ${String(fromDate.getMonth() + 1).padStart(2, '0')}, ${String(fromDate.getDate()).padStart(2, '0')})`);
                                                }
                                                if (filter.dateToValue) {
                                                    const toDate = new Date(filter.dateToValue);
                                                    dateParts.push(`Date<=DateTime(${toDate.getFullYear()}, ${String(toDate.getMonth() + 1).padStart(2, '0')}, ${String(toDate.getDate()).padStart(2, '0')})`);
                                                }
                                                if (dateParts.length > 0) {
                                                    whereParts.push(dateParts.join(' && '));
                                                }
                                            }
                                            break;
                                        case 'Narration':
                                            if (filter.narrationValue) {
                                                whereParts.push(`Narration=="${filter.narrationValue}"`);
                                            }
                                            break;
                                        case 'Status':
                                            if (filter.statusValue) {
                                                whereParts.push(`Status=="${filter.statusValue}"`);
                                            }
                                            break;
                                    }
                                }
                                whereClause = whereParts.join(' && ');
                            }
                        }
                        if (whereClause) {
                            qs.where = whereClause;
                        }
                        if (options['If-Modified-Since']) {
                            headers['If-Modified-Since'] = options['If-Modified-Since'];
                        }
                        responseData = await GenericFunctions_1.xeroApiRequest.call(this, 'GET', '/ManualJournals', { organizationId }, qs, undefined, headers);
                        responseData = responseData.ManualJournals;
                    }
                }
                if ((_l = items[i].json) === null || _l === void 0 ? void 0 : _l.__response) {
                    returnData.push(items[i]);
                    continue;
                }
                const executionData = this.helpers.constructExecutionMetaData(this.helpers.returnJsonArray(responseData), { itemData: { item: i } });
                returnData.push(...executionData);
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ json: { error: error.message } });
                    continue;
                }
                throw error;
            }
        }
        return [returnData];
    }
}
exports.Xeroplus = Xeroplus;
//# sourceMappingURL=Xeroplus.node.js.map