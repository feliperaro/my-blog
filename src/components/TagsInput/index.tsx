import React, { useState } from "react";
import { Tag } from "@/types/Tag";

const TagsInput: React.FC<{
  initialTags?: Tag[];
  onChange?: (tags: Tag[]) => void;
}> = ({ initialTags = [], onChange }) => {
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      setTags([...tags, { label: inputValue.trim() }]);
      setInputValue("");
      onChange?.([...tags, { label: inputValue.trim() }]);
    }
  };

  const handleRemoveTag = (tag: Tag) => {
    setTags(tags.filter((t) => t !== tag));
    onChange?.([...tags.filter((t) => t !== tag)]);
  };

  return (
    <div className="flex flex-col gap-3">
      <ul>
        {tags.map((tag) => (
          <li className="flex gap-2" key={tag.label}>
            <span>{tag.label}</span>
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
