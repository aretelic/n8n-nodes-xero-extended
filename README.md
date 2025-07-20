# n8n-nodes-xero-plus

[![npm version](https://badge.fury.io/js/n8n-nodes-xero-plus.svg)](https://badge.fury.io/js/n8n-nodes-xero-plus)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An enhanced Xero integration for n8n that extends the standard Xero node with additional resources and improved functionality.

## Features

This node provides enhanced functionality for Xero integration, including additional resources and quality-of-life improvements that go beyond the standard Xero node.

## Resources

### 📞 Contacts
Enhanced contact management with improved search and performance options:

- **Get Contact** - Retrieve a single contact with optional summary mode
- **Get Many Contacts** - Retrieve multiple contacts with enhanced search capabilities
- **Create Contact** - Create new contacts
- **Update Contact** - Update existing contacts
- **Delete Contact** - Remove contacts

**Improvements:**
- ✅ **Summary Only Option** - Returns lightweight responses for faster execution
- ✅ **Enhanced Search** - Case-insensitive text search across Name, FirstName, LastName, ContactNumber, CompanyNumber, and EmailAddress fields

### 🧾 Invoices
Comprehensive invoice management with enhanced functionality:

- **Get Invoice** - Retrieve a single invoice with optional summary mode
- **Get Many Invoices** - Retrieve multiple invoices with search capabilities
- **Create Invoice** - Create new invoices
- **Update Invoice** - Update existing invoices
- **Delete Invoice** - Remove invoices

**Improvements:**
- ✅ **Summary Only Option** - Returns lightweight responses for faster execution
- ✅ **Enhanced Search** - Case-insensitive text search across invoice fields
- ✅ **Contact Selection** - Dropdown to select contacts by name with fallback to ContactID via expression

### 🏢 Organisations
Manage organization information and connections:

- **Get Connected Organisations** - Retrieve list of connected organizations
- **Get Organisation Details** - Get detailed organization information

### 📎 Attachments
Complete attachment management for all transaction types:

- **Upload Attachment** - Upload files to any transaction (Invoices, Bills, Bank Transactions, etc.)
- **Get Attachments** - Retrieve list of attachments for a transaction
- **Get Attachment** - Download specific attachment files

### 💰 Accounts
Full account management capabilities:

- **Create Account** - Create new chart of accounts entries
- **Get Account** - Retrieve specific account details
- **Get Many Accounts** - Retrieve multiple accounts with filtering
- **Update Account** - Modify existing accounts
- **Delete Account** - Remove accounts

**Quality of Life Improvements:**
- ✅ **Enhanced Filtering** - Click-and-select filters for easier "Get All" result filtering

### 📊 Reports
Comprehensive reporting capabilities:

- **Get 1099 Report** - Retrieve 1099 tax reports
- **Get Balance Sheet Report** - Access balance sheet data
- **Get Budget Summary Report** - Retrieve budget information
- **Get Profit and Loss Report** - Access P&L statements

**Quality of Life Improvements:**
- ✅ **User-Friendly Formatting** - Compact, readable format for Balance Sheet, Budget Summary, Profit and Loss, and Trial Balance reports

### 🏦 Bank Transactions
Complete bank transaction management:

- **Create Bank Transaction** - Create new bank transactions
- **Get Bank Transactions** - Retrieve transaction history
- **Update Bank Transaction** - Modify existing transactions
- **Delete Bank Transaction** - Remove transactions

### 💸 Bank Transfers
Manage bank transfers between accounts:

- **Create Bank Transfer** - Create transfers between bank accounts
- **Get Bank Transfers** - Retrieve transfer history
- **Update Bank Transfer** - Modify existing transfers
- **Delete Bank Transfer** - Remove transfers

### 📝 History and Notes
Track changes and manage notes:

- **Get History** - Retrieve transaction history
- **Get Notes** - Access notes for transactions
- **Create Note** - Add new notes
- **Update Note** - Modify existing notes
- **Delete Note** - Remove notes

## Installation

### For n8n Cloud users

This node is available on n8n Cloud. You can find it in the node library under "Xero +".

### For self-hosted n8n users

1. Install the package in your n8n installation:
   ```bash
   npm install n8n-nodes-xero-plus
   ```

2. Restart your n8n instance

3. The "Xero +" node will now be available in your node library

## Setup

1. Add the "Xero +" node to your workflow
2. Create a new Xero OAuth2 credential or use an existing one
3. Select the resource you want to work with
4. Configure the operation and parameters as needed

## Credentials

This node uses the same Xero OAuth2 credentials as the standard Xero node. You can use your existing Xero credentials or create new ones following the [Xero API documentation](https://developer.xero.com/app/).

## Usage Examples

### Get Contacts with Search
Use the enhanced search functionality to find contacts by name, email, or other fields:

```javascript
// Search for contacts containing "john" in any searchable field
{
  "resource": "contact",
  "operation": "getMany",
  "search": "john"
}
```

### Get Invoices with Summary
Retrieve lightweight invoice data for faster processing:

```javascript
// Get invoice summary only
{
  "resource": "invoice",
  "operation": "get",
  "summaryOnly": true
}
```

### Upload Attachment to Invoice
Attach files to any transaction type:

```javascript
// Upload a file to an invoice
{
  "resource": "attachments",
  "operation": "upload",
  "transactionType": "Invoice",
  "transactionId": "{{$json.InvoiceID}}",
  "fileName": "receipt.pdf",
  "fileData": "{{$binary.data}}"
}
```

## Version History

### v1.0.1
- Enhanced Contacts and Invoices with summary options and search functionality
- Added comprehensive Organisations, Attachments, Accounts, Reports, Bank Transactions, Bank Transfers, and History and Notes resources
- Improved user experience with dropdown selections and enhanced filtering

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)

## Support

For support, please open an issue on the [GitHub repository](https://github.com/Mad-Man-Dan/n8n-nodes-xero-plus).

## Author

**Daniel Fonseca** - [daniel@appvisory.dev](mailto:daniel@appvisory.dev)

---

Built with ❤️ for the n8n community
