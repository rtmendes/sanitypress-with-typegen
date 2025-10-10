import { getSite } from '@/sanity/lib/queries'
import SanityLink from './sanity-link'
import {
	FaFacebook,
	FaGithub,
	FaInstagram,
	FaLinkedinIn,
	FaTiktok,
	FaXTwitter,
	FaYoutube,
	FaLink,
} from 'react-icons/fa6'

export default async function (props: React.ComponentProps<'nav'>) {
	const site = await getSite()

	return (
		<nav {...props}>
			{site?.social?.items?.map((link) => {
				switch (link._type) {
					case 'link':
						const url = link.external

						return (
							<SanityLink
								link={link}
								className="text-current"
								aria-label={link.label || url}
								key={link._key}
							>
								{url?.includes('facebook.com') ? (
									<FaFacebook />
								) : url?.includes('instagram.com') ? (
									<FaInstagram />
								) : url?.includes('twitter.com') || url?.includes('x.com') ? (
									<FaXTwitter />
								) : url?.includes('youtube.com') ? (
									<FaYoutube />
								) : url?.includes('linkedin.com') ? (
									<FaLinkedinIn />
								) : url?.includes('tiktok.com') ? (
									<FaTiktok />
								) : url?.includes('github.com') ? (
									<FaGithub />
								) : (
									<FaLink />
								)}
							</SanityLink>
						)

					default:
						return null
				}
			})}
		</nav>
	)
}
