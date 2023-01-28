import React, { ReactElement, useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ViewContext } from '../Views'

interface Inputs {
  email: string
  password: string
}

const SignupForm = (props: { onSuccess: Function }): ReactElement => {
  const { setUser, setFlash } = useContext(ViewContext)
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await signup(JSON.stringify(data))
  }

  const signup = async (data: string): Promise<void> => {
    const response = await fetch('/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    }).then(async (res) => await res.json())

    if (response.successful === true) {
      setFlash({ type: 'success', text: response.message })
      const login = await fetch('/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      }).then(async (res) => {
        try {
          return await res.json()
        } catch (_error) {
          return res
        }
      })

      if (login.successful === true) {
        const user = await fetch('/users', { method: 'GET' })
          .then(async (res) => await res.json())
        if (user.email !== undefined && user.username !== undefined) {
          setUser({ email: user.email, username: user.username })
        }
      }
      props.onSuccess()
    } else {
      setFlash({ type: 'error', text: response.message })
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)} className='py-3 lg:p-0'>
      <input type='text' placeholder='email'
      // eslint-disable-next-line no-useless-escape
      {...register('email', { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}
      className={`mx-1 lg:m-3 xl:m-6 p-2 pl-5 text-white text-sm border-2
      ${((errors.email?.message) != null) ? 'border-special' : 'border-primary'}
      rounded-full outline-none box-shadow-custom transition-all bg-transparent`} />
      <input type='password' placeholder='password'
      {...register('password', { required: true })}
      className={`mx-1 lg:m-3 xl:m-6 p-2 pl-5 text-white text-sm border-2
      ${((errors.password?.message) != null) ? 'border-special' : 'border-primary'}
      rounded-full outline-none box-shadow-custom transition-all bg-transparent`} />
      <button type='submit' className='ml-1 lg:m-3 xl:m-5 p-3 font-squids text-primary text-sm rounded-md
      box-shadow-custom border-2 border-primary transition-all
      hover:text-stone-800 hover:bg-primary hover:scale-110'>Sign Up</button>
    </form>
  )
}

export default SignupForm
