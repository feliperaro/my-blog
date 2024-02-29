import React, { useState } from "react";

const TagsInput: React.FC<{
  initialTags?: string[];
  onChange?: (tags: string[]) => void;
}> = ({ initialTags = [], onChange }) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
      onChange?.([...tags, inputValue.trim()]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
    onChange?.([...tags.filter((t) => t !== tag)]);
  };

  return (
    <div className="flex flex-col gap-3">
      <ul>
        {tags.map((tag: string, index: number) => (
          <li className="flex gap-2" key={index}>
            <span>{tag}</span>
            <button
              className="hover:font-bold"
              onClick={() => handleRemoveTag(tag)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <input
        className="p-2"
        onChange={handleInputChange}
        onKeyDown={handleAddTag}
        placeholder="Add tag..."
        type="text"
        value={inputValue}
      />
    </div>
  );
};

export default TagsInput;
