import React from "react";

// コンポーネントの場合
const Page: React.FC<PageProps> = () => {
  return (
    <>
      <h1>Hello, Next.js with TypeScript!</h1>
      {/* ここにページのコンテンツを追加 */}
    </>
  );
};

interface PageProps {
  // ここにコンポーネントで使用するプロパティを追加
  someArray: [];
}

// コンポーネントの場合
const Component: React.FC<PageProps> = ({ someArray }) => {
  return (
    <>
      <h1>Hello, Next.js with TypeScript!</h1>
      {/* ここにページのコンテンツを追加 */}
      {/* リスト表示の例 */}
      <ul>
        {someArray.map((param) => (
          <li key={"some unique key ex, param.id"}>
            <p>{param}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

// 2つの型を取る場合

type ArgType1 = {
  tasks: string;
  notices: string;
};

type ArgType2 = {
  renderType: string;
};

// ArgType1 | ArgType2でどちらか片方の型を指定（Union）
// ビルドエラーなどは出ないが表示されない
// プロパティは一つの中括弧にまとめないといけない
const Component2: React.FC<ArgType1 & ArgType2> = (
  { tasks, notices }: ArgType1,
  { renderType }: ArgType2
) => {
  return (
    <>
      <p className='mb-3 text-blue-500'>SSG</p>
      <p className='mb-3 text-blue-500'>{renderType}</p>
    </>
  );
};

// ArgType1 | ArgType2でどちらか片方の型を指定（Union）
// 同じ中括弧の中に書かないとだめ
// どうしても2つ以上の型を引き受ける場合、それぞれのプロパティの型を記述していたほうが良さそう
const Component3: React.FC<ArgType1 & { additionalString: string }> = ({
  tasks,
  notices,
  additionalString,
}: {
  tasks: string;
  notices: string;
  additionalString: string;
}) => {
  return (
    <>
      <p className='mb-3 text-blue-500'>SSG</p>
      <p className='mb-3 text-blue-500'>{tasks}</p>
    </>
  );
};

// 型の記述なしの場合
const Component4: React.FC<ArgType1 & { additionalString: string }> = ({
  tasks,
  notices,
  additionalString,
}) => {
  return (
    <>
      <p className='mb-3 text-blue-500'>SSG</p>
      <p className='mb-3 text-blue-500'>{tasks}</p>
    </>
  );
};

function AA({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <h1>My Page</h1>;
}

export default Page;
