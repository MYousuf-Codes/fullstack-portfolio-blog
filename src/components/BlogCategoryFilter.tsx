import React, { useState } from "react";
import { motion } from "framer-motion";

interface BlogCategoryFilterProps {
  categories: string[];
  onCategoryChange: (category: string) => void;
  initialCategory?: string;
}

export default function BlogCategoryFilter({
  categories,
  onCategoryChange,
  initialCategory = "All"
}: BlogCategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category: string) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleCategoryClick(category)}
          className={`px-4 py-2 rounded-lg transition-all ${
            selectedCategory === category
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
              : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
          }`}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
} 