import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DeleteIcon } from "./layout/DeleteIcon";
import { EditIcon } from "./layout/EditIcon";
import { MarkIcon } from './layout/MarkIcon';
import { CrossIcon } from './layout/CrossIcon';
import { editTask, getTask, deleteTask } from '../actions';
import Spinner from './layout/Spinner';
import { dateObjectToString } from '../helpers';

function TaskDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getTask(params?.id).then((res) => {
      setItem(res.data);
      setLoading(false);
    }).catch((e) => console.log(e));
  },[]);

  const handleCompletion = () => {
    setLoading(true);
    editTask(params?.id, {completed: true}).then((res) => {
      setItem(res.data);
      setLoading(false);
    }).catch((e) => console.log(e));
  }
  const handleEdit = () => {
    navigate('/task', { state: item })
  }
  const handleDelete = () => {
    setLoading(true);
    deleteTask(params?.id).then((res) => {
      if(res.status === 202) {
        setLoading(false);
        alert('Task deleted Successfully !');
      }
      navigate('/');
    }).catch((e) => console.log(e));
  }

  if(loading) return <Spinner />

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="alert alert-secondary">
        Task Details Page
      </div>
      <div className="card border-dark mb-3" style={{maxWidth:'50rem'}}>
        <div className="card-header d-flex justify-content-between">
          <div className="form-check">
            <input className={`form-check-input ${!item?.completed && ' cursorPointer'}`}
              type="checkbox" id="flexCheckDefault"
              disabled={item?.completed}
              checked={item?.completed}
              onChange={handleCompletion}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Mark Completion
            </label>
          </div>
          <div>
            <span className="cursorPointer" onClick={handleEdit}><EditIcon /></span>
            <span className="cursorPointer" onClick={handleDelete}><DeleteIcon /></span>
          </div>
        </div>
        <div className="card-body text-dark">
          <h5 className="card-title">{item?.title}</h5>
          <p className="card-text">{item?.description}</p>
          <div className="card-text">Completion Status : {item?.completed ? <MarkIcon /> : <CrossIcon />}</div>
          <p className="card-text">Due Date : {dateObjectToString(item?.dueDate)}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;