import React, { useEffect, useRef, useState } from 'react';
import './Recorder.css';
import { useDispatch, useSelector } from 'react-redux';
import {start, stop} from '../../redux/recorder';
import { RootState } from '../../redux/store';
import {selectDateStart} from '../../redux/recorder';
import cx from 'classnames';
import { addO } from '../../lib/utils';
import { createEvents } from '../../redux/user-events';

const Recorder = () => {
  const dispatch = useDispatch()
  const dateStart = useSelector(selectDateStart)
  const started = dateStart !== '';

  const [count, setCount ] = useState<number>(0)

  let interval = useRef<number>(0);
  
  const clickHandler = () => {
    if (started) {
      window.clearInterval(interval.current);
      dispatch(createEvents());
      dispatch(stop())
    } else {
      dispatch(start())
    interval.current = window.setInterval(() => {
      setCount(count => count + 1);
    }, 1000)
    }
    
  }

  useEffect(() => {
    return () => {
      window.clearInterval(interval.current)
    }
  }, [])

  let seconds = started ? Math.floor(Date.now() - new Date(dateStart).getTime()) / 1000 : 0;

  let hours = seconds ? Math.floor(seconds / 60 / 60) : 0;
  seconds -= hours * 60 * 60;
  let minutes = seconds ? Math.floor(seconds / 60) : 0;
  seconds -= minutes * 60;

  return (
    <div className={cx('recorder', {'recorder-started': started})}>
    <button onClick={clickHandler} className='recorder-record'><span></span></button>
    <div className='recorder-counter'>{addO(hours)}:{addO(minutes)}:{addO(seconds)}</div>
  </div>
  )
};

export default Recorder;