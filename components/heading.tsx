'use client'

type Props = {
	title: string
	description?: string
}

export const Heading = ({ title, description }: Props) => {
	return (
		<div className='max-w-[170px]'>
			<h2
				title={title}
				className='text-lg font-semibold leading-tight tracking-tight'
			>
				{title}
			</h2>
			<p
				title={description}
				className='text-sm leading-normal tracking-tight truncate text-secondary'
			>
				{description}
			</p>
		</div>
	)
}
