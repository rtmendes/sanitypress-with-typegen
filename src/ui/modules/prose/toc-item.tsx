'use client'

import { useRef, useEffect, useState } from 'react'
import { cn, slug } from '@/lib/utils'
import css from './toc-item.module.css'

export default function ({
	heading,
}: {
	heading: {
		style: string | null
		text: string | null
	}
}) {
	if (!heading.text) return null

	const ref = useRef<HTMLLIElement>(null)
	const [windowHalfHeight, setWindowHalfHeight] = useState(0)

	// update window height
	useEffect(() => {
		const updateWindowHalfHeight = () => {
			setWindowHalfHeight(window.innerHeight / 2)
		}
		updateWindowHalfHeight()

		window.addEventListener('resize', updateWindowHalfHeight)
		return () => window.removeEventListener('resize', updateWindowHalfHeight)
	}, [])

	// add className when heading is in view
	useEffect(() => {
		if (typeof document === 'undefined' || !ref.current || !heading.text) return

		const target = ref.current
			.closest('[data-module="prose"]')
			?.querySelector(`#${slug(heading.text)}`)!

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						ref.current?.classList.add(css.inView)
					} else {
						ref.current?.classList.remove(css.inView)
					}
				})
			},
			{
				threshold: 1,
				rootMargin: `${document.documentElement.scrollHeight}px 0px -${windowHalfHeight}px 0px`,
			},
		)

		if (target) observer.observe(target)
		return () => observer.disconnect()
	}, [heading, windowHalfHeight])

	return (
		<li ref={ref}>
			<a
				href={`#${slug(heading.text)}`}
				className={cn('link block py-1 leading-tight', {
					'pl-[1ch]': heading.style === 'h3',
					'pl-[2ch]': heading.style === 'h4',
					'pl-[3ch]': heading.style === 'h5',
					'pl-[4ch]': heading.style === 'h6',
				})}
			>
				{heading.text}
			</a>
		</li>
	)
}
