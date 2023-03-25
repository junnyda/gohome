import { useState, useEffect } from 'react';
import { getAllMembersByNo } from 'api';

export function useMembers(no) {
  const [members, setMembers] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const members = await getAllMembersByNo(parseInt(no));
        console.log(members);
        setMembers(members);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return members;
}
