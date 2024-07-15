import { useEffect, useState } from 'react';
import { City } from '../../types';

interface SelectProps {
  type: string;
  selectedValue?: string | City | null;
  placeholder: string;
  onChange?: (_arg1: string | City, _arg2: string) => void;
  options?: string[] | City[];
}
const Select = ({ type, placeholder, options, onChange, selectedValue }: SelectProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string | City | null>(null);

  const toggleDropdown = () => setOpen(!isOpen);
  const handleDropdownClick = async (value: string | City) => {
    setSelectedItem(value);
    if (onChange) {
      onChange(value, type);
    }
  };

  const getLabel = (option: string | City | null) => {
    if (option) {
      // For city type get the value from the second parameter of the array
      return type === 'CITY' ? option[1] : option;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>, option: string | City) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleDropdownClick(option);
      setOpen(false);
    }
  };
  useEffect(() => {
    // Persisted state initialize here
    if (selectedValue) {
      setSelectedItem(selectedValue);
    } else {
      setSelectedItem(null);
    }
  }, [selectedValue]);

  if (!options?.length) {
    // Disabled Selector
    return (
      <li>
        <label className="opacity-10 filter">
          {type}
          <div className="selector">
            <p className="selected_name">
              {placeholder}
              <span className="transform transition-transform duration-200 rotate-180">▲</span>
            </p>
          </div>
        </label>
      </li>
    );
  }

  return (
    <li aria-labelledby={`select-${type}`}>
      <label className="filter font-medium">
        {type}
        <div className="selector ">
          <button
            className="selected_name"
            onClick={toggleDropdown}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-labelledby={`select-${type}`}
            id={`select-${type}`}
          >
            {selectedItem !== null ? getLabel(selectedItem) : placeholder}
            <span className={`transform transition-transform duration-200 ${isOpen ? '' : 'rotate-180'}`}>▲</span>
          </button>
          {isOpen && (
            <ul className="options z-10" role="listbox">
              {options.map((option, index) => (
                <li
                  className={`p-2 ${option === selectedItem ? 'bg-blue-100' : 'hover:bg-gray-100'} cursor-pointer`}
                  key={`${option}-${index}`}
                  onClick={() => handleDropdownClick(option)}
                  onKeyDown={(event) => handleKeyDown(event, option)}
                  role="option"
                  aria-selected={option === selectedItem}
                  aria-labelledby={`select-${type}`}
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
