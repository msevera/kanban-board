import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from './Button';

type NewtaskType = {
  onCancel: () => void;
  onCreate: (title: string, description: string) => void
}

export const NewTask = ({ onCancel, onCreate }: NewtaskType) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [])

  const onCreateHandler = useCallback(() => {
    onCreate(title, description)
  }, [title, description])

  return <div className='bg-white p-2 rounded-md'>
    <input ref={inputRef} placeholder='Task title' className='bg-white py-1 px-2 outline-0 w-full text-sm font-semibold' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
    <textarea placeholder='Add description...' className='bg-white py-1 px-2 outline-0 w-full text-sm' value={description} onChange={(e) => setDescription(e.target.value)} />
    <div className='flex justify-end gap-2'>
      <Button sm ghost onClick={onCancel}>Cancel</Button>
      <Button sm primary onClick={onCreateHandler}>Create task</Button>
    </div>
  </div>
}