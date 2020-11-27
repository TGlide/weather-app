import React, { useState } from "react";
import { Location } from "../../../entities/Location";
import { useStoreActions } from "../../../store";
import { ReactComponent as Trash } from "../../../assets/icons/trash.svg";
import { ReactComponent as Edit } from "../../../assets/icons/edit.svg";
import "./styles.scss";

interface NoteProps {
  index: number;
  location: Location;
  note: string;
}

const Note: React.FC<NoteProps> = ({ index, location, note }) => {
  const deleteNote = useStoreActions((actions) => actions.notes.delete);
  const editNote = useStoreActions((actions) => actions.notes.edit);
  const [editing, setEditing] = useState(false);

  const [editInput, setEditInput] = useState(note);

  const handleFinishEdit = () => {
    editNote({ location: location, index: index, newNote: editInput });
    setEditing(false);
  };

  return (
    <div className={`note`}>
      <div className="content">
        <span>{note}</span>
        <button className="edit" onClick={() => setEditing(!editing)}>
          <Edit />
        </button>
        <button
          className={`delete`}
          onClick={() => {
            deleteNote({
              location: location,
              index: index,
            });
          }}
        >
          <Trash />
        </button>
      </div>
      {editing && (
        <div className="edit-area">
          <span>Editing:</span>
          <textarea
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
          />
          <div className="buttons">
            <button className={`edit`} onClick={handleFinishEdit}>
              Edit
            </button>
            <button className={`cancel`} onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
