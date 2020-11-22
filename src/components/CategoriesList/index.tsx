import { useState, ChangeEvent, KeyboardEvent } from "react";
import { Card, List, Input } from "antd";
import { Category } from "@api/models/category";

export type Props = {
  onCategoryClick?: (category: Category) => void;
  categories: Category[];
};

export const CategoriesList: React.FC<Props> = ({
  onCategoryClick,
  categories,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  if (searchTerm) {
    categories = categories.filter(
      (category: Category) =>
        category.name.search(new RegExp(searchTerm, "i")) > -1
    );
  }

  return (
    <>
      <div
        css={`
          margin-bottom: 8px;
          width: 300px;
        `}
      >
        <Input.Search
          allowClear={true}
          placeholder="Search"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(event.target.value)
          }
          onSearch={(value: string) => setSearchTerm(value)}
        />
      </div>
      <List
        size="small"
        dataSource={categories}
        renderItem={(category: Category) => (
          <ListItem
            key={category.id}
            category={category}
            onClick={() => onCategoryClick && onCategoryClick(category)}
          />
        )}
      />
    </>
  );
};

type ListItemProps = {
  category: Category;
  onClick: () => void;
};

const ListItem: React.FC<ListItemProps> = ({ onClick, category }) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key.toLowerCase() === "enter") {
      onClick();
    }
  };

  return (
    <Card
      size="small"
      bodyStyle={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "8px 16px",
      }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      css={`
        :hover,
        :focus {
          border: 1px solid var(--color-primary);
          cursor: pointer;
          transition: 0.3s linear;
        }
      `}
    >
      <span>{category.name}</span>
    </Card>
  );
};
