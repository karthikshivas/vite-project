import { useState } from "react";
import { FaCalendarCheck } from "react-icons/fa";
 

interface ListGroupProps {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup(props: ListGroupProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { items, heading, onSelectItem } = props;

  //   items = []
  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 ? <p>No items</p> : null}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item)  
            }}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            <FaCalendarCheck />   {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
