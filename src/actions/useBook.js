import { useContext } from 'react';
import AppStateContext from '../contexts/AppStateContext';

// books 데이터를 받아서 내주는 역할을 하는 Hook
export default function useBooks() {
  const { books, searchBook } = useContext(AppStateContext);
  return { books, searchBook };
}