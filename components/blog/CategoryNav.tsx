interface CategoryNavProps {
  categories: {
    id: string;
    name: string;
  }[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryNav({ categories, selectedCategory, onCategoryChange }: CategoryNavProps) {
  return (
    <nav className="bg-[#1c1c1e] border-y border-[#FF4B6B]/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center overflow-x-auto py-4 scrollbar-hide">
          <div className="flex space-x-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] text-white'
                    : 'text-[#e2e8f0] hover:text-white hover:bg-[#2a2a2e]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 