"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xeroApiRequest = xeroApiRequest;
exports.xeroApiRequestAllItems = xeroApiRequestAllItems;
exports.transformReport = transformReport;
const n8n_workflow_1 = require("n8n-workflow");
async function xeroApiRequest(method, resource, body = {}, qs = {}, uri, headers = {}) {
    const options = {
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
        if (Object.keys(body).length === 0) {
            delete options.body;
        }
        return await this.helpers.requestOAuth2.call(this, 'xeroplusOAuth2Api', options);
    }
    catch (error) {
        throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
    }
}
async function xeroApiRequestAllItems(propertyName, method, endpoint, body = {}, query = {}, headers = {}) {
    const returnData = [];
    let responseData;
    query.page = 1;
    do {
        const requestBody = { ...body };
        responseData = await xeroApiRequest.call(this, method, endpoint, requestBody, query, undefined, headers);
        query.page++;
        returnData.push.apply(returnData, responseData[propertyName]);
    } while (responseData[propertyName].length !== 0);
    return returnData;
}
function transformReport(reports) {
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
            lineItems: [],
            summary: {}
        };
        if (report.Rows && Array.isArray(report.Rows)) {
            const lineItems = [];
            const summaryItems = [];
            let periodHeaders = [];
            const headerRow = report.Rows.find((row) => row.RowType === 'Header');
            if (headerRow && headerRow.Cells) {
                periodHeaders = headerRow.Cells.slice(1).map((cell) => cell.Value || '').filter((value) => value);
            }
            const isTrialBalance = report.ReportType === 'TrialBalance';
            function processRows(rows, sectionTitle = '') {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
                for (const row of rows) {
                    if (row.RowType === 'Section' && row.Rows) {
                        processRows(row.Rows, row.Title || sectionTitle);
                    }
                    else if (row.RowType === 'Row' && row.Cells && row.Cells.length >= 2) {
                        const accountName = (_a = row.Cells[0]) === null || _a === void 0 ? void 0 : _a.Value;
                        const accountId = (_d = (_c = (_b = row.Cells[0]) === null || _b === void 0 ? void 0 : _b.Attributes) === null || _c === void 0 ? void 0 : _c.find((attr) => attr.Id === 'account')) === null || _d === void 0 ? void 0 : _d.Value;
                        if (accountName) {
                            if (isTrialBalance) {
                                const debit = ((_e = row.Cells[1]) === null || _e === void 0 ? void 0 : _e.Value) || '';
                                const credit = ((_f = row.Cells[2]) === null || _f === void 0 ? void 0 : _f.Value) || '';
                                const ytdDebit = ((_g = row.Cells[3]) === null || _g === void 0 ? void 0 : _g.Value) || '';
                                const ytdCredit = ((_h = row.Cells[4]) === null || _h === void 0 ? void 0 : _h.Value) || '';
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
                            }
                            else {
                                const periods = [];
                                for (let i = 1; i < row.Cells.length; i++) {
                                    const cell = row.Cells[i];
                                    const amount = cell === null || cell === void 0 ? void 0 : cell.Value;
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
                    }
                    else if (row.RowType === 'SummaryRow' && row.Cells && row.Cells.length >= 2) {
                        const summaryName = (_j = row.Cells[0]) === null || _j === void 0 ? void 0 : _j.Value;
                        if (summaryName) {
                            if (isTrialBalance) {
                                const debit = ((_k = row.Cells[1]) === null || _k === void 0 ? void 0 : _k.Value) || '';
                                const credit = ((_l = row.Cells[2]) === null || _l === void 0 ? void 0 : _l.Value) || '';
                                const ytdDebit = ((_m = row.Cells[3]) === null || _m === void 0 ? void 0 : _m.Value) || '';
                                const ytdCredit = ((_o = row.Cells[4]) === null || _o === void 0 ? void 0 : _o.Value) || '';
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
                            }
                            else {
                                const periods = [];
                                for (let i = 1; i < row.Cells.length; i++) {
                                    const cell = row.Cells[i];
                                    const amount = cell === null || cell === void 0 ? void 0 : cell.Value;
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
//# sourceMappingURL=GenericFunctions.js.map