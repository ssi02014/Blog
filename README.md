# 💻 Blog
### MERN(Mongodb, Express, React, Node) Stack으로 만든 나만의 블로그😁

<br />
<br />

## 🙏 Blog App clone 행동 수칙
1. **" npm install or yarn install "** 을 server 폴더에서 입력해주세요. **(백엔드 종속성 다운받기)**
2. **" npm install or yarn install "** 을 client 폴더에서 입력해주세요. **(프론트엔드 종속성 다운받기)**
3. **.env** 파일을 server 폴더에 만들어주셔야 됩니다. **(밑에 참고)👇**
3. server 실행 시 **start:dev**로 실행해주세요. 

<br />
<br />

## 🔖 Main Development Stack
### 👨🏻‍💻 Backend
1. Node.js
2. Express
3. MongoDB

<br />

### 👨🏻‍💻 Frontend
1. Reack
2. Redux, Redux-Saga
3. Infinite Scroll(Intersection Observer)
4. Ckeditor5
5. Styling: Bootstrap4, SCSS

<br />
<br />

## 📈 Server: 학습 내용 및 이슈
### 🔍 1. server에서 Babel 환경 설정 
- **Babel**: 자바스크립트 컴파일러, 최신 버전의 자바스크립트 문법은 브라우저가 이해하지 못하기 때문에 브라우저가 이해할 수 있는 문법으로 변환한다.
```javascript
    // ./server/.babelrc
    // 서버에서 바벨 환경 설정
    {
        "presets": ["@babel/preset-env"]
    }
```

<br />

### 🔍 2. Mongoose 오류 해결책
1. **mongoose version 5.11.16으로 인한 오류💥**
```
    - DeprecationWarning: Listening to events on the Db class has been deprecated and will be removed in the next major version.
```

<br />

2. **해결책** (버전 낮추기)✅
```
    - npm uninstall mongoose
    - npm install mongoose@5.11.15
```


<br />

## 🔍 3. .env
### .env 
```javascript
    //본인의 mongoDB cluster 생성 시에 만든 connection URI를 넣어주세요.
    MONGO_URI = "mongodb+srv://<id>:<password>@blog.io9gx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

    PORT="7000" //server를 실행시킬 port

    JWT_SECRET = "Minjae" //아무 문자열이나 넣으셔도 상관없습니다.
```

<br />

### ./confing/index.js로 .env 정보 가져오기
```javascript
    import dotenv from 'dotenv';

    dotenv.config();

    export default {
        MONGO_URI: process.env.MONGO_URI,
        JWT_SECRET: process.env.JWT_SECRET,
        PORT: process.env.PORT,
    }
```

<br />

## 📈 Client: 학습 내용 및 이슈
## 🔍 node-sass 최신 버전 오류 해결책 ✅
```
    - npm install node-sass@4.14.1
```

<br />

## 🏃 Redux
