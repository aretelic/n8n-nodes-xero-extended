import {
	type IExecuteFunctions,
	type IDataObject,
	type ILoadOptionsFunctions,
	type INodeExecutionData,
	type INodePropertyOptions,
	type INodeType,
	type INodeTypeDescription,
	type JsonObject,
	NodeConnectionType,
	NodeOperationError,
	type IRequestOptions,
} from 'n8n-workflow';

import { contactFields, contactOperations } from './ContactDescription';
import { Buffer } from 'buffer';
import { xeroApiRequest, xeroApiRequestAllItems } from './GenericFunctions';
import type { IAddress, IContact, IPhone } from './IContactInterface';
import { invoiceFields, invoiceOperations } from './InvoiceDescription';
import type { IInvoice, ILineItem } from './InvoiceInterface';
import { attachmentsFields, attachmentsOperations } from './AttachmentsDescription';

export class XeroPlus implements INodeType {
	description: INodeTypeDescription = {
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
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
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
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Invoice',
						value: 'invoice',
					},
					{
						name: 'Attachments',
						value: 'attachments',
					},
				],
				default: 'invoice',
			},
			// CONTACT
			...contactOperations,
			...contactFields,
			// INVOICE
			...invoiceOperations,
			...invoiceFields,
			// ATTACHMENTS
			...attachmentsOperations,
			...attachmentsFields,
		],
	};

	methods = {
		loadOptions: {
			// Get all the item codes to display them to user so that they can
			// select them easily
			async getItemCodes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const organizationId = this.getCurrentNodeParameter('organizationId');
				const returnData: INodePropertyOptions[] = [];
				const { Items: items } = await xeroApiRequest.call(this, 'GET', '/items', {
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
			// Get all the account codes to display them to user so that they can
			// select them easily
			async getAccountCodes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const organizationId = this.getCurrentNodeParameter('organizationId');
				const returnData: INodePropertyOptions[] = [];
				const { Accounts: accounts } = await xeroApiRequest.call(this, 'GET', '/Accounts', {
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
			// Get all the tenants to display them to user so that they can
			// select them easily
			async getTenants(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];
				const tenants = await xeroApiRequest.call(
					this,
					'GET',
					'',
					{},
					{},
					'https://api.xero.com/connections',
				);
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
			// Get all the brading themes to display them to user so that they can
			// select them easily
			async getBrandingThemes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const organizationId = this.getCurrentNodeParameter('organizationId');
				const returnData: INodePropertyOptions[] = [];
				const { BrandingThemes: themes } = await xeroApiRequest.call(
					this,
					'GET',
					'/BrandingThemes',
					{ organizationId },
				);
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
			// Get all the brading themes to display them to user so that they can
			// select them easily
			async getCurrencies(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const organizationId = this.getCurrentNodeParameter('organizationId');
				const returnData: INodePropertyOptions[] = [];
				const { Currencies: currencies } = await xeroApiRequest.call(this, 'GET', '/Currencies', {
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
			// Get all the tracking categories to display them to user so that they can
			// select them easily
			async getTrakingCategories(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const organizationId = this.getCurrentNodeParameter('organizationId');
				const returnData: INodePropertyOptions[] = [];
				const { TrackingCategories: categories } = await xeroApiRequest.call(
					this,
					'GET',
					'/TrackingCategories',
					{ organizationId },
				);
				for (const category of categories) {
					const categoryName = category.Name;
					const categoryId = category.TrackingCategoryID;
					returnData.push({
						name: categoryName,
						value: categoryId,
					});
				}
				return returnData;
			},
			// // Get all the tracking categories to display them to user so that they can
			// // select them easily
			// async getTrakingOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
			// 	const organizationId = this.getCurrentNodeParameter('organizationId');
			// 	const name = this.getCurrentNodeParameter('name');
			// 	const returnData: INodePropertyOptions[] = [];
			// 	const { TrackingCategories: categories } = await xeroApiRequest.call(this, 'GET', '/TrackingCategories', { organizationId });
			// 	const { Options: options } = categories.filter((category: IDataObject) => category.Name === name)[0];
			// 	for (const option of options) {
			// 		const optionName = option.Name;
			// 		const optionId = option.TrackingOptionID;
			// 		returnData.push({
			// 			name: optionName,
			// 			value: optionId,
			// 		});
			// 	}
			// 	return returnData;
			// },
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const length = items.length;
		const qs: IDataObject = {};
		let responseData;
		for (let i = 0; i < length; i++) {
			try {
				const resource = this.getNodeParameter('resource', 0);
				const operation = this.getNodeParameter('operation', 0);
				//https://developer.xero.com/documentation/api/invoices
				if (resource === 'invoice') {
					if (operation === 'create') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						const type = this.getNodeParameter('type', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i);
						const contactId = this.getNodeParameter('contactId', i) as string;
						const lineItemsValues = (this.getNodeParameter('lineItemsUi', i) as IDataObject)
							.lineItemsValues as IDataObject[];

						const body: IInvoice = {
							organizationId,
							Type: type,
							Contact: { ContactID: contactId },
						};

						if (lineItemsValues) {
							const lineItems: ILineItem[] = [];
							for (const lineItemValue of lineItemsValues) {
								const lineItem: ILineItem = {
									Tracking: [],
								};
								lineItem.AccountCode = lineItemValue.accountCode as string;
								lineItem.Description = lineItemValue.description as string;
								lineItem.DiscountRate = lineItemValue.discountRate as string;
								lineItem.ItemCode = lineItemValue.itemCode as string;
								lineItem.LineAmount = lineItemValue.lineAmount as string;
								lineItem.Quantity = (lineItemValue.quantity as number).toString();
								lineItem.TaxAmount = lineItemValue.taxAmount as string;
								lineItem.TaxType = lineItemValue.taxType as string;
								lineItem.UnitAmount = lineItemValue.unitAmount as string;
								// if (lineItemValue.trackingUi) {
								// 	//@ts-ignore
								// 	const { trackingValues } = lineItemValue.trackingUi as IDataObject[];
								// 	if (trackingValues) {
								// 		for (const trackingValue of trackingValues) {
								// 			const tracking: IDataObject = {};
								// 			tracking.Name = trackingValue.name as string;
								// 			tracking.Option = trackingValue.option as string;
								// 			lineItem.Tracking!.push(tracking);
								// 		}
								// 	}
								// }
								lineItems.push(lineItem);
							}
							body.LineItems = lineItems;
						}

						if (additionalFields.brandingThemeId) {
							body.BrandingThemeID = additionalFields.brandingThemeId as string;
						}
						if (additionalFields.currency) {
							body.CurrencyCode = additionalFields.currency as string;
						}
						if (additionalFields.currencyRate) {
							body.CurrencyRate = additionalFields.currencyRate as string;
						}
						if (additionalFields.date) {
							body.Date = additionalFields.date as string;
						}
						if (additionalFields.dueDate) {
							body.DueDate = additionalFields.dueDate as string;
						}
						if (additionalFields.dueDate) {
							body.DueDate = additionalFields.dueDate as string;
						}
						if (additionalFields.expectedPaymentDate) {
							body.ExpectedPaymentDate = additionalFields.expectedPaymentDate as string;
						}
						if (additionalFields.invoiceNumber) {
							body.InvoiceNumber = additionalFields.invoiceNumber as string;
						}
						if (additionalFields.lineAmountType) {
							body.LineAmountTypes = additionalFields.lineAmountType as string;
						}
						if (additionalFields.plannedPaymentDate) {
							body.PlannedPaymentDate = additionalFields.plannedPaymentDate as string;
						}
						if (additionalFields.reference) {
							body.Reference = additionalFields.reference as string;
						}
						if (additionalFields.sendToContact) {
							body.SentToContact = additionalFields.sendToContact as boolean;
						}
						if (additionalFields.status) {
							body.Status = additionalFields.status as string;
						}
						if (additionalFields.url) {
							body.Url = additionalFields.url as string;
						}

						responseData = await xeroApiRequest.call(this, 'POST', '/Invoices', body);
						responseData = responseData.Invoices;
					}
					if (operation === 'update') {
						const invoiceId = this.getNodeParameter('invoiceId', i) as string;
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i);

						const body: IInvoice = {
							organizationId,
						};

						if (updateFields.lineItemsUi) {
							const lineItemsValues = (updateFields.lineItemsUi as IDataObject)
								.lineItemsValues as IDataObject[];
							if (lineItemsValues) {
								const lineItems: ILineItem[] = [];
								for (const lineItemValue of lineItemsValues) {
									const lineItem: ILineItem = {
										Tracking: [],
									};
									lineItem.AccountCode = lineItemValue.accountCode as string;
									lineItem.Description = lineItemValue.description as string;
									lineItem.DiscountRate = lineItemValue.discountRate as string;
									lineItem.ItemCode = lineItemValue.itemCode as string;
									lineItem.LineAmount = lineItemValue.lineAmount as string;
									lineItem.Quantity = (lineItemValue.quantity as number).toString();
									lineItem.TaxAmount = lineItemValue.taxAmount as string;
									lineItem.TaxType = lineItemValue.taxType as string;
									lineItem.UnitAmount = lineItemValue.unitAmount as string;
									// if (lineItemValue.trackingUi) {
									// 	//@ts-ignore
									// 	const { trackingValues } = lineItemValue.trackingUi as IDataObject[];
									// 	if (trackingValues) {
									// 		for (const trackingValue of trackingValues) {
									// 			const tracking: IDataObject = {};
									// 			tracking.Name = trackingValue.name as string;
									// 			tracking.Option = trackingValue.option as string;
									// 			lineItem.Tracking!.push(tracking);
									// 		}
									// 	}
									// }
									lineItems.push(lineItem);
								}
								body.LineItems = lineItems;
							}
						}

						if (updateFields.type) {
							body.Type = updateFields.type as string;
						}
						if (updateFields.Contact) {
							body.Contact = { ContactID: updateFields.contactId as string };
						}
						if (updateFields.brandingThemeId) {
							body.BrandingThemeID = updateFields.brandingThemeId as string;
						}
						if (updateFields.currency) {
							body.CurrencyCode = updateFields.currency as string;
						}
						if (updateFields.currencyRate) {
							body.CurrencyRate = updateFields.currencyRate as string;
						}
						if (updateFields.date) {
							body.Date = updateFields.date as string;
						}
						if (updateFields.dueDate) {
							body.DueDate = updateFields.dueDate as string;
						}
						if (updateFields.dueDate) {
							body.DueDate = updateFields.dueDate as string;
						}
						if (updateFields.expectedPaymentDate) {
							body.ExpectedPaymentDate = updateFields.expectedPaymentDate as string;
						}
						if (updateFields.invoiceNumber) {
							body.InvoiceNumber = updateFields.invoiceNumber as string;
						}
						if (updateFields.lineAmountType) {
							body.LineAmountTypes = updateFields.lineAmountType as string;
						}
						if (updateFields.plannedPaymentDate) {
							body.PlannedPaymentDate = updateFields.plannedPaymentDate as string;
						}
						if (updateFields.reference) {
							body.Reference = updateFields.reference as string;
						}
						if (updateFields.sendToContact) {
							body.SentToContact = updateFields.sendToContact as boolean;
						}
						if (updateFields.status) {
							body.Status = updateFields.status as string;
						}
						if (updateFields.url) {
							body.Url = updateFields.url as string;
						}

						responseData = await xeroApiRequest.call(this, 'POST', `/Invoices/${invoiceId}`, body);
						responseData = responseData.Invoices;
					}
					if (operation === 'get') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						const invoiceId = this.getNodeParameter('invoiceId', i) as string;
						responseData = await xeroApiRequest.call(this, 'GET', `/Invoices/${invoiceId}`, {
							organizationId,
						});
						responseData = responseData.Invoices;
					}
					if (operation === 'getAll') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i);
						const options = this.getNodeParameter('options', i);
						if (options.statuses) {
							qs.statuses = (options.statuses as string[]).join(',');
						}
						if (options.orderBy) {
							qs.order = `${options.orderBy} ${
								options.sortOrder === undefined ? 'DESC' : options.sortOrder
							}`;
						}
						if (options.where) {
							qs.where = options.where;
						}
						if (options.createdByMyApp) {
							qs.createdByMyApp = options.createdByMyApp as boolean;
						}
						if (returnAll) {
							responseData = await xeroApiRequestAllItems.call(
								this,
								'Invoices',
								'GET',
								'/Invoices',
								{ organizationId },
								qs,
							);
						} else {
							const limit = this.getNodeParameter('limit', i);
							responseData = await xeroApiRequest.call(
								this,
								'GET',
								'/Invoices',
								{ organizationId },
								qs,
							);
							responseData = responseData.Invoices;
							responseData = responseData.splice(0, limit);
						}
					}
				}
				if (resource === 'attachments') {
					if (operation === 'upload') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						const endpoint = this.getNodeParameter('endpoint', i) as string;
						const guid = this.getNodeParameter('guid', i) as string;
						const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
						let filename = this.getNodeParameter('filename', i, '') as string;

						const item = items[i];
						if (!item.binary || !item.binary[binaryPropertyName]) {
							throw new NodeOperationError(this.getNode(), `Binary property "${binaryPropertyName}" not found on input item ${i}`);
						}

						if (!filename) {
							const binaryInfo = item.binary[binaryPropertyName] as IDataObject;
							filename = (binaryInfo.fileName as string) || 'file';
						}

						// Get the binary data buffer
						let binaryData: Buffer;
						if (this.helpers.getBinaryDataBuffer) {
							binaryData = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
						} else {
							binaryData = Buffer.from((item.binary[binaryPropertyName] as IDataObject).data as string, 'base64');
						}

						const uri = `https://api.xero.com/api.xro/2.0/${endpoint}/${guid}/Attachments/${filename}`;

						const requestOptions: IRequestOptions = {
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
						// Xero wraps the result in an "Attachments" property
						responseData = (responseData as IDataObject).Attachments ?? responseData;
					}
					if (operation === 'getlist') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						const endpoint = this.getNodeParameter('endpoint', i) as string;
						const guid = this.getNodeParameter('guid', i) as string;

						responseData = await xeroApiRequest.call(
							this,
							'GET',
							`/${endpoint}/${guid}/Attachments`,
							{ organizationId },
						);

						responseData = (responseData as IDataObject).Attachments ?? responseData;
					}
					if (operation === 'get') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						const endpoint = this.getNodeParameter('endpoint', i) as string;
						const guid = this.getNodeParameter('guid', i) as string;
						const filename = this.getNodeParameter('filename', i) as string;

						const uri = `https://api.xero.com/api.xro/2.0/${endpoint}/${guid}/Attachments/${filename}`;

						const buffer = (await this.helpers.requestOAuth2.call(this, 'xeroplusOAuth2Api', {
							method: 'GET',
							uri,
							encoding: null, // return Buffer
							json: false,
							headers: {
								'Xero-Tenant-Id': organizationId,
								Accept: 'application/octet-stream',
							},
						})) as Buffer;

						const binaryData = await this.helpers.prepareBinaryData(buffer, filename);
						responseData = { success: true };
						const executionBinary = {
							json: responseData,
							binary: {
								data: binaryData,
							},
						} as INodeExecutionData;

						returnData.push(executionBinary);
						continue;
					}
				}
				if (resource === 'contact') {
					if (operation === 'create') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i);
						const addressesUi = additionalFields.addressesUi as IDataObject;
						const phonesUi = additionalFields.phonesUi as IDataObject;

						const body: IContact = {
							Name: name,
						};

						if (additionalFields.accountNumber) {
							body.AccountNumber = additionalFields.accountNumber as string;
						}

						if (additionalFields.bankAccountDetails) {
							body.BankAccountDetails = additionalFields.bankAccountDetails as string;
						}

						if (additionalFields.contactNumber) {
							body.ContactNumber = additionalFields.contactNumber as string;
						}

						if (additionalFields.contactStatus) {
							body.ContactStatus = additionalFields.contactStatus as string;
						}

						if (additionalFields.defaultCurrency) {
							body.DefaultCurrency = additionalFields.defaultCurrency as string;
						}

						if (additionalFields.emailAddress) {
							body.EmailAddress = additionalFields.emailAddress as string;
						}

						if (additionalFields.firstName) {
							body.FirstName = additionalFields.firstName as string;
						}

						if (additionalFields.lastName) {
							body.LastName = additionalFields.lastName as string;
						}

						if (additionalFields.purchasesDefaultAccountCode) {
							body.PurchasesDefaultAccountCode =
								additionalFields.purchasesDefaultAccountCode as string;
						}

						if (additionalFields.salesDefaultAccountCode) {
							body.SalesDefaultAccountCode = additionalFields.salesDefaultAccountCode as string;
						}

						if (additionalFields.skypeUserName) {
							body.SkypeUserName = additionalFields.skypeUserName as string;
						}

						if (additionalFields.taxNumber) {
							body.taxNumber = additionalFields.taxNumber as string;
						}

						if (additionalFields.xeroNetworkKey) {
							body.xeroNetworkKey = additionalFields.xeroNetworkKey as string;
						}

						if (phonesUi) {
							const phoneValues = phonesUi?.phonesValues as IDataObject[];
							if (phoneValues) {
								const phones: IPhone[] = [];
								for (const phoneValue of phoneValues) {
									const phone: IPhone = {};
									phone.PhoneType = phoneValue.phoneType as string;
									phone.PhoneNumber = phoneValue.phoneNumber as string;
									phone.PhoneAreaCode = phoneValue.phoneAreaCode as string;
									phone.PhoneCountryCode = phoneValue.phoneCountryCode as string;
									phones.push(phone);
								}
								body.Phones = phones;
							}
						}

						if (addressesUi) {
							const addressValues = addressesUi?.addressesValues as IDataObject[];
							if (addressValues) {
								const addresses: IAddress[] = [];
								for (const addressValue of addressValues) {
									const address: IAddress = {};
									address.AddressType = addressValue.type as string;
									address.AddressLine1 = addressValue.line1 as string;
									address.AddressLine2 = addressValue.line2 as string;
									address.City = addressValue.city as string;
									address.Region = addressValue.region as string;
									address.PostalCode = addressValue.postalCode as string;
									address.Country = addressValue.country as string;
									address.AttentionTo = addressValue.attentionTo as string;
									addresses.push(address);
								}
								body.Addresses = addresses;
							}
						}

						responseData = await xeroApiRequest.call(this, 'POST', '/Contacts', {
							organizationId,
							Contacts: [body],
						});
						responseData = responseData.Contacts;
					}
					if (operation === 'get') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						const contactId = this.getNodeParameter('contactId', i) as string;
						//const options = this.getNodeParameter('options', i);
						//const qsContact: IDataObject = {};
						//if (options.summaryOnly) {
						//	qsContact.summaryOnly = options.summaryOnly as boolean;
						//}
						responseData = await xeroApiRequest.call(
							this,
							'GET',
							`/Contacts/${contactId}`,
							{ organizationId },
						//	qsContact,
						);
						responseData = responseData.Contacts;
					}
					if (operation === 'getAll') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						const options = this.getNodeParameter('options', i);
						if (options.statuses) {
							qs.statuses = (options.statuses as string[]).join(',');
						}
						if (options.orderBy) {
							qs.order = `${options.orderBy} ${ options.sortOrder ?? 'DESC' }`;
						}
						if (options.where) {
							qs.where = options.where;
						}
						if (options.createdByMyApp) {
							qs.createdByMyApp = options.createdByMyApp as boolean;
						}
						if (options.summaryOnly) {
							qs.summaryOnly = true;
							qs.page = 1;
							qs.pageSize = 9999; // Xero automatically paginates the response, this forces it to return all results within reason.
						}
						if (options.searchTerm) {
							qs.searchTerm = options.searchTerm as string;
						}
						responseData = await xeroApiRequest.call(
							this,
							'GET',
							'/Contacts',
							{ organizationId },
							qs,
						);
						responseData = responseData.Contacts;
					}
					if (operation === 'update') {
						const organizationId = this.getNodeParameter('organizationId', i) as string;
						const contactId = this.getNodeParameter('contactId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i);
						const addressesUi = updateFields.addressesUi as IDataObject;
						const phonesUi = updateFields.phonesUi as IDataObject;

						const body: IContact = {};

						if (updateFields.accountNumber) {
							body.AccountNumber = updateFields.accountNumber as string;
						}

						if (updateFields.name) {
							body.Name = updateFields.name as string;
						}

						if (updateFields.bankAccountDetails) {
							body.BankAccountDetails = updateFields.bankAccountDetails as string;
						}

						if (updateFields.contactNumber) {
							body.ContactNumber = updateFields.contactNumber as string;
						}

						if (updateFields.contactStatus) {
							body.ContactStatus = updateFields.contactStatus as string;
						}

						if (updateFields.defaultCurrency) {
							body.DefaultCurrency = updateFields.defaultCurrency as string;
						}

						if (updateFields.emailAddress) {
							body.EmailAddress = updateFields.emailAddress as string;
						}

						if (updateFields.firstName) {
							body.FirstName = updateFields.firstName as string;
						}

						if (updateFields.lastName) {
							body.LastName = updateFields.lastName as string;
						}

						if (updateFields.purchasesDefaultAccountCode) {
							body.PurchasesDefaultAccountCode = updateFields.purchasesDefaultAccountCode as string;
						}

						if (updateFields.salesDefaultAccountCode) {
							body.SalesDefaultAccountCode = updateFields.salesDefaultAccountCode as string;
						}

						if (updateFields.skypeUserName) {
							body.SkypeUserName = updateFields.skypeUserName as string;
						}

						if (updateFields.taxNumber) {
							body.taxNumber = updateFields.taxNumber as string;
						}

						if (updateFields.xeroNetworkKey) {
							body.xeroNetworkKey = updateFields.xeroNetworkKey as string;
						}

						if (phonesUi) {
							const phoneValues = phonesUi?.phonesValues as IDataObject[];
							if (phoneValues) {
								const phones: IPhone[] = [];
								for (const phoneValue of phoneValues) {
									const phone: IPhone = {};
									phone.PhoneType = phoneValue.phoneType as string;
									phone.PhoneNumber = phoneValue.phoneNumber as string;
									phone.PhoneAreaCode = phoneValue.phoneAreaCode as string;
									phone.PhoneCountryCode = phoneValue.phoneCountryCode as string;
									phones.push(phone);
								}
								body.Phones = phones;
							}
						}

						if (addressesUi) {
							const addressValues = addressesUi?.addressesValues as IDataObject[];
							if (addressValues) {
								const addresses: IAddress[] = [];
								for (const addressValue of addressValues) {
									const address: IAddress = {};
									address.AddressType = addressValue.type as string;
									address.AddressLine1 = addressValue.line1 as string;
									address.AddressLine2 = addressValue.line2 as string;
									address.City = addressValue.city as string;
									address.Region = addressValue.region as string;
									address.PostalCode = addressValue.postalCode as string;
									address.Country = addressValue.country as string;
									address.AttentionTo = addressValue.attentionTo as string;
									addresses.push(address);
								}
								body.Addresses = addresses;
							}
						}

						responseData = await xeroApiRequest.call(this, 'POST', `/Contacts/${contactId}`, {
							organizationId,
							Contacts: [body],
						});
						responseData = responseData.Contacts;
					}
				}
				// If routing already resolved the request, return what n8n put on the item
				if (items[i].json?.__response) {
					returnData.push(items[i]);
					continue;
				}
				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData as IDataObject[]),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as JsonObject).message } });
					continue;
				}
				throw error;
			}
		}
		return [returnData];
	}
}
