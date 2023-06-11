import React, { useState } from 'react';
import './DragDrop.css';
import img1 from './img1.jpg';
import img2 from './img2.jpg'
import img3 from './img3.jpg'
import img4 from './img4.jpg'
import img5 from './img5.jpg'
import img6 from './img6.jpg'


const DragDrop = () => {
  const [items, setItems] = useState([
    {id:1, image: img1},
    {id:2, image: img2},
    {id:3, image: img3},
    {id:4, image: img4},
    {id:5, image: img5},
    {id:6, image: img6},

  ]);
  const [droppedItems, setDroppedItems] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData('text/plain', index);
    setIsDragging(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const index = event.dataTransfer.getData('text/plain');
    const draggedItem = items[index];

    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
    setDroppedItems((prevItems) => [...prevItems, draggedItem]);
    setIsDragging(false);
    setShowSuccessMessage(true);

    // Hide the success message after 2 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000);
  };

  const handleReset = () => {
    setItems([ {id:1, image: img1},
      {id:2, image: img2},
      {id:3, image: img3},
      {id:4, image: img4},
      {id:5, image: img5},
      {id:6, image: img6},]);
    setDroppedItems([]);
    setShowSuccessMessage(false);
  };

  return (
    <div className="container">
      <div className="column">
        <h2>Container 1</h2>
        <div className="items-container">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`item ${isDragging ? 'dragging' : ''}`}
              draggable
              onDragStart={(event) => handleDragStart(event, index)}
              onDragEnd={()=> setIsDragging(false)}
            >

<img src={item.image} alt={`Item ${item.id}`} />
            </div>
          ))}
        </div>
      </div>

      <div
        className="column"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <h2>Container 2</h2>
        <div className="items-container">
          {droppedItems.map((item, index) => (
            <div key={item.id} className="item-dropped">
                <img src={item.image} alt={`Item ${item.id}`} />
            </div>
          ))}
        </div>
      </div>

      {showSuccessMessage && <p className="success-message">Item dropped successfully!</p>}

      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default DragDrop;
