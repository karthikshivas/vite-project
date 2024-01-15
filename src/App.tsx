import Button from "./components/Button";
import { useEffect, useRef, useState } from "react";
import produce from "immer";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Form from "./components/Form";
import ExpenseList from "./expense/components/ExpenseList";
import ExpenseFilter from "./expense/components/ExpenseFilter";
import ExpenseForm from "./expense/components/ExpenseForm";
import axios, { AxiosError, CanceledError } from "axios";
import { FaBorderAll } from "react-icons/fa";
import apiClient from "./services/api-client";

interface User {
  id: number;
  name: string;
}

function App() {
  const [products, setProducts] = useState(["Product 1", "Product 2"]);

  const handleClear = () => {
    setProducts([]);
  };

  const expensesList = [
    { id: 1, description: "aaa", amount: 10, category: "Groceries" },
    { id: 2, description: "bbb", amount: 20, category: "Groceries" },
    { id: 3, description: "ccc", amount: 30, category: "Utilities" },
    { id: 4, description: "ddd", amount: 40, category: "Groceries" },
    { id: 5, description: "eee", amount: 50, category: "Utilities" },
  ];

  const [expenses, setExpenses] = useState(expensesList);

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleExpenseDelete = (id: number) => {
    console.log(id);
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const expensesVisible = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  const [users, setUsers] = useState<User[]>([]);

  const [error, setError] = useState("");

  const [isLoading, setLoading] = useState(false);

  //afterRender
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    //side Effect
    apiClient
      .get<User[]>("/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  // Another way to use axios with asyn await and try catch

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await axios.get<User[]>(
  //         "https://jsonplaceholder.typicode.com/cusers"
  //       );
  //       setUsers(res.data);
  //     } catch (err) {
  //       setError((err as AxiosError).message);
  //     }
  //   };
  // });

  return (
    <div>
      {/* <NavBar cartItemsCount={products.length} />

      <Cart cartItems={products} onClear={handleClear}/>

      <Form /> */}

      {isLoading && <div className="spinner-border"></div>}

      {error && <p className="text-danger">{error}</p>}

      <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        />
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>

      <ExpenseList expenses={expensesVisible} onDelete={handleExpenseDelete} />
    </div>
  );
}

export default App;
