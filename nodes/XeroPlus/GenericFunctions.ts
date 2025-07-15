import type {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	IDataObject,
	JsonObject,
	IHttpRequestMethods,
	IRequestOptions,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

export async function xeroApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	resource: string,

	body: any = {},
	qs: IDataObject = {},
	uri?: string,
	headers: IDataObject = {},
): Promise<any> {
	const options: IRequestOptions = {
		headers: {
			'Content-Type': 'application/json',
		},
		method,
		body,
		qs,
		uri: uri || `https://api.xero.com/api.xro/2.0${resource}`,
		json: true,
	};
	try {
		if (body.organizationId) {
			options.headers = { ...options.headers, 'Xero-tenant-id': body.organizationId };
			delete body.organizationId;
		}
		if (Object.keys(headers).length !== 0) {
			options.headers = Object.assign({}, options.headers, headers);
		}
		if (Object.keys(body as IDataObject).length === 0) {
			delete options.body;
		}
		return await this.helpers.requestOAuth2.call(this, 'xeroplusOAuth2Api', options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

export async function xeroApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	propertyName: string,
	method: IHttpRequestMethods,
	endpoint: string,

	body: any = {},
	query: IDataObject = {},
	headers: IDataObject = {},
): Promise<any> {
	const returnData: IDataObject[] = [];

	let responseData;
	query.page = 1;

	do {
		// Pass a fresh copy of body on every request because xeroApiRequest mutates (deletes organizationId)
		const requestBody = { ...(body as IDataObject) };
		responseData = await xeroApiRequest.call(this, method, endpoint, requestBody, query, undefined, headers);
		query.page++;
		returnData.push.apply(returnData, responseData[propertyName] as IDataObject[]);
	} while (responseData[propertyName].length !== 0);

	return returnData;
}

// Function: Transform Reports for Balance Sheet, Budget Summary, Profit and Loss, and Trial Balance in a more readable format	
export function transformReport(reports: any[]): any {
	if (!reports || !Array.isArray(reports) || reports.length === 0) {
		return reports;
	}

	return reports.map(report => {
		const transformed = {
			reportInfo: {
				id: report.ReportID,
				name: report.ReportName,
				type: report.ReportType,
				titles: report.ReportTitles,
				reportDate: report.ReportDate,
				updatedDate: report.UpdatedDateUTC
			},
			lineItems: [] as any[],
			summary: {} as any
		};

		if (report.Rows && Array.isArray(report.Rows)) {
			const lineItems: any[] = [];
			const summaryItems: any[] = [];
			let periodHeaders: string[] = [];

			// Extract period headers from the first Header row
			const headerRow = report.Rows.find((row: any) => row.RowType === 'Header');
			if (headerRow && headerRow.Cells) {
				periodHeaders = headerRow.Cells.slice(1).map((cell: any) => cell.Value || '').filter((value: string) => value);
			}

			// Check if this is a Trial Balance report (has fixed columns)
			const isTrialBalance = report.ReportType === 'TrialBalance';

			function processRows(rows: any[], sectionTitle: string = '') {
				for (const row of rows) {
					if (row.RowType === 'Section' && row.Rows) {
						processRows(row.Rows, row.Title || sectionTitle);
					} else if (row.RowType === 'Row' && row.Cells && row.Cells.length >= 2) {
						const accountName = row.Cells[0]?.Value;
						const accountId = row.Cells[0]?.Attributes?.find((attr: any) => attr.Id === 'account')?.Value;
						
						if (accountName) {
							if (isTrialBalance) {
								// Trial Balance has fixed columns: Account, Debit, Credit, YTD Debit, YTD Credit
								const debit = row.Cells[1]?.Value || '';
								const credit = row.Cells[2]?.Value || '';
								const ytdDebit = row.Cells[3]?.Value || '';
								const ytdCredit = row.Cells[4]?.Value || '';
								
								lineItems.push({
									section: sectionTitle,
									accountName: accountName,
									accountId: accountId || null,
									debit: parseFloat(debit.toString().replace(/,/g, '')) || 0,
									debitFormatted: debit.toString(),
									credit: parseFloat(credit.toString().replace(/,/g, '')) || 0,
									creditFormatted: credit.toString(),
									ytdDebit: parseFloat(ytdDebit.toString().replace(/,/g, '')) || 0,
									ytdDebitFormatted: ytdDebit.toString(),
									ytdCredit: parseFloat(ytdCredit.toString().replace(/,/g, '')) || 0,
									ytdCreditFormatted: ytdCredit.toString()
								});
							} else {
								// Other reports use periods structure
								const periods: any[] = [];
								
								// Process each period column (skip first cell which is account name)
								for (let i = 1; i < row.Cells.length; i++) {
									const cell = row.Cells[i];
									const amount = cell?.Value;
									const periodDate = periodHeaders[i - 1] || `Period ${i}`;
									
									if (amount !== undefined) {
										periods.push({
											periodDate: periodDate,
											amount: parseFloat(amount.toString().replace(/,/g, '')) || 0,
											amountFormatted: amount.toString()
										});
									}
								}
								
								if (periods.length > 0) {
									lineItems.push({
										section: sectionTitle,
										accountName: accountName,
										accountId: accountId || null,
										periods: periods
									});
								}
							}
						}
					} else if (row.RowType === 'SummaryRow' && row.Cells && row.Cells.length >= 2) {
						const summaryName = row.Cells[0]?.Value;
						
						if (summaryName) {
							if (isTrialBalance) {
								// Trial Balance summary rows have fixed columns
								const debit = row.Cells[1]?.Value || '';
								const credit = row.Cells[2]?.Value || '';
								const ytdDebit = row.Cells[3]?.Value || '';
								const ytdCredit = row.Cells[4]?.Value || '';
								
								summaryItems.push({
									section: sectionTitle,
									name: summaryName,
									debit: parseFloat(debit.toString().replace(/,/g, '')) || 0,
									debitFormatted: debit.toString(),
									credit: parseFloat(credit.toString().replace(/,/g, '')) || 0,
									creditFormatted: credit.toString(),
									ytdDebit: parseFloat(ytdDebit.toString().replace(/,/g, '')) || 0,
									ytdDebitFormatted: ytdDebit.toString(),
									ytdCredit: parseFloat(ytdCredit.toString().replace(/,/g, '')) || 0,
									ytdCreditFormatted: ytdCredit.toString()
								});
							} else {
								// Other reports use periods structure for summaries
								const periods: any[] = [];
								
								// Process each period column for summary rows
								for (let i = 1; i < row.Cells.length; i++) {
									const cell = row.Cells[i];
									const amount = cell?.Value;
									const periodDate = periodHeaders[i - 1] || `Period ${i}`;
									
									if (amount !== undefined) {
										periods.push({
											periodDate: periodDate,
											amount: parseFloat(amount.toString().replace(/,/g, '')) || 0,
											amountFormatted: amount.toString()
										});
									}
								}
								
								if (periods.length > 0) {
									summaryItems.push({
										section: sectionTitle,
										name: summaryName,
										periods: periods
									});
								}
							}
						}
					}
				}
			}

			processRows(report.Rows);
			
			transformed.lineItems = lineItems;
			transformed.summary = {
				totals: summaryItems,
				totalLineItems: lineItems.length,
				sections: [...new Set(lineItems.map(item => item.section).filter(s => s))],
				...(isTrialBalance ? {} : { periodHeaders: periodHeaders })
			};
		}

		return transformed;
	});
}
