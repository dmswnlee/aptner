# aptner

아파트 입주민들을 위한 다양한 관리업무 제공 및 편의시설, 혜택등의 정보를 제공하는 플랫폼 서비스

<br>

## 프로젝트 소개

💻 배포한 사이트

[aptner](https://aptner.vercel.app/)

<br>

💻 프로젝트 기간

24.05.07 ~ 24.06.12

<br>

💻 개발 스택

- 언어: TypeScript
- 빌드 : Next.js
- 호스팅 : Vercel
- 패키지매니저 : yarn
- 라이브러리
  - 상태관리 : Redux Toolkit
  - 데이터 패칭 : Redux-Saga
  - 라우팅 : Next-App-Routing
  - CSS 스타일링 : Tailwind CSS
  - Autentication : Next-Auth

<br>

💻 팀원 소개 및 역할

|   [이은주](https://github.com/dmswnlee)   |   [김정은](https://github.com/chloeun)   |   [김민재](https://github.com/mj950313)   | 
|-----------|----------|----------|
|   • 회원가입 <br> • 로그인 <br> • 공지사항 <br> |   • 홈페이지 <br> • 의무공개 <br> • 소통공간 <br> • 통합검색 <br>  |    • 아파트소개 <br> • 민원게시판 <br> • 마이페이지 <br>  

<br>

🗂️ 디렉토리 구조
```react
src
|-- app
|   |-- apartment
|   |-- communication
|   |-- complaints
|   |-- disclosure
|   |-- find-id-password
|   |-- login
|   |-- mainsearch
|   |-- mypage
|   |-- notice
|   |-- signup
|   |   |-- _component
|   |   |-- page.tsx
|   |-- layout.tsx
|   |-- page.tsx
|-- assets
|-- interface   
|   |-- post.ts
|-- components
|   |-- Modal.tsx
|   |-- Button.tsx
|-- stores
|-- utils
```

<br>

## 기능 구현

<br>

<table>
   <tr>
      <td align="center">회원가입</td>
      <td align="center">본인인증</td>
   </tr>
   <tr>
      <td  align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbrXszA%2FbtsHWUoXSjo%2FBjYHZrQboIK7KpQBjuQBPK%2Fimg.png" width="400" height="300"/> </td>
      <td  align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FXgQyQ%2FbtsHVJhDKOA%2Fq7JEdQa8T4PW5AWm2bafnK%2Fimg.png" width="400" height="300"/> </td>
   </tr>
   <tr>
      <td  align="center">4단계에 걸친 회원가입 절차 <br>
      (약관동의-본인인증-폼입력-아파트입력)</td>
      <td  align="center">회원가입 절차 중 본인인증 폼</td>
   </tr>
</table>

<br>

<table>
   <tr>
      <td align="center">로그인</td>
      <td align="center">아이디 / 비밀번호 찾기</td>
   </tr>
   <tr>
      <td  align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FoCMF3%2FbtsHVamunY7%2FMLQwIevKcy5uAeZHkYdEfk%2Fimg.png" width="400" height="300"/> </td>
      <td  align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FROvx4%2FbtsHUz74A4c%2F0Golt3tOTgktfHOKfI94tK%2Fimg.png" width="400" height="300"/> </td>
   </tr>
   <tr>
      <td  align="center">폼 입력을 통한 로그인</td>
      <td  align="center">폼 입력을 통한 아이디 및 비밀번호 찾기</td>
   </tr>
</table>

<br>

<table>
   <tr>
      <td align="center">홈페이지</td>
      <td align="center">아파트소개</td>
   </tr>
   <tr>
      <td  align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FxE7Qc%2FbtsHWaZ6DYQ%2FRDUwMWcPMKKM9t728xAkrK%2Fimg.png" width="400" height="300"/> </td>
      <td  align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbHMqpN%2FbtsHURU1EIg%2FsKxrmEl4nG9a3ysVYBalKK%2Fimg.png" width="400" height="300"/> </td>
   </tr>
   <tr>
      <td  align="center">홈페이지 퀵메뉴 및 아파트 메인 페이지</td>
      <td  align="center">아파트 소개 및 외부 api를 사용한 지도 가능</td>
   </tr>
</table>

<br>

<table>
   <tr>
      <td align="center">공지사항</td>
      <td align="center">의무공개</td>
   </tr>
   <tr>
      <td  align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbyh9yJ%2FbtsHWWAkywa%2FGdOqC0o7FvtuM1QO2hjrf0%2Fimg.png" width="400" height="300"/> </td>
      <td  align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FJFXcM%2FbtsHVLNklG3%2FhgyrtbEXA76lOwUfK8gxZK%2Fimg.png" width="400" height="300"/> </td>
   </tr>
   <tr>
      <td  align="center">중요글, 일반글 출력 및 분류에 따른 각 탭 필터링, 페이지네이션</td>
      <td  align="center">중요글, 일반글 출력 및 분류에 따른 각 탭 필터링, 페이지네이션</td>
   </tr>
</table>

<br>

<table>
   <tr>
      <td align="center">소통공간</td>
      <td align="center">민원게시판</td>
   </tr>
   <tr>
      <td  align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCaWeZ%2FbtsHWt6fDVe%2FicW6fcxp7dSpIFLfStzZPk%2Fimg.png" width="400" height="300"/> </td>
      <td  align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FkTY6Y%2FbtsHWRFMzt4%2FJ6XLLUZZnQ6EFucofxj8Ck%2Fimg.png" width="400" height="300"/> </td>
   </tr>
   <tr>
      <td  align="center">중요글, 일반글 출력 및 분류에 따른 각 탭 필터링, 새글 및 이미지 뱃지 출력, 게시판 내 내용 검색기능</td>
      <td  align="center">중요글, 일반글 출력 및 분류에 따른 각 탭 필터링, 새글 및 이미지 뱃지 출력, 게시판 내 내용 검색기능</td>
   </tr>
</table>

<br>

<table>
   <tr>
      <td align="center">게시판 상세페이지</td>
      <td align="center">게시판 글작성</td>
   </tr>
   <tr>
      <td  align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbZtAGY%2FbtsHVSZJLtA%2FLD1gQyqKvL7jJsdkd1uX70%2Fimg.png" width="400" height="300"/> </td>
      <td  align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FJ9u0R%2FbtsHUqDzZlN%2FcDkboYsz2CpgjLiEElXDgK%2Fimg.png" width="400" height="300"/> </td>
   </tr>
   <tr>
      <td  align="center">상세 내용 및 이모티콘 반응 선택, 댓글기능</td>
      <td  align="center">에디터를 사용한 글작성 및 이미지 등 첨부기능</td>
   </tr>
</table>

<br>

<table>
   <tr>
      <td align="center">통합검색</td>
      <td align="center">마이페이지</td>
   </tr>
   <tr>
      <td  align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Ft95FJ%2FbtsHURAGPmt%2FIYm5Zx5wMlvuvx4BjTffzK%2Fimg.png" width="400" height="300"/> </td>
      <td  align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FmoQqj%2FbtsHWzyBz93%2FOBxzwepZhkLwLpvkiUDEM1%2Fimg.png" width="400" height="300"/> </td>
   </tr>
   <tr>
      <td  align="center">홈페이지 전체 게시물에 대한 검색기능</td>
      <td  align="center">유저 기본정보, 비밀번호, 인증번호 변경</td>
   </tr>
</table>

<br>

## 컨벤션

#### 브랜치 컨벤션
- main
    - develop
        - feature/a
        - feature/b
        - feature/c

<br>

#### 커밋 컨벤션
- Add : 파일 생성
    - ex) Add : Member Entity 생성
- Feat : 기능 추가
    - ex) Feat : 회원가입 기능 추가
- Modify : 해당 기능 코드 수정
    - ex) Modify : 회원가입 검증 수정
- Fix : 버그 수정 (디버깅)
    - ex) Fix : 로그아웃 후 이동하는 페이지 변경
- Comment : 주석만 건드렸을 때
- Rename : 파일, 폴더명 수정 or 이동만 했을 때
- Remove : 파일 삭제만 했을 때
- Build : 빌드 관련 수정 (dependency 수정 등)
- Chore : import 정리, 포맷 정리 등 (필요하면 마지막에 쭉 돌리면 될 듯)
- Layout : Layout 구조 변경
- Lib : Library 변경 사항







