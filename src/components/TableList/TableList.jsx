import './TableList.scss'


export default function TableList({ users, onDelete }) {


	if (!users) {
		return <h1>Loading...</h1>
	}

	return (
		<tbody>

			{users.map((user, index) => {
				return (
					<tr key={index}>
						<td>{user.name}</td>
						<td>{user.email}</td>
						<td>{user.phone}</td>
						<td>{user.dob}</td>
						<td>
							<button onClick={() => onDelete(index)}>Delete</button>
						</td>
					</tr>
				)
			})}

		</tbody>
	)
}