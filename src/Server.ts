import { join } from "path";
import { Configuration, Inject } from "@tsed/di";
import { PlatformApplication } from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/ajv";
import "@tsed/swagger";
import { config } from "./config/index";
import * as rest from "./controllers/rest/index";
import * as users from "./controllers/users/index";
import * as auth from "./controllers/auth/index";
import * as pages from "./controllers/pages/index";
import * as pRecord from "./controllers/patientRecords/index";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import methodOverride from "method-override";
import "./controllers/auth/protocols/BasicProtocol";
import "./controllers/auth/protocols/JWTProtocol";

@Configuration({
  passport: {
    /**
     * Set a custom user info model. By default Ts.ED use UserInfo. Set false to disable Ts.ED json-mapper.
     */
    // userInfoModel: CustomUserInfoModel
    // userProperty: string,
    // pauseStream: string,
    // disableSession: boolean
  },
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  disableComponentsScan: true,
  mount: {
    "/rest": [...Object.values(auth), ...Object.values(rest), ...Object.values(users), ...Object.values(pRecord)],
    "/": [...Object.values(pages)]
  },
  swagger: [
    {
      path: "/doc",
      specVersion: "3.0.1"
    }
  ],
  middlewares: [
    "cors",
    "cookie-parser",
    "compression",
    "method-override",
    "json-parser",
    "express-session",
    { use: "urlencoded-parser", options: { extended: true } }
  ],
  views: {
    root: join(process.cwd(), "../views"),
    extensions: {
      ejs: "ejs"
    }
  },
  exclude: ["**/*.spec.ts"]
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;

  $beforeRoutesInit() {
    this.app
      .use(cookieParser())
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true
        })
      )
      .use(
        session({
          secret: "mysecretkey",
          resave: true,
          saveUninitialized: true,
          // maxAge: 36000,
          cookie: {
            path: "/",
            httpOnly: true,
            secure: true
          }
        })
      );
  }
}
