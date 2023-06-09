import React, { useState, useContext } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";

import TasksContext from "./context/TasksContext";

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  margin: 0 20px;
`;


const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const DragList = () => {

  const { columnsData } = useContext(TasksContext);

  const [columns, setColumns] = useState(columnsData);


  return (
    <ListGrid>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className="list-grid" key={columnId}>
              <div className="column-container">
                <div className="column-header">
                  <div>{column.name}{" "}<span className="count">{column.items.length}</span></div>
                  <span>...</span>
                </div>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          padding: 0,
                          width: 280,
                          minHeight: 500,
                        }}
                      >
                        {column.items
                          .sort((a, b) => b.priority - a.priority)
                          .map((item, index) => {
                            return (
                              <ListItem
                                item={item}
                                index={index}
                                key={item.id}
                              />
                            );
                          })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </ListGrid>
  );
}

export default DragList;
