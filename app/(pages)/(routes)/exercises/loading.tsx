import { ClipLoader } from 'react-spinners'

const Loading = () => {
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<ClipLoader size={40} />
		</div>
	)
}

export default Loading
