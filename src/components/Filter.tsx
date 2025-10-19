import { useAppContext } from '../contexts/AppContext';

export const Filter = () => {
  const { filter, setFilter } = useAppContext();

  return (
    <div className='mb-2'>
      <input
        placeholder='Filter by keyword'
        className='transition-colors duration-300 focus:bg-gray-100 px-2 py-1 text-sm bg-gray-50 border border-gray-100 placeholder:text-gray-400 rounded-md outline-0 w-full md:w-xs'
        type="text"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value.toLowerCase())
        }} />
    </div>
  )
}