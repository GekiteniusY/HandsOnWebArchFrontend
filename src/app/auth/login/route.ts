import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// ログインフォームに入力して、Submitするとこちらの処理が呼ばれる
// supabaseのSignin処理のAPIを呼び出してログイン処理を行う
// エラーなどが起きなければプロフィール画面にリダイレクトする
// TODO: ログイン処理時のエラーハンドリング
export async function POST(request: Request) {
  const requestUrl: URL = new URL(request.url);
  const formData: FormData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const supabase = createRouteHandlerClient({ cookies });

  await supabase.auth.signInWithPassword({ email, password });

  return NextResponse.redirect(requestUrl.origin + "/profile", {
    status: 301,
  });
}
