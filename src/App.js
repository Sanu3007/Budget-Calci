import React, { useState, useEffect } from 'react';
import './App.css';
import Alert from './components/Alert';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import * as uuid from 'uuid'


//const initialExpenses = [
//{ id: uuid.v4(), charge: 'rent', amount: 1300 },
//{ id: uuid.v4(), charge: 'food', amount: 1500 },
//{ id: uuid.v4(), charge: 'clothes', amount: 700 },
//]
let initialExpenses
if (localStorage.getItem("expenses")) {
  initialExpenses = JSON.parse(localStorage.getItem("expenses"))
} else {
  initialExpenses = []
}

function App() {


  const [expenses, setExpenses] = useState(initialExpenses)
  const [charge, setCharge] = useState('')
  const [amount, setAmount] = useState('')
  const [alert, setAlert] = useState({ show: false })
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState(0)



  // useEffect 
  useEffect(() => {
    console.log('useEffect called')
    localStorage.setItem("expenses", JSON.stringify(expenses))
  },[expenses]);





  //Functions for handling form
  const handleCharge = e => {
    //console.log(`charge:${e.target.value}`)
    setCharge(e.target.value)
  }

  const handleAmount = e => {
    //console.log(`amount:${e.target.value}`)
    setAmount(e.target.value)
  }

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text })
    setTimeout(() => {
      setAlert({ show: false })
    }, 3000)
  }

  const handleSubmit = e => {
    //console.log('Submitted Sucessfully')
    e.preventDefault()
    if (charge !== '' && amount > 0) {
      if (edit) {
        let newExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item
        })
        setExpenses(newExpenses)
        setEdit(false)
        handleAlert({ type: "success", text: "Item Sucessfully edited" })
      }
      else {
        const newExpense = { id: uuid.v4(), charge, amount }
        setExpenses([...expenses, newExpense])
        handleAlert({ type: "success", text: "Item Sucessfully added" })
      }

      setCharge('')
      setAmount('')

    } else {
      //Call alert function
      handleAlert({ type: "danger", text: "Either item is not inserted or amount entered is not valid" })
    }
  }

  const clearItems = () => {
    //console.log('All items are cleared')
    setExpenses([])
    handleAlert({ type: "danger", text: "All items are successfully cleared" })
  }

  const handleDelete = (id) => {
    //console.log(`Item deleted with id :: ${id}`)
    let remainedExpenses = expenses.filter(expense => expense.id !== id)
    setExpenses(remainedExpenses)
    handleAlert({ type: "danger", text: "Item deleted successfully" })
  }

  const handleEdit = (id) => {
    let exp = expenses.find((item) => { return item.id === id })
    const { charge, amount } = exp
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
    setId(id)
  }



  return (
    <> {/*className="App">*/}
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      {/*<Alert />*/}
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          handleAmount={handleAmount}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          clearItems={clearItems}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </main>
      <h1>
        total cost:{" "}
        <span className="total">Rs.{expenses.reduce((acc, curr) => {
          return (acc += parseInt(curr.amount))
        }, 0)}</span>
      </h1>

    </>
  );
}

export default App;
