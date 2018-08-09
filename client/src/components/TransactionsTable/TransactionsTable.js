import React from 'react';
import { Table } from 'reactstrap';
import API from "../../utils/API.js";

class TransactionsTable extends React.Component {

  deleteTransaction = event => {

    let transactionData = {
      sheetId: this.props.sheetId,
      transactionId: this.event.target.id,
      userId: this.props.userId
    }

    API.deleteTransaction(transactionData)
    .then((result) => {
      console.log('transaction deleted');
      alert("Transaction deleted successfully.");
    }).catch((err)=> {
      console.log(err);
      alert("There was an error deleting the transaction. Please try again.");
    })
  }

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
            <th>Total Balance</th>
            <th>Due Date</th>
            <th>Amount Past Due</th>
            <th>Dept. Name</th>
            <th>Location Name</th>
            <th>Representative</th>
            <th>Delete</th>
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
              <td>${Transaction.totalBalance}</td>
              <td>{Transaction.dueDate.substr(0, 10)}</td>
              <td>{Transaction.amountPastDue.substr(0, 10)}</td>
              <td>{Transaction.departmentName}</td>
              <td>{Transaction.locationName}</td>
              <td>{Transaction.representativeName}</td>
              <td>{this.props.userName === Transaction.companyName ? (
                <button onClick={this.deleteTransaction} id={Transaction.id}>Delete</button>
                ):(
                <p><i>No access</i></p>
                )}</td>
            </tr>
          );
        }))}
        
        </tbody>
      </Table>
    );
  }
}

export default TransactionsTable;