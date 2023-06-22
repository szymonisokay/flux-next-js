import { useCallback, useRef } from 'react'

interface VideoProps {
	src: string
	controls?: boolean
}

const Video: React.FC<VideoProps> = ({ src, controls }) => {
	const videoRef = useRef<HTMLVideoElement>(null)

	const playVideo = useCallback(() => {
		const video = videoRef.current

		if (!video) return

		video.paused ? video.play() : video.pause()
	}, [])

	return (
		<video
			className='rounded-md'
			controls={controls}
			ref={videoRef}
			onClick={playVideo}
		>
			<source src={src} />
		</video>
	)
}

export default Video
