'use client';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { runAi } from '@/actions/ai';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import ReactMarkdown from 'react-markdown';
//import reactmarkdown
export default function Page() {
	const [response, setResponse] = useState('');
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState('');

	const handleClick = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		try {
			const data = await runAi(query);
			setResponse(data);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="m-5">
			<form onSubmit={handleClick}>
				<Input
					className="mb-5"
					placeholder="ask anything"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<Button>Generate with AI</Button>
			</form>

			<Card className="mt-5">
				<CardHeader>
					<h1>AI response</h1>
				</CardHeader>
				<CardContent>
					<ReactMarkdown>
						{/* {loading ? (
							<div>Loading...</div>
						) : (
							
						)} */}

						{loading ? 'Loading...' : response}
					</ReactMarkdown>
				</CardContent>
			</Card>
			{/* <Button onClick={handleClick}>Run AI</Button>
			<hr />
			<div>
				{loading ? (
					<Button disabled>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Please wait
					</Button>
				) : (
					response
				)}
			</div> */}
		</div>
	);
}
