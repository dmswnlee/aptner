import { Post } from '@/interfaces/Post';

export const communications = {
  success: true,
  message: "string",
  result: {
    totalCount: 10,
    totalPages: 1,
    currentPage: 0,
    result: {
      posts: [
        {
          id: 1,
          title: '1동 1호 라인 공사 언제 끝나나요?', 
          content: "1동 1호 라인 공사가 언제 끝날지 궁금합니다. 진행 상황을 알고 싶어요.",
          createdAt: "2024-05-14T14:06:21.651Z",
          updatedAt: "2024-05-15T15:06:21.651Z",
          writer: {
            id: 1, 
            name: "이은주",
            nickname: "은주"
          },
          category: {
            id: 1,
            type: "POST",
            code: "freeboard",
            name: "자유게시판"
          },
          views: 100,
          isPin: false
        },
        {
          id: 2,
          title: '아파트너 점검 사항을 소개합니다.',
          content: "아파트너 점검 사항에 대해 소개합니다. 체크리스트와 주요 점검 항목을 확인해보세요.",
          createdAt: "2024-05-10T09:16:21.651Z",
          updatedAt: "2024-05-11T10:16:21.651Z",
          writer: {
            id: 2,
            name: "이영희",
            nickname: "영희"
          },
          category: {
            id: 2,
            type: "POST",
            code: "freeboard",
            name: "자유게시판"
          },
          views: 200,
          isPin: false
        },
        {
          id: 3,
          title: '아파트너 자유게시판 규칙을 소개합니다.',
          content: "아파트너 자유게시판의 규칙을 안내해드립니다. 모두가 즐겁게 이용할 수 있도록 규칙을 준수해주세요.",
          createdAt: "2024-05-18T13:26:21.651Z",
          updatedAt: "2024-05-19T14:26:21.651Z",
          writer: {
            id: 3,
            name: "김민재",
            nickname: "민재"
          },
          category: {
            id: 3,
            type: "POST",
            code: "freeboard",
            name: "자유게시판"
          },
          views: 300,
          isPin: false
        },
        {
          id: 4,
          title: '근처에 맛있는 케이크 파는 곳이 있을까요?',
          content: "근처에 맛있는 케이크 파는 곳이 있을까요? 추천 부탁드립니다.",
          createdAt: "2024-05-16T17:36:21.651Z",
          updatedAt: "2024-05-17T18:36:21.651Z",
          writer: {
            id: 4,
            name: "김정은",
            nickname: "정은"
          },
          category: {
            id: 4,
            type: "POST",
            code: "recommendations",
            name: "주변 추천"
          },
          views: 400,
          isPin: false
        },
        {
          id: 5,
          title: '6인용 식탁 나눔합니다!',
          content: "6인용 식탁을 나눔합니다. 필요하신 분은 연락주세요.",
          createdAt: "2024-05-12T20:46:21.651Z",
          updatedAt: "2024-05-13T21:46:21.651Z",
          writer: {
            id: 5,
            name: "홍길동",
            nickname: "길동"
          },
          category: {
            id: 5,
            type: "POST",
            code: "market",
            name: "나눔장터"
          },
          views: 500,
          isPin: false
        },
        {
          id: 6,
          title: '화장대 나눔합니다.',
          content: "화장대를 나눔합니다. 필요한 분은 연락주세요.",
          createdAt: "2024-05-19T08:56:21.651Z",
          updatedAt: "2024-05-20T09:56:21.651Z",
          writer: {
            id: 6,
            name: "최민수",
            nickname: "Min"
          },
          category: {
            id: 6,
            type: "POST",
            code: "market",
            name: "나눔장터"
          },
          views: 600,
          isPin: false
        },
        {
          id: 7,
          title: '취미게시판에서 안내사항 전달해 드립니다.',
          content: "취미게시판의 안내사항을 전달해드립니다. 이용 규칙을 확인해주세요.",
          createdAt: "2024-05-08T11:06:21.651Z",
          updatedAt: "2024-05-09T12:06:21.651Z",
          writer: {
            id: 7,
            name: "김수현",
            nickname: "수현"
          },
          category: {
            id: 7,
            type: "POST",
            code: "hobby",
            name: "취미게시판"
          },
          views: 700,
          isPin: false
        },
        {
          id: 8,
          title: '취미게시판에서 안내사항 전달해 드립니다.',
          content: "취미게시판의 안내사항을 전달해드립니다. 이용 규칙을 확인해주세요.",
          createdAt: "2024-05-07T10:06:21.651Z",
          updatedAt: "2024-05-08T11:06:21.651Z",
          writer: {
            id: 8,
            name: "이은주",
            nickname: "은주"
          },
          category: {
            id: 8,
            type: "POST",
            code: "hobby",
            name: "취미게시판"
          },
          views: 800,
          isPin: false
        },
        {
          id: 9,
          title: '입주민 대표 위원회 선정 안내',
          content: "입주민 대표 위원회 선정에 대해 안내드립니다. 많은 참여 부탁드립니다.",
          createdAt: "2024-05-22T17:36:21.651Z",
          updatedAt: "2024-05-23T18:36:21.651Z",
          writer: {
            id: 9,
            name: "박지훈",
            nickname: "hoon"
          },
          category: {
            id: 9,
            type: "POST",
            code: "recommendations",
            name: "주변 추천"
          },
          views: 900,
          isPin: false
        },
        {
          id: 10,
          title: '저희 아파트 주변 맛집 추천합니다!',
          content: "저희 아파트 주변의 맛집을 추천합니다. 맛있는 곳 많이 소개해주세요.",
          createdAt: "2024-05-09T14:06:21.651Z",
          updatedAt: "2024-05-10T15:06:21.651Z",
          writer: {
            id: 10,
            name: "유지민",
            nickname: "지민"
          },
          category: {
            id: 10,
            type: "POST",
            code: "recommendations",
            name: "주변 추천"
          },
          views: 1000,
          isPin: false
        }
      ] as Post[],
      pinnedPost: [
        {
          id: 11,
          title: "정기 소방 훈련 안내",
          content: "우리 아파트에서는 2024년 6월 5일에 정기 소방 훈련을 실시할 예정입니다. 모두의 안전을 위해 많은 참여 부탁드립니다.",
          createdAt: "2024-05-01T15:06:21.651Z",
          updatedAt: "2024-05-02T16:06:21.651Z",
          writer: {
            id: 11,
            name: "관리사무소",
            nickname: "관리소"
          },
          category: {
            id: 11,
            type: "POST",
            code: "pinned",
            name: "공지사항"
          },
          views: 2000,
          isPin: true
        },
        {
          id: 12,
          title: "단지 내 주차장 보수 공사 안내",
          content: "2024년 6월 10일부터 15일까지 단지 내 주차장 보수 공사가 진행될 예정입니다. 이용에 불편이 없도록 협조 부탁드립니다.",
          createdAt: "2024-05-05T14:06:21.651Z",
          updatedAt: "2024-05-06T15:06:21.651Z",
          writer: {
            id: 12,
            name: "관리사무소",
            nickname: "관리소"
          },
          category: {
            id: 12,
            type: "POST",
            code: "pinned",
            name: "공지사항"
          },
          views: 2500,
          isPin: true
        }
      ]
    }
  }
};
