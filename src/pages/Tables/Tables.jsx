import { useState, useEffect } from 'react'
import './Tables.scss'
import axios from 'axios'
import TableList from '../../components/TableList/TableList';
import TableForm from '../../components/TableForm/TableForm';


export default function Tables() {
	const [users, setUsers] = useState();
	const [newUser, setNewUser] = useState({
		name: '',
		email: '',
		phone: '',
		dob: '',
	});
	const [errors, setErrors] = useState({ name: '', email: '', phone: '', dob: '' });


	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get(`http://127.0.0.1:8000/api/tabledata/`);
				setUsers(data.tabledata);
			}
			catch (error) {
				console.error(error);
			}
		}
		fetchData();

	}, [])


	const validateForm = (value, type) => {
		if (type === 'name') {
			return value.trim() === "" ? "Name is required" : "";
		} else if (type === 'email') {
			const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
			return emailRegex.test(value) ? "" : "Invalid email address";
		} else if (type === 'phone') {
			const phoneRegex = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
			return phoneRegex.test(value) || value === "" ? "" : "Invalid phone number";
		} else {
			return value === "" ? "Date of Birth is required" : "";
		}
	}


	const handleInputChange = (e) => {
		const { name, value } = e.target;
		let validationError = '';

		switch (
		name
		) {
			case "name":
				validationError = validateForm(value, 'name');
				break;
			case "email":
				validationError = validateForm(value, 'email');
				break;
			case "phone":
				validationError = validateForm(value, 'phone');
				break;
			case "dob":
				validationError = validateForm(value, 'dob');
				break;
			default:
				break;
		}

		setErrors({ ...errors, [name]: validationError })
		setNewUser({ ...newUser, [name]: value });
		console.log(errors);
	}


	const addUser = () => {
		if (newUser.dob === '') {
			console.log("dob is empty");
			let validationError = validateForm(newUser.dob, 'dob');

			setErrors({ ...errors, dob: validationError });
		} else {
			setUsers((previous) => [...previous, newUser]);
			setNewUser({ name: "", email: "", phone: "", dob: "" });
		}
	}


	const deleteEntry = (index) => {
		setUsers(users.filter((user, i) => i !== index));
	}


	const addButtonDisabled =
		newUser.name === '' ||
		newUser.email === '' ||
		newUser.phone === '' ||
		errors.name !== '' ||
		errors.email !== '' ||
		errors.phone !== '' ||
		errors.dob !== '';



	return (
		<main>
			<h1>Tables</h1>

			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th>Birthdate</th>
						<th>Delete</th>
					</tr>
				</thead>

				<TableList users={users} onDelete={deleteEntry} />

				<TableForm
					onSubmit={addUser}
					onChange={handleInputChange}
					newUser={newUser}
					addButtonDisabled={addButtonDisabled}
					errors={errors}
				/>
			</table>


		</main>
	)
}