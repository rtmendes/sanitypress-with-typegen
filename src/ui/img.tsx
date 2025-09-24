import { getImageDimensions } from '@sanity/asset-utils'
import Image from 'next/image'
import type {
	SanityImageAsset,
	SanityImageCrop,
	SanityImageHotspot,
} from '@/sanity/types'
import { stegaClean } from 'next-sanity'
import { urlFor } from '@/sanity/lib/image'
import type { ImageProps } from 'next/image'

export default function ({
	image,
	...props
}: {
	image?:
		| {
				asset: SanityImageAsset
				crop?: SanityImageCrop
				hotspot?: SanityImageHotspot
		  }
		| any
} & Omit<ImageProps, 'src'>) {
	if (!image?.asset) return null

	const { dimensions, lqip } = image.asset.metadata ?? {}
	const { width, height } = getImageDimensions(image.asset)
	const loading = props.loading || stegaClean(image.loading)

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
			loading={loading}
			priority={loading === 'eager'}
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
