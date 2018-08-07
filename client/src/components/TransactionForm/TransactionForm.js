import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import API from "../../utils/API.js";

class TransactionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      companyName: this.props.userName,
      invoiceNumber: "",
      vendorNumber: "",
      itemNumber: "",
      creditNumber: "",
      totalBalance: "",
      dueDate: "",
      amountPastDue: "",
      departmentName: "",
      locationName: "",
      representativeName: "",
      sheetId: this.props.sheetId
    }
  }

  handleInputChange = event => {
    const {name, value} = event.target;

    this.setState({
      [name]: value
    });
  }

  submitTransaction = event => {

    let sheetData = {
      companyName: this.state.companyName,
      invoiceNumber: this.state.invoiceNumber,
      vendorNumber: this.state.vendorNumber,
      itemNumber: this.state.itemNumber,
      creditNumber: this.state.creditNumber,
      totalBalance: this.state.totalBalance,
      dueDate: this.state.dueDate,
      amountPastDue: this.state.amountPastDue,
      departmentName: this.state.departmentName,
      locationName: this.state.locationName,
      representativeName: this.state.representativeName,
      sheetId: this.state.sheetId
    }

    console.log(sheetData);
  }

  render() {
    return (
      <div>
        <h5>Create a Transaction with this form:</h5>
        <Form>
          <FormGroup>
              <Label>Company/User Name</Label>
              <p><b>{this.state.companyName}</b></p>
          </FormGroup>
          <FormGroup>
              <Label>Invoice Number <i>(alphanumeric characters accepted)</i></Label>
              <Input type="text" 
                     name="invoiceNumber" 
                     placeholder="123AB"
                     onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup>
              <Label>Vendor Number <i>(alphanumeric characters accepted)</i></Label>
              <Input type="text" 
                     name="vendorNumber" 
                     placeholder="123AB"
                     onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup>
              <Label>Item Number <i>(numbers only)</i></Label>
              <Input type="text" 
                     name="itemNumber" 
                     placeholder="12345"
                     onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup>
              <Label>Credit Number <i>(alphanumeric characters accepted)</i></Label>
              <Input type="text" 
                     name="creditNumber" 
                     placeholder="123AB"
                     onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup>
              <Label>Total Balance <i>(numbers only)</i></Label>
              <Input type="text" 
                     name="totalBalance" 
                     placeholder="234.53"
                     onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup>
              <Label>Due Date <i>(YYYY-MM-DD)</i></Label>
              <Input type="text" 
                     name="dueDate" 
                     placeholder="2018-08-07"
                     onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup>
              <Label>Amount Past Date <i>(YYYY-MM-DD)</i></Label>
              <Input type="text" 
                     name="amountPastDue" 
                     placeholder="2018-08-30"
                     onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup>
              <Label>Department</Label>
              <Input type="text" 
                     name="departmentName" 
                     placeholder="Sales"
                     onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup>
              <Label>Location</Label>
              <Input type="text" 
                     name="locationName" 
                     placeholder="City Name"
                     onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup>
              <Label>Representative</Label>
              <Input type="text" 
                     name="representativeName" 
                     placeholder="City Name"
                     onChange={this.handleInputChange}/>
          </FormGroup>
          <Button onClick={this.submitTransaction}>Submit Transaction</Button>
        </Form>
      </div>
    );
  }
}

export default TransactionForm;