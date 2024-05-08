import React, { useState } from 'react';

const TagInput = ({ onChange }) => {
  const [input, setInput] = useState('');
  const [tags, setTags] = useState([]);
  const [isKeyReleased, setIsKeyReleased] = useState(true);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (key === ',' && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      setTags(prevState => [...prevState, trimmedInput]);
      setInput('');
      onChange([...tags, trimmedInput]); // Chiamiamo la funzione onChange con i nuovi colori
      console.log(tags)

    }

    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag);
      onChange(tagsCopy); // Chiamiamo la funzione onChange con i colori aggiornati
      console.log(tagsCopy)
    }

    setIsKeyReleased(false);
  };

  const handleKeyUp = () => {
    setIsKeyReleased(true);
  }

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />
      <div>
        {tags.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
