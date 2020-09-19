import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { Entity } from "@api/models/entity";
import { getEntities } from "@/utils/entities-client";

export type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

export const EntitiesSelect: React.FC<Props> = ({ value, onChange }) => {
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    let mounted = true;

    getEntities().then(({ entities }) => {
      if (mounted) {
        setEntities(entities);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Select placeholder="Select an entity" value={value} onChange={onChange}>
      {entities.map((entity: Entity) => (
        <Select.Option key={entity.id} value={entity.id!}>
          {entity.name}
        </Select.Option>
      ))}
    </Select>
  );
};
