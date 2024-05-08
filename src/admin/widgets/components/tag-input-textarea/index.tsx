import React, { useState } from 'react';

const TagInputTextarea = ({ onChange }) => {
  const [value, setValue] = useState('');
  const [tags, setTags] = useState([]);

  const handleInputChange = (e) => {
    console.log(e.target.value);

    setValue(e.target.value);
    if (onChange) {
      onChange(e.target.value.split(',').map(tag => tag.trim()));
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = value.trim();
      if (newTag) {
        setTags([...tags, newTag]);
        setValue('');
      }
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div>
      <textarea
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Aggiungi i colori separati dalla virgola"
      />
      <div>
        {tags.map(tag => (
          <span key={tag} className="tag">
            {tag}
            <button onClick={() => handleTagRemove(tag)}>X</button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagInputTextarea;
