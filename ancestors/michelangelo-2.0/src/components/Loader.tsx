import React, { ReactElement } from 'react'

const Loader = (props: { bar: boolean }): ReactElement => {
  if (props.bar) {
    return (
        <div className='LoadBar'>
            <h4 className='LoadBar__text'>
                <p className='LoadBar__text__cover'>Loading . . .</p>
            </h4>
            <div className='LoadBar__bar'>
                <div className="LoadBar__bar__progress"></div>
            </div>
        </div>
    )
  } else {
    return (
        <div className="Loader"></div>
    )
  }
}

export default Loader
