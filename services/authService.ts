import { User } from '@prisma/client'
import axios from 'axios'
import { FieldValues } from 'react-hook-form'
import { MessageResponse } from '../interfaces/messageResponse.interface'

const register = async (data: FieldValues) => {
	return (await axios.post('/api/register', data))
		.data as MessageResponse<User>
}

export default { register }
