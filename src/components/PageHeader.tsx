import Image from 'next/image'
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
			<div className="flex items-start flex-col relative overflow-hidden z-0 h-60 lg:h-96 bg-cover bg-center bg-no-repeat">
				<div className="absolute top-0 left-0 h-60 lg:h-96 w-full">
					<Image src={backgroundImage} alt="background" fill objectFit="cover" />
				</div>
				{isCollection && (
					<div className="flex flex-col items-start space-y-3 lg:space-y-5 w-full justify-end relative z-10 p-5 lg:p-20 h-full text-center">
						{isFeatured && (
							<p className="text-xs lg:text-base font-light text-white/75 uppercase px-2 py-1 lg:px-3 lg:py-1.5 rounded-full border border-white/75">
								Featured This Week
							</p>
						)}
						<h1 className="text-3xl lg:text-7xl font-bold text-white">{title}</h1>
					</div>
				)}
			</div>
		</>
	)
}

export default PageHeader
