import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'
import { getImageDimensions } from '@sanity/asset-utils'
import Image from 'next/image'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type {
	SanityImageAsset,
	SanityImageCrop,
	SanityImageHotspot,
} from '@/sanity/types'
import type { ImageProps } from 'next/image'

const builder = imageUrlBuilder(client)
const urlFor = (source: SanityImageSource) => builder.image(source)

export default function ({
	image,
	...props
}: {
	image?: {
		asset: SanityImageAsset
		crop: SanityImageCrop
		hotspot: SanityImageHotspot
	}
} & Omit<ImageProps, 'src'>) {
	if (!image?.asset) return null

	const { dimensions, lqip } = image.asset.metadata ?? {}

	const { width, height } = getImageDimensions(image.asset)

	const src = urlFor(image)
		.withOptions({
			auto: 'format',
			q: 100,
		})
		.url()

	return (
		<Image
			src={src ?? image.asset.url!}
			{...calculateCroppedDimensions(
				dimensions?.width ?? width,
				dimensions?.height ?? height,
				image.crop,
			)}
			placeholder={lqip ? 'blur' : undefined}
			blurDataURL={lqip}
			priority={props.loading === 'eager'}
			{...props}
		/>
	)
}

function calculateCroppedDimensions(
	originalWidth: number,
	originalHeight: number,
	crop?: SanityImageCrop,
) {
	if (!crop) {
		return { width: originalWidth, height: originalHeight }
	}

	const { top = 0, bottom = 0, left = 0, right = 0 } = crop

	return {
		width: Math.round(originalWidth * (1 - left - right)),
		height: Math.round(originalHeight * (1 - top - bottom)),
	}
}
