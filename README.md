# 💻 Blog
### MERN(Mongodb, Express, React, Node) Stack으로 만든 나만의 블로그😁

<br />
<br />

## 🙏 Blog App Clone 시 행동 수칙
1. **" npm install or yarn install "** 을 server 폴더에서 입력해주세요. **(백엔드 종속성 다운받기)**
2. **" npm install or yarn install "** 을 client 폴더에서 입력해주세요. **(프론트엔드 종속성 다운받기)**
3. **.env** 파일을 server 폴더 내부에 만들어주셔야 됩니다. **(밑에 참고)👇**
4. server 실행 시 **start:dev**로 실행해주세요. 

<br />
<br />

## 🔖 Main Development Stack
### 👨🏻‍💻 Backend
1. Node.js
2. Express
3. MongoDB

<br />

### 👨🏻‍💻 Frontend
1. React
2. Redux, Redux-Saga
3. Infinite Scroll(Intersection Observer)
4. Ckeditor5
5. Styling: Bootstrap4(reactstrap), SCSS

<br />
<br />

## 📈 Server: 학습 내용 및 이슈
### 🔍 1. Server에서 Babel 환경 설정 
- **Babel**: 자바스크립트 컴파일러, 최신 버전의 자바스크립트 문법은 브라우저가 이해하지 못하기 때문에 브라우저가 이해할 수 있는 문법으로 변환한다.
```javascript
    // ./server/.babelrc
    // 서버에서 바벨 환경 설정
    {
        "presets": ["@babel/preset-env"]
    }
```

<br />

### 🔍 2. Mongoose 오류 및 해결책
1. **mongoose version 5.11.16으로 인한 오류💥**
```
    - DeprecationWarning: Listening to events on the Db class has been deprecated and will be removed in the next major version.
    - ✅ npm install mongoose@5.11.15 (버전 낮추기)
```

<br />

## 🔍 3. .env
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
<br />

## 📈 Client: 학습 내용 및 이슈
### 🔍 1. node-sass 최신 버전 오류 해결책 
```
    - ✅ npm install node-sass@4.14.1
```

<br />

### 🔍 2. node-sass 최신 버전 오류 해결책 ✅
```
    - 💥Error: Could not find router reducer in state tree, it must be mounted under "router"
    - 이유: connected-react-router가 아직 history v5를 제대로 반영하지 못해 발생하는 문제. 

    - ✅ npm i history@4.7.2 (버전 낮추기)
```

<br />

### 🔍 3. reactstrap 사용법
### reactstarp: https://reactstrap.github.io/
```javascript
    //Header
    import { Row, Col } from 'reactstrap';
   
    //class에 text-center, m-auto 같이 추가해서 적용시킨다.
    <Row>
        <Col md="6" sm="auto" className="text-center m-auto">
            <h1>Read Our Blog</h1>
            <p>This is Minjae's Side Project Blog</p>
        </Col>
    </Row>
```

<br />

### 🔍 4. font-awesome 사용법
```javascript
    1. yarn add or npm i @fortawesome/fontawesome-svg-core
    2. yarn add or npm i @fortawesome/free-solid-svg-icons
    3. yarn add or npm i @fortawesome/react-fontawesome

    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faMouse } from '@fortawesome/free-solid-svg-icons';

    <FontAwesomeIcon icon={faMouse} />
```

<br />
<br />

## 🏃 Redux
### 🔍 1. Redux-Saga Effect
```
    1. put: 특정 액션을 dispatch 한다.
    2. takeEvery: 들어오는 모든 액션에 대해 특정 작업을 처리해준다.
    3. takeLatest: 기존에 진행 중이던 작업이 있다면 취소하고, 가장 마지막으로 실행된 작업만 수행한다.
    4. all: 여러 사가를 합쳐 주는 역할을 한다.
    5. fork: 함수를 실행시켜주는 이펙트, 하지만 비동기 실행을 한다.
    6. call: promise를 반환하는 함수를 호출하고, 결과가 반환 될 때까지 기다린다(즉, 동기로 실행)
```

<br />

### 🔍 Redux, Redux-Saga Setting
```javascript
    1. Connected React Router
        - 리덕스에서 history 객체 관리를 위한 라이브러리 
        - 주의사항 router 리듀서명은 router로 고정!
        - history는 history 모듈에서 createBrowserHistory로 받아올 수 있다.
        - 참고: https://hokeydokey.tistory.com/m/74?category=783109

    2. createSagaMiddleware
        - redux-saga 미들웨어를 Redux Subspace 미들웨어로 생성하는 기능
        - const sagaMiddleware = createSagaMiddleware();

    3. redux의 store 생성, 리듀서와 미들웨어 사용
        - const store = createStore(reducers, applyMiddleware(sagaMiddleware)

    4. 항상 store 보다 아래에서 코드가 작성되어야 한다. rootSaga를 인자로 둔다.
        - sagaMiddleware.run(rootSaga)

    6. 
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,  
            document.querSelector('#root');
        )
```
<br />

### 🔍 3. Redux-Saga Process
```javascript
    1. 📃 액션 타입 정의 예시
        export const LOGIN_REQUEST = "LOGIN_REQUEST";
        export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
        export const LOGIN_FAILURE = "LOGIN_FAILURE";


    2. 📃 초기 값 및 Reducer 함수 작성

        - 초기 값 설정
        const initialState = {
            token: localStorage.getItem('token'),
            isAuthenticated: null,
            isLoading: false,
            ...
        }

        - Reducer 함수 작성 예시
        const authReducer = (state = initialState, action) => {
            switch (action.type) {
                case LOGIN_REQUEST:
                    return {
                        ...state,
                        errorMsg: "",
                        isLoading: true,
                    }
                 default:
                    return state
            }

        export default authReducer;


    3. 📃 rootReducer에 통합


    4. 📃 Saga 작성

        - Saga 작성 예시(logout)
        function* logout(action) {
            try {
                yield put({
                    type: LOGOUT_SUCCESS,
                });
            } catch (e) {
                yield put({
                    type: LOGOUT_FAILURE,
                }); 
                console.log(e);
            }
        }

        function* watchLogout() {
            yield takeEvery(LOGOUT_REQUEST, logout);
        }
        //authSaga() 여러 Saga 통합
        export default function* authSaga() {
            yield all([
                fork(watchLoginUser),
                fork(watchLogout),
                fork(watchLoadingUser),
            ]);
        }


    5. 📃 rootSaga에 통합


    6. 📃 component에서 dispatch 

        - dispatch 작성 예시(LoginModal)
        const handleToggle = () => {
            dispatch({
                type: CLEAR_ERROR_REQUEST,
            })
            setModal(!modal);
        };

```
