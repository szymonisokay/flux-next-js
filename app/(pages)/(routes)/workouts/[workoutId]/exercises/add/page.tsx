import { redirect } from 'next/navigation'

import { ExerciseCard } from '@/components/exercise/exercise-card'
import { Pagination } from '@/components/pagination'
import { getProfile } from '@/lib/get-profile'
import { prisma } from '@/lib/prisma'

import { MetaData } from './_components/meta-data'

type Params = {
	searchParams: {
		bodyPart?: string
		equpiment?: string
		target?: string
		query?: string
		page?: string
	}
}

const PAGE_SIZE = 10

const AddExercisePage = async ({ searchParams }: Params) => {
	const profile = await getProfile()

	if (!profile) {
		return redirect('/')
	}

	const { query, page, ...params } = searchParams

	const currentPage = Number(page) || 1
	const skip = Math.floor((currentPage - 1) * PAGE_SIZE)

	const exercises = await prisma.exercise.findMany({
		where: {
			...params,

			name: {
				contains: query,
				mode: 'insensitive',
			},
		},
		take: PAGE_SIZE,
		skip,
	})

	const total = await prisma.exercise.count({
		where: {
			...params,
			name: {
				contains: query,
				mode: 'insensitive',
			},
		},
	})

	return (
		<>
			<MetaData total={total} />

			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
				{exercises.map((exercise) => (
					<ExerciseCard key={exercise.id} exercise={exercise} />
				))}
			</div>

			{!!total && <Pagination total={total} pageSize={PAGE_SIZE} />}
		</>
	)
}

export default AddExercisePage
