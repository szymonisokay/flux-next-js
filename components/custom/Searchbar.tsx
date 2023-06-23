import { Input } from '../ui/input'

interface SearchBarProps {
	value?: string
	disabled?: boolean
	onChange: (value: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange, value, disabled }) => {
	return (
		<div className='h-10 min-h-10 max-h-10'>
			<Input
				disabled={disabled}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	)
}

export default SearchBar
