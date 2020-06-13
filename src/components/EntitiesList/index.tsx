import React, { useState } from "react";
import { Card, List, Input } from "antd";
import { Entity } from "@api/models/entity";

type Props = {
  onEntityClick: (entity: Entity) => void;
  entities: Entity[];
};

const EntitiesList: React.FC<Props> = ({ onEntityClick, entities }) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (searchTerm) {
    entities = entities.filter((entity: Entity) =>
      entity.name.includes(searchTerm)
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
            onClick={() => onEntityClick(entity)}
          />
        )}
      />
    </>
  );
};

export default EntitiesList;

type ListItemProps = {
  entity: Entity;
  onClick: () => void;
};

const ListItem: React.FC<ListItemProps> = ({ onClick, entity }) => {
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
      css={`
        :hover {
          border: 1px solid #40a9ff;
          cursor: pointer;
          transition: 0.3s linear;
        }
      `}
    >
      <span>{entity.name}</span>
    </Card>
  );
};
