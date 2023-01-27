import React, { ReactElement, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCcVisa, faCcMastercard } from '@fortawesome/free-brands-svg-icons'
import { faUpload, faCheck } from '@fortawesome/free-solid-svg-icons'
import { ViewContext } from '../Views'

interface Inputs {
  title: string
  description: string
  game: any
  image: any
}

const GameForm = (): ReactElement => {
  const navigate = useNavigate()
  const { user, setFlash } = useContext(ViewContext)
  const { register, handleSubmit, formState: { dirtyFields, errors } } =
  useForm<Inputs>({ defaultValues: { title: '', description: '', game: null, image: null } })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('game', data.game[0])
    formData.append('image', data.image[0])
    await upload(formData)
  }

  const upload = async (data: FormData): Promise<void> => {
    const response = await fetch('/games/', {
      method: 'POST',
      body: data
    }).then(async (res) => await res.json())

    if (response.successful === true) {
      setFlash({ type: 'success', text: response.message })
      navigate('/')
    } else setFlash({ type: 'error', text: response.message })
  }

  useEffect(() => {
    if (user.email === undefined && user.username === undefined) navigate('/')
  }, [user])

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}
    className='w-9/12 h-full m-auto grid grid-rows-1 grid-cols-2 justify-items-center items-center'>
      <div className='w-5/6 mx-2 p-auto col-start-1 col-end-2'>
        <input type='text' placeholder='Game Title'
        {...register('title', { required: true })}
        className={`w-full m-6 p-3 pl-5 font-caviar text-white text-sm border-2
        rounded-md outline-none box-shadow-custom transition-all bg-stone-800
        ${((errors.title?.message) != null) ? 'border-special' : 'border-primary'}`} />
        <textarea rows={4} placeholder='Description'
        {...register('description', { required: true })}
        className={`w-full m-6 p-3 pl-5 font-caviar text-white text-sm border-2
        rounded-md outline-none box-shadow-custom transition-all bg-stone-800 resize-none
        ${((errors.description?.message) != null) ? 'border-special' : 'border-primary'}`} />
        <div className='w-full m-6 flex justify-around items-center'>
          <label htmlFor='game'
          className={`w-5/12 py-1 relative flex justify-center items-center
          font-squids text-white text-sm border-2 rounded-md box-shadow-custom transition-all
          bg-stone-800 hover:text-stone-800 hover:scale-110 hover:cursor-pointer
          ${((errors.game?.message) != null)
          ? 'border-special hover:bg-special'
          : 'border-primary hover:bg-primary'}`}>
            <FontAwesomeIcon icon={dirtyFields.game === true ? faCheck : faUpload}
            className='m-2 text-xl' />Upload Game</label>
          <label htmlFor='image'
          className={`w-5/12 py-1 relative flex justify-center items-center
          font-squids text-white text-sm border-2 rounded-md box-shadow-custom transition-all
          bg-stone-800 hover:text-stone-800 hover:scale-110 hover:cursor-pointer
          ${((errors.image?.message) != null)
          ? 'border-special hover:bg-special'
          : 'border-primary hover:bg-primary'}`}>
            <FontAwesomeIcon icon={dirtyFields.image === true ? faCheck : faUpload}
            className='m-2 text-xl' />Upload Image</label>
          <input type='file' className='hidden' id='game'
          {...register('game', { required: true })} />
          <input type='file' className='hidden' id='image'
          {...register('image', { required: true })}
          />
        </div>
      </div>
      <div className='w-5/6 col-start-2 col-end-3'>
        <div className='w-full m-6 flex justify-start items-center'>
          <div className='flex justify-center items-center'>
            <input type='radio' id='visa' name='card' value='visa' />
            <label htmlFor='visa'><FontAwesomeIcon icon={faCcVisa}
            className='mx-2 text-4xl text-sky-500 hover:cursor-pointer' /></label>
          </div>
          <div className='flex justify-center items-center'>
            <input type='radio' id='mastercard' name='card' value='mastercard' />
            <label htmlFor='mastercard'><FontAwesomeIcon icon={faCcMastercard}
            className='mx-2 text-4xl text-amber-500 hover:cursor-pointer' /></label>
          </div>
        </div>
        <input type='text' placeholder='Card Number'
        className='w-full m-6 p-3 pl-5 font-caviar text-white text-sm border-2 border-primary
        rounded-md outline-none box-shadow-custom transition-all bg-stone-800' />
        <div className='w-full m-6 flex justify-center items-center border-2 border-primary
        rounded-md box-shadow-custom bg-stone-800'>
          <input type='text' placeholder='MM / YY'
          className='w-1/2 p-3 pl-5 font-caviar text-white text-sm
          outline-none bg-transparent' />
          <input type='text' placeholder='CVV'
          className='w-1/2 p-3 pl-5 font-caviar text-white text-sm border-l-2 border-primary
          outline-none bg-transparent' />
        </div>
        <button type='submit'
        className='w-full mx-6 my-10 p-3 pl-5 relative flex justify-center items-center
        font-squids text-white text-sm border-2 border-primary
        rounded-md box-shadow-custom transition-all bg-stone-800
        hover:bg-primary hover:text-stone-800 hover:scale-110 hover:cursor-pointer'>
          Submit
        </button>
      </div>
    </form>
  )
}

export default GameForm
