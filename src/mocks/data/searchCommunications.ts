export const searchCommunications = {
  success: true,
  message: "성공했습니다.",
  result: {
    $domainList: [
      {
        $domainId: 1,
        categoryName: "자유게시판",
        title: "1동 1호 라인 공사 언제 끝나나요?",
        content: "1동 1호 라인 공사가 언제 끝날지 궁금합니다. 진행 상황을 알고 싶어요.",
        isPrivated: false,
        writer: {
          memberId: 1,
          memberName: "이은주",
          nickname: "은주"
        },
        createdAt: "2024-05-14T14:06:21.651Z",
        updatedAt: "2024-05-15T15:06:21.651Z",
        status: "PENDING",
        replyCount: 10,
        views: 100,
        category: {
          id: 1,
          type: "POST",
          code: "freeboard",
          name: "자유게시판"
        }
      },
      {
        $domainId: 2,
        categoryName: "자유게시판",
        title: "아파트너 점검 사항을 소개합니다.",
        content: "아파트너 점검 사항에 대해 소개합니다. 체크리스트와 주요 점검 항목을 확인해보세요.",
        isPrivated: false,
        writer: {
          memberId: 2,
          memberName: "이영희",
          nickname: "영희"
        },
        createdAt: "2024-05-10T09:16:21.651Z",
        updatedAt: "2024-05-11T10:16:21.651Z",
        status: "PENDING",
        replyCount: 5,
        views: 200,
        category: { 
          id: 2,
          type: "POST",
          code: "freeboard",
          name: "자유게시판"
        }
      },
      {
        $domainId: 3,
        categoryName: "자유게시판",
        title: "아파트너 자유게시판 규칙을 소개합니다.",
        content: "아파트너 자유게시판의 규칙을 안내해드립니다. 모두가 즐겁게 이용할 수 있도록 규칙을 준수해주세요.",
        isPrivated: false,
        writer: {
          memberId: 3,
          memberName: "김민재",
          nickname: "민재"
        },
        createdAt: "2024-05-18T13:26:21.651Z",
        updatedAt: "2024-05-19T14:26:21.651Z",
        status: "PENDING",
        replyCount: 8,
        views: 300,
        category: {
          id: 3,
          type: "POST",
          code: "freeboard",
          name: "자유게시판"
        }
      },
      {
        $domainId: 4,
        categoryName: "주변 추천",
        title: "근처에 맛있는 케이크 파는 곳이 있을까요?",
        content: "근처에 맛있는 케이크 파는 곳이 있을까요? 추천 부탁드립니다.",
        isPrivated: false,
        writer: {
          memberId: 4,
          memberName: "김정은",
          nickname: "정은"
        },
        createdAt: "2024-05-16T17:36:21.651Z",
        updatedAt: "2024-05-17T18:36:21.651Z",
        status: "PENDING",
        replyCount: 2,
        views: 400,
        category: {
          id: 4,
          type: "POST",
          code: "recommendations",
          name: "주변 추천"
        }
      },
      {
        $domainId: 5,
        categoryName: "나눔장터",
        title: "6인용 식탁 나눔합니다!",
        content: "6인용 식탁을 나눔합니다. 필요하신 분은 연락주세요.",
        isPrivated: false,
        writer: {
          memberId: 5,
          memberName: "홍길동",
          nickname: "길동"
        },
        createdAt: "2024-05-12T20:46:21.651Z",
        updatedAt: "2024-05-13T21:46:21.651Z",
        status: "PENDING",
        replyCount: 7,
        views: 500,
        category: {
          id: 5,
          type: "POST",
          code: "market",
          name: "나눔장터"
        }
      },
      {
        $domainId: 6,
        categoryName: "나눔장터",
        title: "화장대 나눔합니다.",
        content: "화장대를 나눔합니다. 필요한 분은 연락주세요.",
        isPrivated: false,
        writer: {
          memberId: 6,
          memberName: "최민수",
          nickname: "Min"
        },
        createdAt: "2024-05-19T08:56:21.651Z",
        updatedAt: "2024-05-20T09:56:21.651Z",
        status: "PENDING",
        replyCount: 1,
        views: 600,
        category: {
          id: 6,
          type: "POST",
          code: "market",
          name: "나눔장터"
        }
      },
      {
        $domainId: 7,
        categoryName: "취미게시판",
        title: "취미게시판에서 안내사항 전달해 드립니다.",
        content: "취미게시판의 안내사항을 전달해드립니다. 이용 규칙을 확인해주세요.",
        isPrivated: false,
        writer: {
          memberId: 7,
          memberName: "김수현",
          nickname: "수현"
        },
        createdAt: "2024-05-08T11:06:21.651Z",
        updatedAt: "2024-05-09T12:06:21.651Z",
        status: "PENDING",
        replyCount: 3,
        views: 700,
        category: { 
          id: 7,
          type: "POST",
          code: "hobby",
          name: "취미게시판"
        }
      },
      {
        $domainId: 8,
        categoryName: "취미게시판",
        title: "취미게시판에서 안내사항 전달해 드립니다.",
        content: "취미게시판의 안내사항을 전달해드립니다. 이용 규칙을 확인해주세요.",
        isPrivated: false,
        writer: {
          memberId: 8,
          memberName: "이은주",
          nickname: "은주"
        },
        createdAt: "2024-05-07T10:06:21.651Z",
        updatedAt: "2024-05-08T11:06:21.651Z",
        status: "PENDING",
        replyCount: 4,
        views: 800,
        category: {
          id: 8,
          type: "POST",
          code: "hobby",
          name: "취미게시판"
        }
      },
      {
        $domainId: 9,
        categoryName: "주변 추천",
        title: "입주민 대표 위원회 선정 안내",
        content: "입주민 대표 위원회 선정에 대해 안내드립니다. 많은 참여 부탁드립니다.",
        isPrivated: false,
        writer: {
          memberId: 9,
          memberName: "박지훈",
          nickname: "hoon"
        },
        createdAt: "2024-05-22T17:36:21.651Z",
        updatedAt: "2024-05-23T18:36:21.651Z",
        status: "PENDING",
        replyCount: 6,
        views: 900,
        category: {
          id: 9,
          type: "POST",
          code: "recommendations",
          name: "주변 추천"
        }
      },
      {
        $domainId: 10,
        categoryName: "주변 추천",
        title: "저희 아파트 주변 맛집 추천합니다!",
        content: "저희 아파트 주변의 맛집을 추천합니다. 맛있는 곳 많이 소개해주세요.",
        isPrivated: false,
        writer: {
          memberId: 10,
          memberName: "유지민",
          nickname: "지민"
        },
        createdAt: "2024-05-09T14:06:21.651Z",
        updatedAt: "2024-05-10T15:06:21.651Z",
        status: "PENDING",
        replyCount: 9,
        views: 1000,
        category: {
          id: 10,
          type: "POST",
          code: "recommendations",
          name: "주변 추천"
        }
      }
    ]
  }
};
