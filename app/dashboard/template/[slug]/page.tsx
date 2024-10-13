import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import template from '@/utils/template';
import Image from 'next/image';
import { Input } from '@/components/ui/textarea';
import { TextArea } from '@/components/ui/textarea';

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
	const t = template.find((item) => item.slug === params.slug) as Template;
	return <div>{JSON.stringify(params)}</div>;
	// return (
	// 	<div clasName="grid grid-cols-1 md:grid-cols:3 gap-5 px-5">
	// 		<div className="col-span-1 bg-slate-100 dark:bg-slate-900 rounded-md border p-5">
	// 			template info
	// 		</div>
	// 		<form className="mt-6" action="">
	// 			{t.form.map((item) => (
	// 				<div
	// 					key={item.slug}
	// 					className="my-2 flex flex-col gap-2 mb-7"
	// 				>
	// 					<label className="font-bold pb-5"> {item.label}</label>
	// 					{item.field === 'input' ? <Input /> : <TextArea />}
	// 				</div>
	// 			))}
	// 		</form>
	// 	</div>
	// );
}
