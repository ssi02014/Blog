# 💻 Blog
### MERN(Mongodb, Express, React, Node) Stack으로 만든 나만의 블로그😁

<br />

## 🙏 Blog App 종속성 다운로드
1. **" npm i or yarn install "** 을 server 폴더에서 입력해주세요. **(백엔드 종속성 다운받기)**
2. **" npm i or yarn install "** 을 client 폴더에서 입력해주세요. **(프론트엔드 종속성 다운받기)**
3. **.env** 파일을 server 폴더 내부에 만들어주셔야 됩니다. **(밑에 참고)👇**
4. **.env** 파일을 client 폴더 내부에 만들어주셔야 됩니다. **(밑에 참고)👇**

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

### 👨🏻‍💻 Cloud
1. Aws EC2
2. Aws S3

<br />

## 📃 커밋 메시지
- Add: 특정 기능을 하는 코드를 구현하였을 때
- Modify: 이미 구현된 기능을 수정하는데, 기능의 향상이 이루어졌을 때
- Close(Closes, Closed): 일반적인 개발 이슈를 완료했을 때
- Refactor: 리팩토링 했을 때(기능 향상은 아니다. 중복 코드 제거 및 변수 & 함수 등 코드 디자인 변경)
- Delete: 불필요한 코드 제거
- Fix(Fixex, Fixed): 버그 픽스나 핫 픽스 이슈를 완료했을 때
- Merge: Branch를 merge 했을 때
- Conflict: 충돌을 해결했을 때
- Docs: README.md와 같은 문서 수정했을 때

<br />

## 📖 Projects Board
![그림1](https://user-images.githubusercontent.com/64779472/120682567-91ea5b80-c4d7-11eb-9d39-c6dbe0643446.png)

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

## 🔍 3. sever: .env
```js
    //본인의 mongoDB cluster 생성 시에 만든 connection URI를 넣어주세요.
    MONGO_URI = "mongodb+srv://<id>:<password>@blog.io9gx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

    PORT="7000" //server를 실행시킬 port

    JWT_SECRET = "Minjae" //아무 문자열이나 넣으셔도 상관없습니다.
```
<br />

## 🔍 4. client: .env
```js
    REACT_APP_BASIC_SERVER_URL = "http://localhost:7000"
    REACT_APP_BASIC_IMAGE_URL = "https://<본인s3버킷>.s3.ap-northeast-2.amazonaws.com/<버킷 속 객체 폴더명(ex.upload)>/<이미지URL>"
```
<br />

## 🔍 5. .env 주의 사항
```
    1. React에서 사용할 때는 접두사로 REACT_APP_ 넣어야된다.
    2. 변경 사항을 반영하려면 서버를 다시 시작해야 된다.
    3. src 폴더가 아닌 root 폴더 즉(package.json과 동일한 위치)에 있어야 한다.
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

### 🔍 2. node-sass 최신 버전 오류 해결책
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

### 🔍 4. CKEditor5 Setting
### CKEditor:https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html

<br />

```javascript
    1. npm run eject (이전 모든 변경 사항 commit 완료되야함)

    2. yarn add @babel/plugin-transform-react-jsx @babel/plugin-transform-react-jsx-self

    3. plugin Install
        - yarn add  @ckeditor/ckeditor5-adapter-ckfinder @ckeditor/ckeditor5-alignment @ckeditor/ckeditor5-autoformat @ckeditor/ckeditor5-basic-styles @ckeditor/ckeditor5-block-quote @ckeditor/ckeditor5-build-balloon @ckeditor/ckeditor5-build-classic @ckeditor/ckeditor5-build-inline @ckeditor/ckeditor5-dev-utils @ckeditor/ckeditor5-dev-webpack-plugin @ckeditor/ckeditor5-easy-image @ckeditor/ckeditor5-editor-balloon @ckeditor/ckeditor5-editor-classic @ckeditor/ckeditor5-essentials @ckeditor/ckeditor5-font @ckeditor/ckeditor5-heading @ckeditor/ckeditor5-image @ckeditor/ckeditor5-indent @ckeditor/ckeditor5-link @ckeditor/ckeditor5-list @ckeditor/ckeditor5-media-embed @ckeditor/ckeditor5-paragraph @ckeditor/ckedito5-paste-from-office @ckeditor/ckeditor5-react @ckeditor/ckeditor5-table @ckeditor/ckeditor5-theme-lark @ckeditor/ckeditor5-typing @ckeditor/ckeditor5-upload

    4. webpack.config.js Setting
        - webpack: 웹을 구성하는 .js, .css, .jpg, .png 같은 static assets을 하나의 파일로 합쳐줌

        //webpack.config.js 34번째 줄에 소스 추가
        const { styles } = require('@ckeditor/ckeditor5-dev-utils');
        const CKEditorWebpackPlugin = require("@ckeditor/ckeditor5-dev-webpack-plugin");

        //webpack.config.js 467번째 줄에 소스 추가 (inputSource 검색)
        {
            test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
            use: [ 'raw-loader' ]
        },
        {
            test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
            use: [
                {
                    loader: 'style-loader',
                    options: {
                        injectType: 'singletonStyleTag',
                        attributes: {
                            'data-cke': true
                        }
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: styles.getPostCssConfig( {
                        themeImporter: {
                            themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
                        },
                        minify: true
                    } )
                }
            ]
        },

        //webpack.config.js 505번째 줄에 소스 추가 (cssRegex 검색)
        {
            test: cssRegex,
            exclude: [
                cssModuleRegex,
                /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
            ],
        }

        //webpack.config.js 527번째 줄에 소스 추가 (cssModuleRegex 검색)
        {
            test: cssModuleRegex,
            exclude: [
                /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
            ],
        }
        
        //webpack.config.js 585번째 줄에 소스 추가
        {
            loader: require.resolve( 'file-loader' ),
            // Exclude `js` files to keep the "css" loader working as it injects
            // its runtime that would otherwise be processed through the "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpack's internal loaders.
            exclude: [
                /\.(js|mjs|jsx|ts|tsx)$/,
                /\.html$/,
                /\.json$/,
                /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
                /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/
            ],
            options: {
                name: 'static/media/[name].[hash:8].[ext]',
            }
        }

    5. EdiotrConfig.js 파일 생성 및 소스 추가
        - 'https://www.ssaple.net/posts/5ef0b5c69e4ac10611c45a57' 참고

    6. UploadAdaper.js 파일 생성 및 소스 수정
        - 'https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/upload-adapter.html#the-complete-implementation' 참고

        _initRequest() { 
            const xhr = this.xhr = new XMLHttpRequest();
            xhr.open('POST', `http://localhost:7000/api/post/image`, true ); //여기 수정
            xhr.responseType = 'json';
        }   

        // funtcion MyCustomUploadAdapterPlugin -> My init(화살표 함수)
        const Myinit = ( editor ) => { //그냥 함수에서 화살표 함수로 수정
            editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
                return new MyUploadAdapter( loader );
            };
        }
        export default Myinit;
```
<br />

### 🔍 5. CKEditor5 사용 방법 변경
```javascript
    //변경 전
    import CKEditor from '@ckeditor/ckeditor5-react';
    
    //변경 후
    import { CKEditor } from '@ckeditor/ckeditor5-react';
```

<br />

```javascript
    //변경 전
    <CKEditor
        editor="(...)"
        data="(...)"
        onInit="(...)"
        onBlur="(...)"
    />

    //변경 후
    <CKEditor
        editor="(...)"
        data="(...)"
        onReady="(...)"
        onBlur="(...)"
    />
```

<br />

### 🔍 6. CKEditor5 Styling
```scss
        //CKEditor5 Setting
        .ck {
            .ck-editor {
                min-width: 100%;
            }
        }

        .ck-editor__editable {
            max-height: 80rem;
            min-height: 40rem;
            min-width: 100%;
        }

        .ck-editor__editable_inline {
            max-height: 80rem;
            min-height: 40rem;
            min-width: 100%;
        }
```
<br />

### 🔍 7. ProtectRoute 구현
```javascript
    export const EditProtectedRoute = ({component: Component, ...rest}) => {
        const {userId} = useSelector(state => state.auth);
        const {creatorId} = useSelector(state => state.post);
        return (
            <Route
                {...rest}
                render = {(props) => {
                    if(userId === creatorId) {
                        return <Component {...props} />
                    } else {
                        return (
                            <Redirect 
                                to={{
                                    pathname: "/",
                                    state: {
                                        from: props.location
                                    }
                                }}
                            />
                        )
                    }
                }}
            />
        )
    }
```

<br />

### 🔍 8. comment input value reset
```javascript
    1. useRef 사용
    const resetValue = useRef(null);

    2. input에다 Ref 넣기
    <Input
        innerRef={resetValue}
        type="textarea"
        name="contents"
        id="contents"
        onChange={onChange}
        placeholder="Comment"
    />

    3. resetValue.current.value 초기화 및 formValue()초기화
    const onSubmit = async e => {

        (...)

        resetValue.current.value = '';
        setformValue("");
    }
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
        const initialState = {
            token: localStorage.getItem('token'),
            isAuthenticated: null,
            isLoading: false,
            ...
        }

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
        import { combineReducers } from 'redux';
        import { connectRouter } from 'connected-react-router';
        import authReducer from './authReducer';
        import postReducer from './PostReducer';
        import commentReducer from './commentReducer';

        const createRootReducer = (history) => combineReducers({
            router: connectRouter(history),
            auth: authReducer,
            post: postReducer,
            comment: commentReducer,
        })

        export default createRootReducer;

    4. 📃 Saga 작성
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
        import { all, fork } from 'redux-saga/effects';
        import postSaga from './postSaga';
        import authSaga from './authSaga';
        import commentSaga from './commentSaga';

        export default function* rootSaga() {
            yield all([
                fork(authSaga),
                fork(postSaga),
                fork(commentSaga),
            ]);
        }

    6. 📃 dispatch로 액션 발생
        const handleToggle = () => {
            dispatch({
                type: CLEAR_ERROR_REQUEST,
            })
            setModal(!modal);
        };

```
