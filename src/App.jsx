import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  add,
  clear,
  remove,
  update,
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

  const [modalType, setModalType] = useState(null); // modalType: 'full', 'name', 'age'
  const [currentStudent, setCurrentStudent] = useState(null);

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

  function openModal(type, student) {
    setCurrentStudent(student);
    setModalType(type);
    if (type === 'name') {
      nameModalRef.current.value = student.name;
    } else if (type === 'age') {
      ageModalRef.current.value = student.age;
    } else if (type === 'full') {
      nameModalRef.current.value = student.name;
      ageModalRef.current.value = student.age;
    }
  }

  function handleEditSubmit() {
    if (modalType === 'name') {
      dispatch(
        updateName({ id: currentStudent.id, name: nameModalRef.current.value })
      );
    } else if (modalType === 'age') {
      dispatch(
        updateAge({ id: currentStudent.id, age: ageModalRef.current.value })
      );
    } else if (modalType === 'full') {
      dispatch(
        update({
          id: currentStudent.id,
          name: nameModalRef.current.value,
          age: ageModalRef.current.value,
        })
      );
    }
    setModalType(null);
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
              className='mt-1 block w-full px-4 py-2 border'
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
              className='mt-1 block w-full px-4 py-2 border'
              ref={ageRef}
            />
          </div>
          <button
            type='submit'
            className='w-full py-2 px-4 bg-blue-500 text-white rounded-md'
          >
            Submit
          </button>
        </form>
      </div>

      <div className='flex justify-end bg-gray-200 container mx-auto px-24'>
        <button
          className='py-2 w-44 px-5 rounded-md bg-red-500 text-white'
          onClick={handleClear}
        >
          All Clear
        </button>
      </div>

      <div className='wrapper grid grid-cols-4 gap-6 container mx-auto px-24 pt-16 bg-gray-200 h-screen'>
        {student.map((value) => (
          <div
            key={value.id}
            className='bg-white flex flex-col gap-6 p-4 rounded-lg shadow-md'
          >
            <img src={Viktor} alt='' width={100} className='mx-auto' />
            <div className='flex justify-between'>
              <h3 className='text-2xl font-bold text-gray-800'>
                Name: {value.name.toUpperCase()}
              </h3>
              <button onClick={() => openModal('name', value)}>
                <img src={Edit} alt='' width={25} />
              </button>
            </div>
            <div className='flex justify-between'>
              <p className='text-gray-700 text-2xl'>Age: {value.age}</p>
              <button onClick={() => openModal('age', value)}>
                <img src={Edit} alt='' width={25} />
              </button>
            </div>
            <button
              className='bg-blue-900 rounded-md text-white py-2 px-5 mt-2'
              onClick={() => openModal('full', value)}
            >
              Update
            </button>
            <button
              className='bg-red-500 rounded-md text-white py-2 px-5 mt-2'
              onClick={() => handleDel(value.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {modalType && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50'>
          <div className='bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative'>
            <button
              className='absolute top-3 right-3 text-gray-500'
              onClick={() => setModalType(null)}
            >
              &times;
            </button>
            <h2 className='text-2xl font-semibold text-center text-gray-800 mb-4'>
              {modalType === 'name'
                ? 'Update Name'
                : modalType === 'age'
                ? 'Update Age'
                : 'Update Student'}
            </h2>
            <div className='space-y-4'>
              {(modalType === 'name' || modalType === 'full') && (
                <div>
                  <label htmlFor='update-name' className='block text-gray-700'>
                    Name:
                  </label>
                  <input
                    type='text'
                    id='update-name'
                    className='mt-1 block w-full px-4 py-2 border'
                    ref={nameModalRef}
                  />
                </div>
              )}
              {(modalType === 'age' || modalType === 'full') && (
                <div>
                  <label htmlFor='update-age' className='block text-gray-700'>
                    Age:
                  </label>
                  <input
                    type='number'
                    id='update-age'
                    className='mt-1 block w-full px-4 py-2 border'
                    ref={ageModalRef}
                  />
                </div>
              )}
              <button
                onClick={handleEditSubmit}
                className='w-full py-2 px-4 bg-blue-500 text-white rounded-md mt-4'
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
