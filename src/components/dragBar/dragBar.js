/* import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time
import { useState } from "react";

export default function DragBar() {
  const [activeDrags, setActiveDrags] = useState(0);
  const [deltaPosition, setDeltaPosition] = useState({
    x: 0,
    y: 0,
  });
  const [controlledPosition, setControlledPosition] = useState({
    x: -400,
    y: 200,
  })  

  const handleDrag = (e, ui) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({
        x: x + ui.deltaX,
        y: y + ui.deltaY,
    });
  };

  const onStart = () => {
    setActiveDrags(activeDrags+1);
  };

  const onStop = () => {
    setActiveDrags(activeDrags-1);
  };

  const onDrop = (e) => {
    setActiveDrags(activeDrags-1);
    if (e.target.classList.contains("drop-target")) {
      alert("Dropped!");
      e.target.classList.remove("hovered");
    }
  };
  
  // For controlled component
  const adjustXPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = controlledPosition;
    setControlledPosition({ x: x - 10, y });
  };

  const adjustYPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = controlledPosition;
    setControlledPosition({ x, y: y - 10 });
  };

  const onControlledDrag = (e, position) => {
    const { x, y } = position;
    setControlledPosition({ x, y });
  };

  const onControlledDragStop = (e, position) => {
    this.onControlledDrag(e, position);
    this.onStop();
  };

  const dragHandlers = { onStart, onStop };
  return (
    <Draggable handle="strong" {...dragHandlers}>
      <div className="box no-cursor">
        <strong className="cursor">
          <div>Drag here</div>
        </strong>
        <div>You must click my handle to drag me</div>
      </div>
    </Draggable>
  );
}
 */