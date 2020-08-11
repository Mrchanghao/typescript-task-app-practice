import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import {
  UserEvent,
  deleteUserEvent,
  updateUserEvent,
} from '../../redux/user-events';
import { useDispatch } from 'react-redux';

interface Props {
  event: UserEvent;
}

const EventItem: React.FC<Props> = ({ event }) => {
  const dispatch = useDispatch();

  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState(event.title);
  const handleDeleteClick = () => {
    dispatch(deleteUserEvent(event.id));
  };

  const handleTitleClick = () => {
    setEditable(true);
    // dispatch edit title
    // dispatch(updateUserEvent(event));
  };
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editable) {
      inputRef.current?.focus();
    }
  }, [editable]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleBlur = () => {
    if (title !== event.title) {
      dispatch(
        updateUserEvent({
          ...event,
          title,
        })
      );
    }

    setEditable(false);
  };
  return (
    <div key={event.id} className="calendar-event">
      <div className="calendar-event-info">
        <div className="calendar-event-time">10:00 -12:00</div>
        <div className="calendar-event-title">
          {!editable ? (
            <span onClick={handleTitleClick}>{event.title}</span>
          ) : (
            <input
              ref={inputRef}
              type="text"
              value={title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
        </div>
      </div>
      <button
        className="calendar-event-delete-button"
        onClick={handleDeleteClick}
      >
        &times;
      </button>
    </div>
  );
};

export default EventItem;
