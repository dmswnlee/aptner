import Link from "next/link";
import { highlightText } from "@/utils/highlightText";

interface ListTitle {
	key: string;
	header: string;
	width: string;
}

interface ListProps {
	ListTitle: ListTitle[];
	data: any[];
	detailPath: string;
	highlightQuery?: string;
}

const List = ({ ListTitle, data, detailPath, highlightQuery }: ListProps) => {
	return (
		<div>
			<table className="border border-solid border-gray_04">
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
									{list.key === "title" ? (
										<Link href={`${detailPath}/${item.id}`} className="hover:underline">
											{highlightQuery ? highlightText(item[list.key], highlightQuery) : item[list.key]}
										</Link>
									) : list.key === "author" ? (
                    highlightQuery ? highlightText(item[list.key], highlightQuery) : item[list.key]
									) : list.key === "category" ? (
										<span className={item.isPin ? "text-red-500" : ""}>
											{item.isPin ? "중요글" : item.category}
										</span>
									) : (
										item[list.key]
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default List;
