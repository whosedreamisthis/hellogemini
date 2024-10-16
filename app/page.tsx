'use client';
import { useState, useEffect } from 'react';
import { runAi, initAi } from '@/actions/ai';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

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

	useEffect(() => {
		initAi();
	}, []);

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
					{/* {loading ? (
							<div>Loading...</div>
						) : (
							
						)} */}

					{loading ? (
						<div>Loading...</div>
					) : (
						<ReactMarkdown>{response}</ReactMarkdown>
					)}
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
