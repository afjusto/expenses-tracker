import React, { useState, useEffect } from "react";
import { Button, Drawer, Empty } from "antd";
import { EntityForm } from "@/components/EntityForm";
import { EntitiesList } from "@/components/EntitiesList";
import { MainContainer } from "@/components/MainContainer";
import { Entity } from "@api/models/entity";
import { getEntities } from "@/utils/entities-client";

export const Entities: React.FC = () => {
  const [entities, setEntities] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

  /**
   * Closes the drawer.
   */
  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedEntity(null);
  };

  /**
   * Gets the list of entities.
   */
  const fetchEntities = () => {
    getEntities().then(({ entities }) => setEntities(entities));
  };

  /**
   * Callback to be executed on the form is submitted.
   */
  const handleOnSubmit = () => {
    closeDrawer();
    fetchEntities();
  };

  /**
   * Callback to be executed when an entity is deleted.
   */
  const handleOnDelete = () => {
    closeDrawer();
    fetchEntities();
  };

  /**
   * Callback to be executed when a transaction list item is clicked.
   *
   * @param transaction the selected transaction
   */
  const handleOnEntityClick = (entity: Entity) => {
    setSelectedEntity(entity);
    setDrawerVisible(true);
  };

  const headerActions = (
    <div>
      <Button type="primary" onClick={() => setDrawerVisible(true)}>
        Add entity
      </Button>
    </div>
  );

  useEffect(() => fetchEntities(), []);

  return (
    <MainContainer title="Entities" actions={headerActions}>
      {entities.length === 0 && (
        <Empty description={<span>No entities yet.</span>}>
          <Button type="primary" onClick={() => setDrawerVisible(true)}>
            Create Now
          </Button>
        </Empty>
      )}
      {entities.length > 0 && (
        <EntitiesList entities={entities} onEntityClick={handleOnEntityClick} />
      )}
      <Drawer
        closable={true}
        visible={drawerVisible}
        width="600"
        onClose={closeDrawer}
        bodyStyle={{ padding: 0 }}
      >
        {drawerVisible && (
          <EntityForm
            onCancel={closeDrawer}
            onDelete={handleOnDelete}
            onSubmit={handleOnSubmit}
            entity={selectedEntity}
          />
        )}
      </Drawer>
    </MainContainer>
  );
};
