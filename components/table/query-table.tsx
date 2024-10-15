import React from 'react';
import { Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';
interface QueryResponse {
	_id: string;
	template: any;
	email: string;
	query: string;
	content: string;
	createdAt: string;
	updatedAt: string;
}

interface Props {
	data: QueryResponse[];
}

const wordCount = (text: string): number => {
	return text.split(' ').length;
};
const QueryTable: React.FC<Props> = ({ data }) => {
	const handleCopy = (text: string) => {
		navigator.clipboard.writeText(text);
		toast.success('Copied to clipboard');
	};
	return (
		<div className="overflow-x-auto">
			<table className="min-w-full bg-white dark:bg-gray-800 text-sm">
				<thead>
					<tr>
						<th className="py-2 px-4 text-left">TEMPLATE</th>
						<th className="py-2 px-4 text-left">QUERY</th>
						<th className="py-2 px-4 text-left">DATE</th>
						<th className="py-2 px-4 text-left">WORDS</th>
						<th className="py-2 px-4 text-left">COPY</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item) => {
						return (
							<tr
								key={item._id}
								className="hover:bg-gray-100 dark:bg-gray-700"
							>
								<td className="py-2 px-4 border-b">
									<div className="flex">
										<Image
											src={item.template.icon}
											alt="icon"
											width={20}
											height={20}
										/>
										<div className="ml-2">
											{item.template.name}
										</div>
									</div>
								</td>
								<td className="py-2 px-4 border-b line-clamp-2">
									{item.query}
								</td>
								<td className="py-2 px-4 border-b">
									{new Date(
										item.createdAt
									).toLocaleDateString()}
								</td>
								<td className="py-2 px-4 border-b">
									{wordCount(item.content)}
								</td>
								<td className="py-2 px-4 border-b">
									<button
										className="flex items-center"
										onClick={() => {
											handleCopy(item.content);
										}}
									>
										<Copy className="h-5 w-5 text-gray-500 dark: text-gray-300" />{' '}
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default QueryTable;
