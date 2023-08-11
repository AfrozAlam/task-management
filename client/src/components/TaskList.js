import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTasks } from '../actions';
import Spinner from './layout/Spinner';
import { MarkIcon } from './layout/MarkIcon';
import { CrossIcon } from './layout/CrossIcon';
import { dateObjectToString } from '../helpers';

const Item = ({item}) => {
  const {title, dueDate, completed} = item;
  return (
    <div className="card">
      <h5 className="card-header">{title}</h5>
      <div className="card-body">
        <div className="card-title">Completion Status : {completed ? <MarkIcon /> : <CrossIcon />}</div>
        <p className="card-text">Due Date : {dateObjectToString(dueDate)}</p>
        <Link to={`/task/${item._id}`} className="btn btn-info">See Task Details</Link>
      </div>
    </div>
  )
}

export default function TaskList() {
  const [items, setItems] = useState();
  const [loading, setLoading] = useState();
  useEffect(() => {
    setLoading(true);
    getTasks().then((res) => {
      setItems(res.data);
      setLoading(false);
    }).catch((e) => console.log(e));
  },[]);

  if(loading) return <Spinner />

  return (
    <div className="taskList">
      <div className="alert alert-secondary">
        Task Lists Page
      </div>
      <Link className="btn btn-success" to="/task">Add List</Link>
      {items?.map((item, index) => <Item key={index} item={item} />)}
    </div>
  );
}