import React from 'react'

interface Props {
	backgroundImage: string
	title: string
	isFeatured: boolean
}

function PageHeader({ backgroundImage, title, isFeatured }: Props) {
	return (
		<>
			<div className="flex items-start flex-col h-96 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
				<div className="flex flex-col items-start space-y-5 w-full justify-end p-20 h-full text-center">
					{isFeatured && <p className="text-base font-light text-white/75 uppercase px-3 py-1.5 rounded-full border border-white/75">Featured This Week</p>}
					<h1 className="text-7xl font-bold text-white">{title}</h1>
				</div>
			</div>
		</>
	)
}

export default PageHeader
