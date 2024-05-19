import { Button, ButtonGroup } from "react-bootstrap";
interface Category {
  id: number;
  name: string;
}

interface CategoryBarProps {
  categories: Category[];
  selectedCategory: number;
  setSelectedCategory: (category: number) => void;
}


export const CategoryBar: React.FC<CategoryBarProps> = ({ categories,selectedCategory,setSelectedCategory }) => {
  const handleCategoryClick = (id: number) => {
    setSelectedCategory(id);
  }; 
  return (
    <div className="d-flex justify-content-center">
      <ButtonGroup>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={category.id === selectedCategory ? "primary" : "secondary"}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}