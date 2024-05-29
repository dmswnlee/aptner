import Link from "next/link";
import { ReactNode } from 'react';
import { Post } from "@/interfaces/Post";
import { highlightText } from "@/utils/highlightText";

interface ListTitle {
  key: string;
  header: string;
  width: string;
}

interface ListProps {
  ListTitle: ListTitle[];
  data: Post[];
  detailPath: string;
  pinned?: boolean; //new
  highlightQuery?: string;
}

const ComList = ({ ListTitle, data, detailPath, pinned, highlightQuery }: ListProps) => {
  const renderCellContent = (key: string, item: Post): ReactNode => {
    switch (key) {
      case "title":
        return (
          <Link href={`${detailPath}/${item.id}`} className="hover:underline">
            {highlightQuery ? highlightText(item[key as keyof Post] as string, highlightQuery) : item[key as keyof Post] as string}
          </Link>
        );
      case "writer":
        return highlightQuery ? highlightText(item.writer?.nickname || '', highlightQuery) : item.writer?.nickname;
      case "category":
        return (
          <span className={item.isPin ? "text-red-500" : ""}>
            {item.isPin ? "중요글" : item.category?.name || "기타"}
          </span>
        );
      case "createdAt":
      case "updatedAt":
        return new Date(item[key as keyof Post] as string).toLocaleDateString();
      default:
        return item[key as keyof Post]?.toString();
    }
  };

  return (
    <div className={pinned ? "pinned-list" : ""}> 
      <table className="border border-solid border-gray_04 w-full">
        <thead>
          <tr>
            {ListTitle.map(list => (
              <th
                key={list.key}
                className={`${list.width} border border-solid border-gray_04 p-4 text-boardtab font-normal`}>
                {list.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              {ListTitle.map(list => (
                <td key={list.key} className="border border-solid border-gray_04 p-4 text-center">
                  {renderCellContent(list.key, item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComList;
