import { NextRequest, NextResponse } from "next/server";

// ユーザー登録後に送られてくるメールアドレス上の確認URLにアクセスしたときに発火
// トップページにリダイレクトさせる
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);

  console.log(requestUrl.origin);
  return NextResponse.redirect(requestUrl.origin + "/");
}
