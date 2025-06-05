"use client"
import React from "react";
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface CustomInputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}

interface CustomTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}
interface CustomCheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
interface CustomImageUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  images: string[];
}
interface CustomFeatureListProps {
  features: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, value: string) => void;
}


export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}) => (
  <div className="w-full">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
    />
  </div>
);


export const CustomTextarea: React.FC<CustomTextareaProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
}) => (
  <div className="w-full">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black h-24"
    />
  </div>
);

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  name,
  checked,
  onChange,
}) => (
  <label className="flex items-center gap-2 cursor-pointer">
    <input type="checkbox" name={name} checked={checked} onChange={onChange} />
    <span className="text-sm">{label}</span>
  </label>
);


// ====================================================


export const CustomImageUpload: React.FC<CustomImageUploadProps> = ({
  onChange,
  images,
}) => (
  <div>
    <label className="block text-sm font-medium mb-1">Upload Images</label>
    <input type="file" accept="image/*" multiple onChange={onChange} />
    <div className="flex gap-3 mt-2">
      {images.map((img, idx) => (
        <img key={idx} src={img} alt="preview" className="w-20 h-20 object-cover rounded" />
      ))}
    </div>
  </div>
);

// ====================================================

interface CustomColorSelectorProps {
  colors: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, value: string) => void;
}

export const CustomColorSelector: React.FC<CustomColorSelectorProps> = ({
  colors,
  onAdd,
  onRemove,
  onChange,
}) => (
  <div>
    <label className="block text-sm font-medium mb-1">Colors</label>
    <div className="space-y-2">
      {colors.map((color, index) => (
        <div key={index} className="flex gap-2 items-center">
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={color}
            onChange={(e) => onChange(index, e.target.value)}
            placeholder="Color"
          />
          <button type="button" onClick={() => onRemove(index)} className="text-red-600 font-semibold">X</button>
        </div>
      ))}
      <button type="button" onClick={onAdd} className="text-blue-600 font-semibold">+ Add Color</button>
    </div>
  </div>
);

// =======================================================


export const CustomFeatureList: React.FC<CustomFeatureListProps> = ({
  features,
  onAdd,
  onRemove,
  onChange,
}) => (
  <div>
    <label className="block text-sm font-medium mb-1">Features</label>
    <div className="space-y-2">
      {features.map((feature, index) => (
        <div key={index} className="flex gap-2 items-center">
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={feature}
            onChange={(e) => onChange(index, e.target.value)}
            placeholder="Feature"
          />
          <button type="button" onClick={() => onRemove(index)} className="text-red-600 font-semibold">X</button>
        </div>
      ))}
      <button type="button" onClick={onAdd} className="text-blue-600 font-semibold">+ Add Feature</button>
    </div>
  </div>
);



// ================================

interface CustomSectionProps {
  title: string;
  children: React.ReactNode;
  isActive?: boolean;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

export const CustomSection: React.FC<CustomSectionProps> = ({
  title,
  children,
  isActive = true,
  collapsible = false,
  defaultOpen = true,
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  if (!isActive) return null;

  return (
    <section className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
      <div 
        className={`flex justify-between items-center cursor-pointer ${collapsible ? 'mb-4' : 'mb-6'}`}
        onClick={() => collapsible && setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-semibold text-gray-800">
          {title}
        </h2>
        {collapsible && (
          <span className="text-gray-500">
            {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
          </span>
        )}
      </div>
      
      <div className={`space-y-4 ${collapsible && !isOpen ? 'hidden' : 'block'}`}>
        {children}
      </div>
    </section>
  );
};


// ========================

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  required?: boolean;
  disabled?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
}) => (
  <div className="w-full">
    <label className="block text-sm font-medium mb-1">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black bg-white"
    >
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);