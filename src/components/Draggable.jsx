import { useEffect, useRef, useState } from "react";


export const Draggable = ({ children, initialPos, fixOnAxis }) => {
  const ref = useRef();
  const [state, setState] = useState({
    pos: initialPos,
    dragging: false,
    rel: {} // position relative to the cursor
  });

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [state.dragging, state.attached]);

  // calculate relative position to the mouse and set dragging=true
  const onMouseDown = (e) => {
    // only left mouse button
    if (e.button !== 0) return;
    var pos = ref.current.getBoundingClientRect();
    const rel = {
      x: e.pageX - pos.left,
      y: e.pageY - pos.top
    };
    if (fixOnAxis === "y") {
      rel.x = initialPos.x;
    }
    if (fixOnAxis === "x") {
      rel.y = initialPos.y;
    }
    setState((p) => ({ ...p, dragging: true, rel }));
    e.stopPropagation();
    e.preventDefault();
  };
  const onMouseUp = (e) => {
    setState((p) => ({ ...p, dragging: false }));
    e.stopPropagation();
    e.preventDefault();
  };
  const onMouseMove = (e) => {
    if (!state.dragging) return;
    const pos = {
      x: e.pageX - state.rel.x,
      y: e.pageY - state.rel.y
    };
    if (fixOnAxis === "y") {
      pos.x = initialPos.x;
    }
    if (fixOnAxis === "x") {
      pos.y = initialPos.y;
    }
    setState((p) => ({ ...p, pos }));
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      style={{
        position: "absolute",
        left: state.pos.x,
        top: state.pos.y
      }}
    >
      {children}
    </div>
  );
};
