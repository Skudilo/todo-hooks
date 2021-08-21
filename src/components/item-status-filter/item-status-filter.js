 import React, {useState} from 'react';

import './item-status-filter.css';

const ItemStatusFilter = ({filter, onFilterChange}) => {

  const buttons = [
    {name: 'all', label: 'All'},
    {name: 'active', label: 'Active'},
    {name: 'done', label: 'done'}
  ]

  const btns = buttons.map(({name, label}) => {
    const active = filter === name
    const clazz = `btn ${ active ?  'btn-info' : 'btn-outline-secondary'}`

    return <button
              key={name}
              type="button"
              className={clazz}
              onClick={() => onFilterChange(name)}
            >{label}</button>
  })

  return (
    <div className="btn-group">
      {btns}
      {/*<button type="button"*/}
      {/*        className="btn btn-info">All</button>*/}
      {/*<button type="button"*/}
      {/*        className="btn btn-outline-secondary">Active</button>*/}
      {/*<button type="button"*/}
      {/*        className="btn btn-outline-secondary">Done</button>*/}
    </div>
  );
};

export default ItemStatusFilter;
