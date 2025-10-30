import { getImageDimensions } from '@sanity/asset-utils'
import type { ImageUrlBuilderOptionsWithAliases } from '@sanity/image-url/lib/types/types'
import { stegaClean } from 'next-sanity'
import Image, { type ImageProps } from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type {
	SanityImageAsset,
	SanityImageCrop,
	SanityImageHotspot,
} from '@/sanity/types'

export default function ({
	image,
	width,
	height,
	imageOptions,
	...props
}: {
	image?:
		| {
				asset: SanityImageAsset
				crop?: SanityImageCrop
				hotspot?: SanityImageHotspot
		  }
		| any
	imageOptions?: Partial<ImageUrlBuilderOptionsWithAliases>
} & Omit<ImageProps, 'src'>) {
	if (!image?.asset) return null

	const { lqip } = image.asset.metadata ?? {}

	const dimensions = getImageDimensions(image)
	const [w, h] = [
		(image.hotspot?.width ?? 1) * dimensions.width,
		(image.hotspot?.height ?? 1) * dimensions.height,
	]

	const loading = stegaClean(props.loading || image.loading)

	return (
		<Image
			src={
				urlFor(image)
					.withOptions({ auto: 'format', q: 100, ...imageOptions })
					.url() ?? image.asset.url!
			}
			width={width ?? Math.round(height ? (Number(height) * w) / h : w)}
			height={height ?? Math.round(width ? (Number(width) * h) / w : h)}
			loading={loading}
			{...(loading === 'eager'
				? { priority: true, fetchPriority: 'high' }
				: {})}
			placeholder={lqip ? 'blur' : undefined}
			blurDataURL={lqip}
			{...props}
		/>
	)
}
