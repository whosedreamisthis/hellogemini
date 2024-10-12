import SideNav from '@/components/nav/side-nav';
import React from 'react';

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="grid grid-cols-4 gap4">
			<div className="col-span-1">
				<SideNav />
			</div>
			<div className="col-span-3">
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
					aut minus impedit, magni eos animi maxime pariatur quos
					vitae, ea unde quidem. Aperiam maxime optio, nesciunt fugiat
					ad autem alias?
				</p>
			</div>
		</div>
	);
}
