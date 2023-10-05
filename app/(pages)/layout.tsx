import { Navbar } from '@/components/navigation/navbar'

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='w-full h-full px-4 pt-20'>
			<Navbar />
			{children}
		</div>
	)
}

export default PagesLayout
