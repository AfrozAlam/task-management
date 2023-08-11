import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { addTask, editTask } from '../actions';

export default function Task() {
  const location = useLocation();
  const editItem = location.state;
  const today = dayjs(Date.now());
  const [title, setTitle] = useState(editItem?.title ? editItem.title : '');
  const [description, setDescription] = useState(editItem?.description ? editItem.description : '');
  const [completionStatus, setCompletionStatus] = useState(editItem?.completed ? editItem.completed : false);
  const [dueDate, setDueDate] = useState(editItem?.dueDate ? dayjs(editItem.dueDate) : null);

  const submitAddTask = () => {
    if(!dueDate) {
      alert('Please select Due Date !')
    } else {
      addTask({ title, description, completed: completionStatus, dueDate: new Date(dueDate) }).then((res) => {
        if(res.status === 200) {
          alert('Task created Successfully !');
          setTitle('');
          setDescription('');
          setCompletionStatus(false);
          setDueDate(null);
        }
      }).catch((err) => alert(`error occured : ${err.message}, Pls try again !`));
    }
  }
  const submitEditTask = () => {
    const updatedItem = { title, completed: completionStatus, dueDate: new Date(dueDate) };
    if(description) {
      updatedItem.description = description;
    }
    editTask(editItem._id, updatedItem).then((res) => {
      if(res.status === 200) {
        alert('Task updated Successfully !');
      }
    }).catch((err) => alert(`error occured : ${err.message}, Pls try again !`));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    editItem ? submitEditTask() : submitAddTask();
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="alert alert-secondary">
        {editItem ? 'Edit' : 'Add'} List Page
      </div>
      <form className="col-lg-4" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Title</label>
          <input type="text" className="form-control" id="exampleFormControlInput1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Please enter task title" required>
            </input>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Descriptions</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please enter task description"></textarea>
        </div>
        <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id="customCheck1"
            checked={completionStatus}
            onChange={(e) => setCompletionStatus(e.target.checked)}
          />
          <label className="custom-control-label" htmlFor="customCheck1">Completion Status</label>
        </div>
        <div className="form-group d-flex justify-content-end mt-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Select Due Date"
              minDate={today}
              value={dueDate}
              onChange={(date) => setDueDate(date.$d)}
            />
          </LocalizationProvider>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}