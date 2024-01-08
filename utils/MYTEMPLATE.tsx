import React from "react";

interface PageProps {
  // ここにページのプロパティを追加
  someArray: [];
}

const Page: React.FC<PageProps> = ({ someArray }) => {
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

export default Page;
