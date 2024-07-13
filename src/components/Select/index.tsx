import { useState } from 'react';
import { City } from '../../types';

interface SelectProps {
  type: string;
  placeholder: string;
  onChange?: (_1: string | City, _2: string) => void;
  options?: string[] | City[];
}
const Select = ({ type, placeholder, options, onChange }: SelectProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string | City | null>(null);

  const toggleDropdown = () => setOpen(!isOpen);
  const handleDropdownClick = async (value: string | City) => {
    setSelectedItem(value);
    if (onChange) {
      onChange(value, type);
    }
  };

  const getLabel = (option: string | City) => {
    // For city type get the value from the second parameter of the array
    return type === 'CITY' ? option[1] : option;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>, option: string | City) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleDropdownClick(option);
      setOpen(false);
    }
  };
  if (!options?.length) {
    // Disabled Selector
    return (
      <li>
        <label className="opacity-10 block m-4">
          {type}
          <div className="relative border border-black rounded-lg bg-white">
            <p className="p-4 cursor-pointer flex justify-between items-center w-full">
              {placeholder}
              <span className="transform transition-transform duration-200 rotate-180">▲</span>
            </p>
          </div>
        </label>
      </li>
    );
  }

  return (
    <li>
      <label className="block m-4">
        {type}
        <div className="relative border border-black rounded-lg bg-white">
          <button
            className="p-4 cursor-pointer flex justify-between items-center w-full"
            onClick={toggleDropdown}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            {selectedItem !== null ? getLabel(selectedItem) : placeholder}
            <span className={`transform transition-transform duration-200 ${isOpen ? '' : 'rotate-180'}`}>▲</span>
          </button>
          {isOpen && (
            <ul className="border-t bg-white shadow-lg absolute w-full z-9 mt-2" role="listbox">
              {options.map((option, index) => (
                <li
                  className={`p-2 ${option === selectedItem ? 'bg-blue-100' : 'hover:bg-gray-100'} cursor-pointer`}
                  key={`${option}-${index}`}
                  onClick={() => handleDropdownClick(option)}
                  onKeyDown={(event) => handleKeyDown(event, option)}
                  role="option"
                  aria-selected={option === selectedItem}
                  tabIndex={0}
                >
                  <p className="font-semibold text-sm">{getLabel(option)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </label>
    </li>
  );
};
export default Select;