import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

// ログアウト処理を行った際に呼び出される処理
// supabaseのSignout処理のAPIを呼び出してログアウト処理をする
// エラーが起きなければトップ（ルート）画面にリダイレクトする
export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const supabase = createRouteHandlerClient({ cookies });

  await supabase.auth.signOut();

  return NextResponse.redirect(requestUrl.origin + "/", {
    status: 301,
  });
}
