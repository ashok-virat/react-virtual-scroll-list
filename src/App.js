import React, { useRef, useEffect, useState } from 'react';
import VirtualList from './Component/Wrapper'; // Adjust the import according to your project
import './App.css'

function App() {
  const Items = [
    {
      name: "John Doe",
      city: "New York",
      village: "Greenwood",
      age: 28,
      occupation: "Engineer"
    }
  ];

  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
    }
  }, []);

  return (
    <div className="card-container" ref={containerRef}>
      <VirtualList
        items={Array.from({ length: 10000 }).map((value, key) => (
          <div className="card" key={key}>
            <h3>{Items[0].name}{key}</h3>
            <p><strong>City:</strong> {Items[0].city}{key}</p>
            <p><strong>Village:</strong> {Items[0].village}{key}</p>
            <p><strong>Age:</strong> {Items[0].age}{key}</p>
            <p><strong>Occupation:</strong> {Items[0].occupation}{key}</p>
          </div>
        ))}
        height={containerHeight}
        width={500}
        listId="card"
      />
    </div>
  );
}

export default App;
