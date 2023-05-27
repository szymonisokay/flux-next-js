import axios from 'axios'
import { FieldValues } from 'react-hook-form'
import { MessageResponse } from '../interfaces/messageResponse.interface'
import { User } from '@prisma/client'

const register = async (data: FieldValues) => {
	return (await axios.post('/api/register', data))
		.data as MessageResponse<User>
}

export default { register }
