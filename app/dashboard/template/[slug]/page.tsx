'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import template from '@/utils/template';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { runAi } from '@/actions/ai';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import ReactMarkdown from 'react-markdown';
const Markdown = ({ content }: { content: string }) => {
	return (
		<div className="prose max-w-none">
			<ReactMarkdown
				remarkPlugins={[remarkMath]}
				rehypePlugins={[rehypeKatex]}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
};
export interface Template {
	name: string;
	slug: string;
	icon: string;
	desc: string;
	category: string;
	aiPrompt: string;
	form: Form[];
}

export interface Form {
	label: string;
	field: string;
	name: string;
	required: boolean;
}
export default function Page({ params }: { params: { slug: string } }) {
	const [query, setQuery] = useState('');
	const [content, setContent] = useState('');
	const [loading, setLoading] = useState(false);
	const t = template.find((item) => item.slug === params.slug) as Template;

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			const data = await runAi(t.aiPrompt + query);

			setContent(data);
		} catch (err) {
			setContent('An Error has occurred. Please try again.');
			console.log(err);
		} finally {
			setLoading(false);
		}

		console.log('submitted');
	};

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		e.preventDefault();
		console.log(e.target.value);
	};
	// return <div>{JSON.stringify(params)}</div>;
	return (
		<div className="grid grid-cols-1 md:grid-cols:3 gap-5 px-5">
			<div className="col-span-1 bg-slate-100 dark:bg-slate-900 rounded-md border p-5">
				<div className="flex flex-col gap-3">
					<Image src={t.icon} alt={t.name} width={50} height={50} />
					<h2 className="font-medium text-lg">{t.name}</h2>
					<p className="text-gray-500">{t.desc}</p>
				</div>
				<div>
					<form className="mt-6" onSubmit={handleSubmit}>
						{t.form.map((item) => (
							<div
								key={item.label}
								className="my-2 flex flex-col gap-2 mb-7"
							>
								<label className="font-bold pb-5">
									{item.label}
								</label>
								{item.field === 'input' ? (
									<Input
										name={item.name}
										onChange={(e) => {
											setQuery(e.target.value);
										}}
										required={item.required}
									/>
								) : (
									<Textarea
										name={item.name}
										onChange={(e) => {
											setQuery(e.target.value);
										}}
										required={item.required}
									/>
								)}
							</div>
						))}
						<Button
							type="submit"
							className="w-full py-6"
							disabled={loading}
						>
							{loading ? (
								<Loader2Icon className="animate-spin mr-2" />
							) : (
								'Generate Content'
							)}
						</Button>
					</form>
				</div>
				<div className="col-span-2">
					<Markdown content={content} />
				</div>
			</div>
		</div>
	);
}
