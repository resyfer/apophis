import { RGB } from "./rgb.js";
interface ReqRes {
    ok: boolean;
    message: any;
    username?: string;
    rgb?: RGB;
}
export { ReqRes };
