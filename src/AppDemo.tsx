import ListGroup from "./components/ListGroup";
import Button from "./components/Button";
import Alert from "./components/Alert";
import { useState } from "react";
import Like from "./components/Like";
import produce from "immer";

function App() {

  const hanldeSelectItem = (item: string) => {
    console.log(item);
  };

  const [alertBool, setAlertVisibility] = useState(false);

  const showAlert = () => {
    setAlertVisibility(true);
  }

  const hideAlert = () => {
    setAlertVisibility(false);
  }

  const [drink, setDrink] = useState({
    title: "Red Bull",
    price: 5,
    address: {
      city: "Chennai",
      pincode: "60001"
    }
  });

  const handleAddDrink = () => {
    const newDrink = {
      ...drink,
      price: 6,
      address: {
        ...drink.address, pincode: "60002"
      }
    };
    setDrink(newDrink);
  }


  const [tags, setTags] = useState(['Happy', 'Sad']);

  const addTag = () => {
    setTags([...tags, 'Cheerful']);
  };

  const removeTag = () => {
    setTags(tags.filter(tag => tag !== 'Sad'));
  };

  const updateTag = () => {
    setTags(tags.map(tag => tag === 'Happy' ? 'Happieee' : tag));
  }


  // updating array of objects

  const [bugs, setBugs] = useState([
      {id: 1, title: 'Bug 1', fixed: false},
      {id: 2, title: 'Bug 2', fixed: false}
  ]);

  const updateBug = () => {
    setBugs(bugs.map(bug => bug.id === 1 ? {...bug, fixed: true} : bug));
  }

  // update bug using immer produce fn

  const updateBugWithImmer = () => {
    setBugs(produce(draft => {
      const bug = draft.find(bug => bug.id === 1);
      if(bug) bug.fixed = true;
    }));

  }

  
  let items = ["Cricket", "Football", "Judo", "Boxing", "Dance"];
  return (
    <div>
      <Like onClick = {() => {console.log("Clicked")}}/>
      <ListGroup
        items={items}
        heading="Sports"
        onSelectItem={hanldeSelectItem}
      />
      {alertBool && <Alert onClose={hideAlert}>My Alert</Alert>}
      <Button onClick={showAlert}>
        Save
      </Button>
      {drink.price} - {drink.address.pincode}
      <Button onClick={handleAddDrink}>
        Add Drink Price
      </Button>
      {tags.map(tag => tag + ' ')}
      <Button onClick={updateTag}>
        Add Tag
      </Button>

      {bugs.map(bug => <p key={bug.id}>{bug.title} - {bug.fixed ? 'Fixed' : 'New'}</p>)}
      <Button onClick={updateBugWithImmer}>
        Update Bug
      </Button>

      
    </div>
  );
}

export default App;
