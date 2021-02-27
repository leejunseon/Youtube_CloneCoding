import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

const app = express();

app.set("view engine", "pug");
//cookie를 전달받아 사용할 수 있도록 만들어줌 -> 사용자 인증에서 사용
app.use(cookieParser());
//사용자가 웹사이트로 전달하는 정보들을 검사함.
app.use(bodyParser.json()); //request정보에서 json형태로 된 body를 검사
app.use(bodyParser.urlencoded({ extended: true })); //request정보에서 form형태로 된 body를 검사
app.use(helmet()); //application이 더 안전하도록 만들어줌.
app.use(morgan("dev")); //application에서 발생하는 모든 일들을 logging

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
