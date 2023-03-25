const meetingList = [
  {
    no: 1,
    title: '첫번째 모임입니다.',
    maxNum: 5,
    firstDate: '2023-02-21',
    location: '서울',
    hashTags: ['#1', '#2', '#3'],
    createdAt: '2023-02-01',
    meetingStatus: '모집중',
    roll: 'host',
  },
  {
    no: 2,
    title: '두번째 모임입니다.',
    maxNum: 6,
    firstDate: '2023-02-22',
    location: '서울',
    hashTags: ['#1', '#2', '#3'],
    createdAt: '2023-02-02',
    meetingStatus: '진행중',
  },
  {
    no: 3,
    title: '세번째 모임입니다.',
    maxNum: 4,
    firstDate: '2023-02-23',
    location: '서울',
    hashTags: ['#1', '#2', '#3'],
    createdAt: '2023-02-03',
    meetingStatus: '진행완료',
    roll: 'host',
  },
  {
    no: 4,
    title: '네번째 모임입니다.',
    maxNum: 3,
    firstDate: '2023-02-24',
    location: '서울',
    hashTags: ['#1', '#2', '#3'],
    createdAt: '2023-01-31',
    meetingStatus: '모집중',
  },
  {
    no: 5,
    title: '다섯번째 모임입니다.',
    maxNum: 12,
    firstDate: '2023-02-25',
    location: '서울',
    hashTags: ['#1', '#2'],
    createdAt: '2023-02-11',
    meetingStatus: '진행완료',
  },
];

const getMeetingByNo = (no) => {
  const array = meetingList.filter((x) => x._id === no);
  if (array.length === 1) {
    return array[0];
  }
  return null;
};

export { meetingList, getMeetingByNo };
