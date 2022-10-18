import React, { ReactElement } from 'react'

const Searchbar = (): ReactElement => {
  return (
    <div className='w-1/6 mx-auto px-3 py-1 flex border-2 border-primary rounded-full
    box-shadow-custom'>
      <img src="/images/search_icon.png" alt="" className='w w-4 m-auto'/>
      <input type="text" placeholder='search' maxLength={30}
      className='w-full mx-3 text-slate-200 outline-none bg-transparent'/>
    </div>
  )
}

export default Searchbar
