import React from "react";
import { Card, List } from "antd";
import { Entity } from "@api/models/entity";

type Props = {
  onEntityClick: (entity: Entity) => void;
  entities: Entity[];
};

const EntitiesList: React.FC<Props> = ({ onEntityClick, entities }) => {
  return (
    <>
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
