"use client"
import {
  CustomCheckbox,
  CustomColorSelector,
  CustomFeatureList,
  CustomImageUpload,
  CustomInput,
  CustomSection,
  CustomSelect,
  CustomTextarea,

} from "@/Components/Input/Input";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { FiPlus, FiTrash2, FiUpload, FiInfo } from "react-icons/fi";

interface ProductFormData {
  name: string;
  brand: string;
  category: string;
  description: string;
  price: string;
  discount: string;
  discountedPrice: string;
  rating: string;
  reviewCount: string;
  isNew: boolean;
  isFeatured: boolean;
  images: string[];
  colors: string[];
  stock: string;
  features: string[];
  sizes: string[];
  weight: string;
  dimensions: string;
  sku: string;
}

const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "home", label: "Home & Garden" },
  { value: "beauty", label: "Beauty" },
  { value: "sports", label: "Sports & Outdoors" },
];

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    discount: "",
    discountedPrice: "",
    rating: "",
    reviewCount: "",
    isNew: false,
    isFeatured: false,
    images: [],
    colors: [],
    stock: "",
    features: [""],
    sizes: [],
    weight: "",
    dimensions: "",
    sku: "",
  });

  const [activeSection, setActiveSection] = useState("basic");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name, value } = target;

    const finalValue = target instanceof HTMLInputElement && target.type === "checkbox"
      ? (target as HTMLInputElement).checked
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    // Auto-calculate discounted price if price or discount changes
    if (name === "price" || name === "discount") {
      const price = name === "price" ? parseFloat(value) : parseFloat(formData.price);
      const discount = name === "discount" ? parseFloat(value) : parseFloat(formData.discount);

      if (!isNaN(price) && !isNaN(discount) && discount > 0) {
        const discountedPrice = price - (price * discount / 100);
        setFormData(prev => ({
          ...prev,
          discountedPrice: discountedPrice.toFixed(2)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          discountedPrice: ""
        }));
      }
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files).map((file) => URL.createObjectURL(file)) : [];
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 8), // Limit to 8 images
    }));
  };

  const removeImage = (index: number) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData((prev) => ({ ...prev, images: updatedImages }));
  };

  const handleColorChange = (index: number, value: string) => {
    const updatedColors = [...formData.colors];
    updatedColors[index] = value;
    setFormData((prev) => ({ ...prev, colors: updatedColors }));
  };

  const addColor = () => {
    setFormData((prev) => ({ ...prev, colors: [...prev.colors, "#000000"] }));
  };

  const removeColor = (index: number) => {
    const updatedColors = [...formData.colors];
    updatedColors.splice(index, 1);
    setFormData((prev) => ({ ...prev, colors: updatedColors }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...formData.features];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, features: updated }));
  };

  const addFeature = () => {
    setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };

  const removeFeature = (index: number) => {
    const updated = [...formData.features];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, features: updated }));
  };

  const handleSizeChange = (index: number, value: string) => {
    const updated = [...formData.sizes];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, sizes: updated }));
  };

  const addSize = () => {
    setFormData((prev) => ({ ...prev, sizes: [...prev.sizes, ""] }));
  };

  const removeSize = (index: number) => {
    const updated = [...formData.sizes];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, sizes: updated }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    // Here you would typically send the data to your API
    alert("Product submitted successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Product</h1>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto mb-8 border-b border-gray-200">
        {["basic", "pricing", "media", "inventory", "attributes"].map((section) => (
          <button
            key={section}
            className={`px-4 py-2 font-medium text-sm capitalize ${activeSection === section ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveSection(section)}
          >
            {section}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Section */}
        <CustomSection title="Basic Information" isActive={activeSection === "basic"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomInput
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}

              placeholder="e.g., Wireless Headphones"
            />
            <CustomInput
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="e.g., Sony"
            />
            <CustomSelect
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={categories}

            />
            <CustomInput
              label="SKU"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              placeholder="e.g., PROD-12345"
            />
          </div>

          <CustomTextarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter detailed product description..."
          />

          <div className="flex flex-wrap gap-6">
            <CustomCheckbox
              label="New Arrival"
              name="isNew"
              checked={formData.isNew}
              onChange={handleChange}
            />
            <CustomCheckbox
              label="Featured Product"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
            />
          </div>
        </CustomSection>

        {/* Pricing Section */}
        <CustomSection title="Pricing" isActive={activeSection === "pricing"}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CustomInput
              label="Base Price ($)"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}

            />
            <CustomInput
              label="Discount (%)"
              name="discount"
              type="number"
              value={formData.discount}
              onChange={handleChange}

            />
            <CustomInput
              label="Discounted Price ($)"
              name="discountedPrice"
              type="number"
              value={formData.discountedPrice}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <CustomInput
              label="Rating (0-5)"
              name="rating"
              type="number"
              value={formData.rating}
              onChange={handleChange}

            />
            <CustomInput
              label="Review Count"
              name="reviewCount"
              type="number"
              value={formData.reviewCount}
              onChange={handleChange}

            />
          </div>
        </CustomSection>

        {/* Media Section */}
        <CustomSection title="Media" isActive={activeSection === "media"}>
          <div className="space-y-6">
            <CustomImageUpload
              onChange={handleImageUpload}
              images={formData.images}


            />

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Product Colors</h3>
              <CustomColorSelector
                colors={formData.colors}
                onAdd={addColor}
                onRemove={removeColor}
                onChange={handleColorChange}
              />
            </div>
          </div>
        </CustomSection>

        {/* Inventory Section */}
        <CustomSection title="Inventory" isActive={activeSection === "inventory"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomInput
              label="Stock Quantity"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}


            />
            <CustomInput
              label="Weight (kg)"
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleChange}

            />
            <CustomInput
              label="Dimensions (L x W x H)"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              placeholder="e.g., 10x5x2"
            />
          </div>
        </CustomSection>

        {/* Attributes Section */}
        <CustomSection title="Attributes" isActive={activeSection === "attributes"}>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Available Sizes</h3>
              {formData?.sizes.map((size, index) => (
                <div key={index} className="flex items-center gap-3 mb-2">
                  {/* <CustomInput
                    value={size}
                    onChange={(e) => handleSizeChange(index, e.target.value)}
                    placeholder="e.g., S, M, L or 10, 12, 14"
                  /> */}
                  <button
                    type="button"
                    onClick={() => removeSize(index)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSize}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mt-2"
              >
                <FiPlus /> Add Size
              </button>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Product Features</h3>
              <CustomFeatureList
                features={formData.features}
                onAdd={addFeature}
                onRemove={removeFeature}
                onChange={handleFeatureChange}
              />
            </div>
          </div>
        </CustomSection>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;