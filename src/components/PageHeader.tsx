import React from 'react'

interface Props {
	backgroundImage: string
	title?: string
	isFeatured?: boolean
	isUser?: boolean
	isCollection?: boolean
}

function PageHeader({ backgroundImage, title, isCollection, isFeatured, isUser }: Props) {
	return (
		<>
			<div className="flex items-start flex-col h-60 md:h-96 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
				{isCollection && (
					<div className="flex flex-col items-start space-y-3 md:space-y-5 w-full justify-end p-5 md:p-20 h-full text-center">
						{isFeatured && (
							<p className="text-xs md:text-base font-light text-white/75 uppercase px-2 py-1 md:px-3 md:py-1.5 rounded-full border border-white/75">
								Featured This Week
							</p>
						)}
						<h1 className="text-3xl md:text-7xl font-bold text-white">{title}</h1>
					</div>
				)}
			</div>
		</>
	)
}

export default PageHeader
