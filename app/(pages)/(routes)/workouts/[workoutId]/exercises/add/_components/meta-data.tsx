'use client'

type Props = {
	total: number
}

export const MetaData = ({ total }: Props) => {
	return (
		<div className='flex pb-2'>
			<span className='text-sm'>Total: {total}</span>
		</div>
	)
}
