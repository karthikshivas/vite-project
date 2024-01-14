import Button from "./components/Button";
import { useEffect, useRef, useState } from "react";
import produce from "immer";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Form from "./components/Form";
import ExpenseList from "./expense/components/ExpenseList";
import ExpenseFilter from "./expense/components/ExpenseFilter";
import ExpenseForm from "./expense/components/ExpenseForm";

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

  const ref = useRef<HTMLInputElement>(null);

  //afterRender
  useEffect(() => {
    //side Effect
    if (ref.current) ref.current.focus();
  });

  return (
    <div>
      {/* <NavBar cartItemsCount={products.length} />

      <Cart cartItems={products} onClear={handleClear}/>

      <Form /> */}

      <div className="mb-3">
        <input ref={ref} type="text" className="form-control" />
      </div>
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
