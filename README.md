# Baekjoon_Omakase

2022 07 17 ~

백준 아이디를 입력하면 아이디의 수준에 맞는 3문제를 추천한다.  

#### 팀원
- 세종대학교 컴퓨터공학과 20학번 박규태(frontend(web))
- 세종대학교 전자정보통신공학과 18학번 박상욱(backend(server))

#### 개발언어  
##### frontend
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">

##### backend
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">

#### 개발기능
- [ ] 사용자의 백준 아이디 입력받기
- [X] 사용자가 푼 문제번호 크롤링
- [X] 사용자 티어 크롤링
- [X] 사용자의 티어에 맞는 문제번호 크롤링
- [X] 사용자에게 문제 추천

#### 개선사항
- [ ] 문제들을 매번 크롤링하는 것이 아니라 티어별 문제 번호를 JSON 혹은 DB에 저장해놓고 이를 업데이트 하는 방식으로 변경 (기존 방식은 너무 느림)
- [ ] 태그별 ex(영어, 알고리즘, 대회) 문제 추천 
