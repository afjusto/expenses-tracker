import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Card, List, Input } from "antd";
import { Entity } from "@api/models/entity";

export type Props = {
  onEntityClick?: (entity: Entity) => void;
  entities: Entity[];
};

export const EntitiesList: React.FC<Props> = ({ onEntityClick, entities }) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (searchTerm) {
    entities = entities.filter(
      (entity: Entity) => entity.name.search(new RegExp(searchTerm, "i")) > -1
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
        dataSource={entities}
        renderItem={(entity: Entity) => (
          <ListItem
            key={entity.id}
            entity={entity}
            onClick={() => onEntityClick && onEntityClick(entity)}
          />
        )}
      />
    </>
  );
};

type ListItemProps = {
  entity: Entity;
  onClick: () => void;
};

const ListItem: React.FC<ListItemProps> = ({ onClick, entity }) => {
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
      <span>{entity.name}</span>
    </Card>
  );
};
