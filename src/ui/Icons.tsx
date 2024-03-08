import Image from 'next/image'

export const CheckMarkIcon = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => {
	return <Image src="/checkmark.svg" alt="checkmark" width={size} height={size} color={color} />
}
