import { Navbar } from '@/components/navigation/navbar'

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex flex-col w-full h-full px-4 pt-20 pb-4 overflow-y-auto'>
			<Navbar />

			{children}
		</div>
	)
}

export default PagesLayout
