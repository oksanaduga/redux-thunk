import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomerAction, removeCustomerAction } from './store/customerReducer';
import { addCashAction, getCashAction } from './store/cashReducer';
import { fetchCustomers } from './asyncActions/customers';

function App() {
  const dispatch = useDispatch();
  const cash = useSelector(state => state.cash.cash);
  const customers = useSelector(state => state.customers.customers);
  console.log(cash);

  const addCash = (cash) => {
    dispatch(addCashAction(cash))
  }

  const getCash = (cash) => {
    dispatch(getCashAction(cash))
  }

  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now(),
    }

    dispatch(addCustomerAction(customer))
  }

  const removeCustomer = (customer) => {
    dispatch(removeCustomerAction(customer.id))
  }

  return (
    <div className="App">
      <div style={{ fontSize: '30px' }}>{cash}</div>
      <hr />
      <button onClick={() => addCash(Number(prompt()))}>Пополнить счет</button>
      <button onClick={() => getCash(Number(prompt()))}>Снять со счета</button>

      <button onClick={() => addCustomer(prompt())}>Добавить клиента</button>
      <button onClick={() => dispatch(fetchCustomers())}>Получить клиентов из базы</button>
      {/* <button onClick={() => getCash(Number(prompt()))}>Удалить клиента</button> */}
      {customers.length > 0 ?
        <div>
          {customers.map(customer =>
            <div
              onClick={() => removeCustomer(customer)}
              style={{ fontSize: '20px', margin: '10px', border: '2px solid grey', width: 'fit-content', padding: '10px' }}
            >
              {customer.name}
            </div>
          )}
        </div>
        :
        <div style={{ fontSize: '30px' }}>No customers</div>
      }
    </div>
  );
}

export default App;
