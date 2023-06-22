import { Input } from '../ui/input'

interface SearchBarProps {
	value?: string
	onChange: (value: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange, value }) => {
	return <Input value={value} onChange={(e) => onChange(e.target.value)} />
}

export default SearchBar
