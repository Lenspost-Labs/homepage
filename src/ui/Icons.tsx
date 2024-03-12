import Image from 'next/image'

export const CheckMarkIcon = ({ size = 24, color = 'currentColor', className }: { size?: number; color?: string; className?: string }) => {
	return (
		<div className={className}>
			<Image src="/checkmark.svg" alt="checkmark" fill />
		</div>
	)
}
