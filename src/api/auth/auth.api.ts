import { Response } from "@/types/Response.type";
import { client } from "..";
import { RefreshTokenData } from "./auth.data";
import { SignInDto, SignUpDto } from "./auth.dto";

async function signUp(dto: SignUpDto) {
  const response = await client.post("/users/sign-up", dto);
  console.log(response);
}

async function signIn(dto: SignInDto) {
  await client.post("/users/sign-in", dto);
}

async function signInKaKao(code: string) {
  await client.get(`/users/sign-in/kakao/callback?code=${code}`);
}

async function refreshToken() {
  const response = await client.get<Response<RefreshTokenData>>(
    `auth/refresh-token`
  );
  const data = response.data;

  if (!data.success) throw new Error(data.message);
}

const authAPI = {
  signUp,
  signIn,
  signInKaKao,
  refreshToken,
};

export default authAPI;
