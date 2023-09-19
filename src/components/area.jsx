import { React, useContext, useState } from "react";
import { Button, Popover, Input, Toast } from "@douyinfe/semi-ui";
import {
  IconEdit,
  IconCheckboxTick,
  IconDeleteStroked,
} from "@douyinfe/semi-icons";
import {
  Tab,
  Action,
  ObjectType,
  tableThemes,
  defaultTableTheme,
} from "../data/data";
import {
  AreaContext,
  LayoutContext,
  TabContext,
  UndoRedoContext,
} from "../pages/editor";

export default function Area(props) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editField, setEditField] = useState({});
  const { layout } = useContext(LayoutContext);
  const { tab, setTab } = useContext(TabContext);
  const { updateArea, deleteArea } = useContext(AreaContext);
  const { setUndoStack, setRedoStack } = useContext(UndoRedoContext);

  const handleMouseDown = (e, dir) => {
    props.setResize({ id: props.areaData.id, dir: dir });
    props.setInitCoords({
      x: props.areaData.x,
      y: props.areaData.y,
      width: props.areaData.width,
      height: props.areaData.height,
      mouseX: e.clientX / props.zoom,
      mouseY: e.clientY / props.zoom,
    });
  };

  return (
    <g
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setVisible(false);
        setSaved(false);
      }}
    >
      <foreignObject
        key={props.areaData.id}
        x={props.areaData.x}
        y={props.areaData.y}
        width={props.areaData.width > 0 ? props.areaData.width : 0}
        height={props.areaData.height > 0 ? props.areaData.height : 0}
        onMouseDown={props.onMouseDown}
      >
        <div
          className={`${
            hovered
              ? "border-4 border-dashed border-[#5891db]"
              : "border-2 border-slate-400"
          } w-full h-full cursor-move rounded relative`}
        >
          <div
            className="opacity-40 w-fill p-2 h-full"
            style={{ backgroundColor: props.areaData.color }}
          />
        </div>
        <div className="text-gray-900 absolute top-2 left-3 select-none">
          {props.areaData.name}
        </div>
        {hovered && (
          <div className="absolute top-2 right-3">
            <Popover
              visible={visible}
              content={
                <div>
                  <div className="font-semibold mb-2 ms-1">
                    Edit subject area
                  </div>
                  <div className="w-[280px] flex items-center mb-2">
                    <Input
                      value={props.areaData.name}
                      placeholder="Name"
                      className="me-2"
                      onChange={(value) =>
                        updateArea(props.areaData.id, { name: value })
                      }
                      onFocus={(e) => setEditField({ name: e.target.value })}
                      onBlur={(e) => {
                        setSaved(true);
                        if (e.target.value === editField.name) return;
                        setUndoStack((prev) => [
                          ...prev,
                          {
                            action: Action.EDIT,
                            element: ObjectType.AREA,
                            aid: props.areaData.id,
                            undo: editField,
                            redo: { name: e.target.value },
                          },
                        ]);
                        setRedoStack([]);
                      }}
                    />
                    <Popover
                      content={
                        <div>
                          <div className="flex justify-between items-center p-2">
                            <div className="font-medium">Theme</div>
                            <Button
                              type="tertiary"
                              size="small"
                              onClick={() =>
                                updateArea(props.areaData.id, {
                                  color: defaultTableTheme,
                                })
                              }
                            >
                              Clear
                            </Button>
                          </div>
                          <hr />
                          <div className="py-3">
                            <div>
                              {tableThemes
                                .slice(0, Math.ceil(tableThemes.length / 2))
                                .map((c) => (
                                  <button
                                    key={c}
                                    style={{ backgroundColor: c }}
                                    className="p-3 rounded-full mx-1"
                                    onClick={() => {
                                      setUndoStack((prev) => [
                                        ...prev,
                                        {
                                          action: Action.EDIT,
                                          element: ObjectType.AREA,
                                          aid: props.areaData.id,
                                          undo: { color: props.areaData.color },
                                          redo: { color: c },
                                        },
                                      ]);
                                      setRedoStack([]);
                                      updateArea(props.areaData.id, {
                                        color: c,
                                      });
                                    }}
                                  >
                                    {props.areaData.color === c ? (
                                      <IconCheckboxTick
                                        style={{ color: "white" }}
                                      />
                                    ) : (
                                      <IconCheckboxTick style={{ color: c }} />
                                    )}
                                  </button>
                                ))}
                            </div>
                            <div className="mt-3">
                              {tableThemes
                                .slice(Math.ceil(tableThemes.length / 2))
                                .map((c) => (
                                  <button
                                    key={c}
                                    style={{ backgroundColor: c }}
                                    className="p-3 rounded-full mx-1"
                                    onClick={() => {
                                      setUndoStack((prev) => [
                                        ...prev,
                                        {
                                          action: Action.EDIT,
                                          element: ObjectType.AREA,
                                          aid: props.areaData.id,
                                          undo: { color: props.areaData.color },
                                          redo: { color: c },
                                        },
                                      ]);
                                      setRedoStack([]);
                                      updateArea(props.areaData.id, {
                                        color: c,
                                      });
                                    }}
                                  >
                                    <IconCheckboxTick
                                      style={{
                                        color:
                                          props.areaData.color === c
                                            ? "white"
                                            : c,
                                      }}
                                    />
                                  </button>
                                ))}
                            </div>
                          </div>
                        </div>
                      }
                      trigger="click"
                      position="rightTop"
                      showArrow
                    >
                      <div
                        className="h-[32px] w-[32px] rounded"
                        style={{ backgroundColor: props.areaData.color }}
                      />
                    </Popover>
                  </div>
                  <div className="flex">
                    <Button
                      icon={<IconDeleteStroked />}
                      type="danger"
                      block
                      onClick={() => {
                        Toast.success(`Area deleted!`);
                        deleteArea(props.areaData.id, true);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      block
                      style={{ marginLeft: "8px" }}
                      onClick={() => {
                        if (!saved) {
                          if (props.areaData.name === editField.name) return;
                          setUndoStack((prev) => [
                            ...prev,
                            {
                              action: Action.EDIT,
                              element: ObjectType.AREA,
                              aid: props.areaData.id,
                              undo: editField,
                              redo: { name: props.areaData.name },
                            },
                          ]);
                          setRedoStack([]);
                          setSaved(false);
                        }
                      }}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              }
              trigger="custom"
              position="rightTop"
              showArrow
            >
              <Button
                icon={<IconEdit />}
                size="small"
                theme="solid"
                style={{
                  backgroundColor: "#2f68ad",
                  opacity: "0.7",
                }}
                onClick={() => {
                  if (layout.sidebar) {
                    setTab(Tab.subject_areas);
                    if (tab !== Tab.subject_areas) return;
                    document
                      .getElementById(`scroll_area_${props.areaData.id}`)
                      .scrollIntoView({ behavior: "smooth" });
                  } else {
                    setVisible(true);
                  }
                }}
              ></Button>
            </Popover>
          </div>
        )}
      </foreignObject>
      {hovered && (
        <>
          <circle
            cx={props.areaData.x}
            cy={props.areaData.y}
            r={6}
            fill="white"
            stroke="#5891db"
            strokeWidth={3}
            cursor="nwse-resize"
            onMouseDown={(e) => handleMouseDown(e, "tl")}
          />
          <circle
            cx={props.areaData.x + props.areaData.width}
            cy={props.areaData.y}
            r={6}
            fill="white"
            stroke="#5891db"
            strokeWidth={3}
            cursor="nesw-resize"
            onMouseDown={(e) => handleMouseDown(e, "tr")}
          />
          <circle
            cx={props.areaData.x}
            cy={props.areaData.y + props.areaData.height}
            r={6}
            fill="white"
            stroke="#5891db"
            strokeWidth={3}
            cursor="nesw-resize"
            onMouseDown={(e) => handleMouseDown(e, "bl")}
          />
          <circle
            cx={props.areaData.x + props.areaData.width}
            cy={props.areaData.y + props.areaData.height}
            r={6}
            fill="white"
            stroke="#5891db"
            strokeWidth={3}
            cursor="nwse-resize"
            onMouseDown={(e) => handleMouseDown(e, "br")}
          />
        </>
      )}
    </g>
  );
}
