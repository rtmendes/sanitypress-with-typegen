import type { PreviewProps } from 'sanity'
import { Badge, Box, Flex } from '@sanity/ui'
import { VscEyeClosed } from 'react-icons/vsc'

export default function (props: PreviewProps & { hidden?: boolean }) {
	return (
		<Flex align="center">
			<Box flex={1}>{props.renderDefault(props)}</Box>

			{props.hidden && (
				<Badge tone="neutral" padding={2} marginRight={2} title="Hidden">
					<VscEyeClosed />
				</Badge>
			)}
		</Flex>
	)
}
