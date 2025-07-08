import Img from '@/ui/img'
import { PortableText, type PortableTextTypeComponentProps } from 'next-sanity'

export default function ({
	value: { figcaption, ...image },
}: PortableTextTypeComponentProps<any>) {
	console.log(image)

	return (
		<figure className="space-y-2 text-center">
			<Img className="mx-auto" image={image} alt={image.alt} />

			{figcaption && (
				<figcaption className="text-foreground/50 italic">
					<PortableText value={figcaption} />
				</figcaption>
			)}
		</figure>
	)
}
