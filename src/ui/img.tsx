import Image from 'next/image'
import { getImage, getImageDimensions } from '@sanity/asset-utils'
import type { ImageProps } from 'next/image'

export default function ({ ...props }: ImageProps) {
	const { width, height } = getImageDimensions(props.src as unknown as string)

	return <Image width={width} height={height} {...props} />
}
