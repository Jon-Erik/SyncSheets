import React from 'react';
import { Table } from 'reactstrap';

class TransactionsTable extends React.Component {

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Invoice #</th>
            <th>Vendor #</th>
            <th>Item #</th>
            <th>Credit #</th>
            <th>Debit #</th>
            <th>Total Balance</th>
            <th>Due Date</th>
            <th>Amount Past Due</th>
            <th>Dept. Name</th>
            <th>Location Name</th>
            <th>Representative</th>
          </tr>
        </thead>
        <tbody>
        {!this.props.transactions.length ? (
          <tr>
            <td><i>No transactions to show at this time.</i></td>
          </tr>
        ) : (
            this.props.transactions.map(Transaction => {
          return (
            <tr>
              <td>{Transaction.companyName}</td>
              <td>{Transaction.invoiceNumber}</td>
              <td>{Transaction.vendorNumber}</td>
              <td>{Transaction.itemNumber}</td>
              <td>{Transaction.creditNumber}</td>
              <td>{Transaction.totalBalance}</td>
              <td>{Transaction.dueDate}</td>
              <td>{Transaction.amountPastDue}</td>
              <td>{Transaction.departmentName}</td>
              <td>{Transaction.locationName}</td>
              <td>{Transaction.representativeName}</td>
            </tr>
          );
        }))}
        
        </tbody>
      </Table>
    );
  }
}

export default TransactionsTable;