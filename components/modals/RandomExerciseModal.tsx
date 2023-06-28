import { Label } from '@radix-ui/react-label'
import useRandomExerciseModal from '../../hooks/useRandomExerciseModal'
import { Button } from '../ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card'
import { Input } from '../ui/input'
import Modal from './Modal'

interface RandomExerciseModalProps {
	onGenerateRandomExercise: (rowId: string, exerciseId: string) => void
}

const RandomExerciseModal: React.FC<RandomExerciseModalProps> = ({}) => {
	const { isOpen, onClose, rowId } = useRandomExerciseModal()

	return (
		<Modal isOpen={isOpen} onClose={onClose} title='Random exercise'>
			{/* <div>
				<p className='text-lg font-semibold'>
					Generate random exercise
				</p>
				<div>

				</div>
			</div> */}
			<Card>
				<CardHeader>
					<CardTitle>Random exercise</CardTitle>
					<CardDescription>
						Generate next exercise for your workout
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className='grid items-center w-full gap-4'>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='name'>Name</Label>
								<Input
									id='name'
									placeholder='Name of your project'
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='name'>Framework</Label>
								{/* <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </SelectTrigger>
              </Select> */}
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className='flex justify-between'>
					<Button variant='outline'>Cancel</Button>
					<Button>Deploy</Button>
				</CardFooter>
			</Card>
		</Modal>
	)
}

export default RandomExerciseModal
