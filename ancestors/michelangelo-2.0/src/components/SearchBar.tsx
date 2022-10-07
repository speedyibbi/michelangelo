import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBar = (): ReactElement => {
  const navigate = useNavigate()

  const handleFormSubmit = async (event: any): Promise<void> => {
    event.preventDefault()
    if (event.target.lastChild.value !== '') {
      navigate(`/search?item=${event.target.lastChild.value as string}`)
      event.target.lastChild.value = ''
    }
  }

  return (
    <form onSubmit={ (event) => { void handleFormSubmit(event) } } className='SearchBarForm'>
        <img src="/images/search_icon.png" alt="" className='SearchBarForm__icon' />
        <input type="text" className='SearchBarForm__input'
        maxLength={30} placeholder='search' />
    </form>
  )
}

export default SearchBar
