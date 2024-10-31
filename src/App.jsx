import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  add,
  clear,
  remove,
  updateName,
  updateAge,
} from './redux/studentSlice';
import Viktor from './assets/victor.svg';
import Edit from './assets/edit.svg';

function App() {
  const student = useSelector((state) => state.student.value);
  const nameRef = useRef();
  const ageRef = useRef();
  const formRef = useRef();

  const nameModalRef = useRef();
  const ageModalRef = useRef();
  const dispatch = useDispatch();

  const [modal, setModal] = useState({ show: false, type: '', id: null });

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      id: Date.now(),
      name: nameRef.current.value,
      age: ageRef.current.value,
    };

    dispatch(add(data));
    formRef.current.reset();
  }

  function handleClear() {
    dispatch(clear());
  }

  function handleDel(id) {
    dispatch(remove(id));
  }

  function handleNameUpdate(id) {
    setModal({ show: true, type: 'name', id });
  }

  function handleAgeUpdate(id) {
    setModal({ show: true, type: 'age', id });
  }

  function handleModalSubmit() {
    if (modal.type === 'name') {
      dispatch(updateName({ id: modal.id, name: nameModalRef.current.value }));
    } else if (modal.type === 'age') {
      dispatch(updateAge({ id: modal.id, age: +ageModalRef.current.value }));
    }
    setModal({ show: false, type: '', id: null });
  }

  return (
    <div className='flex flex-col'>
      <div className='flex justify-center bg-gray-100'>
        <form
          className='bg-white p-6 rounded-lg shadow-md w-full max-w-sm'
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <h2 className='text-2xl font-semibold text-gray-800 mb-4 text-center'>
            Student Form
          </h2>

          <div className='mb-4'>
            <label htmlFor='name' className='block text-gray-700'>
              Name:
            </label>
            <input
              type='text'
              id='name'
              name='name'
              className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none'
              placeholder='Enter your name'
              ref={nameRef}
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='age' className='block text-gray-700'>
              Age:
            </label>
            <input
              type='number'
              id='age'
              name='age'
              className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none'
              placeholder='Enter your age'
              ref={ageRef}
            />
          </div>

          <button
            type='submit'
            className='w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition'
          >
            Submit
          </button>
        </form>
      </div>

      <div className='flex justify-end  container mx-auto px-24'>
        <button
          className='py-2 w-44 px-5 rounded-md bg-red-500 hover:bg-red-600 text-white '
          onClick={handleClear}
        >
          All Clear
        </button>
      </div>

      <div className='wrapper grid grid-cols-4 gap-6 container mx-auto px-24 pt-16 h-screen'>
        {student.map((value) => (
          <div
            key={value.id}
            className='bg-white flex flex-col gap-6 p-4 rounded-lg shadow-md h-[400px]'
          >
            <img src={Viktor} alt='' width={100} className='mx-auto' />

            <div className='flex justify-between'>
              <h3 className='text-2xl font-bold text-gray-800'>
                <b className='text-3xl'>Name: </b>
                {value.name.toUpperCase()}
              </h3>
              <button onClick={() => handleNameUpdate(value.id)}>
                <img src={Edit} alt='' width={25} />
              </button>
            </div>

            <div className='flex justify-between'>
              <p className='text-gray-700 text-2xl'>
                <b className='text-3xl'>Age: </b> {value.age}
              </p>
              <button onClick={() => handleAgeUpdate(value.id)}>
                <img src={Edit} alt='' width={25} />
              </button>
            </div>

            <button
              className='bg-red-500 hover:bg-red-600 rounded-md text-white py-2 px-5'
              onClick={() => handleDel(value.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {modal.show && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50'>
          <div className='bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative'>
            <button
              className='absolute top-3 right-3 text-gray-500 hover:text-gray-700'
              onClick={() => setModal({ show: false, type: '', id: null })}
            >
              &times;
            </button>

            <h2 className='text-2xl font-semibold text-center text-gray-800 mb-4'>
              Update {modal.type === 'name' ? 'Name' : 'Age'}
            </h2>

            <form className='space-y-4'>
              <div>
                <label
                  htmlFor={`update-${modal.type}`}
                  className='block text-gray-700'
                >
                  {modal.type === 'name' ? 'Name:' : 'Age:'}
                </label>
                <input
                  type={modal.type === 'name' ? 'text' : 'number'}
                  id={`update-${modal.type}`}
                  className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none'
                  placeholder={`Enter updated ${modal.type}`}
                  ref={modal.type === 'name' ? nameModalRef : ageModalRef}
                  required
                />
              </div>

              <button
                type='button'
                onClick={handleModalSubmit}
                className='w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition'
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
