import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');

	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		const getProductById = async () => {
			const response = await axios.get(
				`http://localhost:5000/products/${id}`
			);
			setName(response.data.name);
			setPrice(response.data.price);
		};

		getProductById();
	}, [id]);

	const updateProduct = async (e) => {
		e.preventDefault();

		await axios.patch(`http://localhost:5000/products/${id}`, {
			name,
			price: parseInt(price),
		});

		navigate('/');
	};

	return (
		<div className='max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
			<form onSubmit={updateProduct} className='my-10'>
				<div className='flex flex-col'>
					<div className='mb-5'>
						<label htmlFor='name' className='font-bold'>
							Product Name
						</label>
						<input
							type='text'
							name='name'
							id='name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							className='w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow'
							placeholder='Product Name'
						/>
					</div>
					<div className='mb-5'>
						<label htmlFor='price' className='font-bold'>
							Product Price
						</label>
						<input
							type='text'
							name='price'
							id='price'
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							className='w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow'
							placeholder='Product Price'
						/>
					</div>
					<button
						type='submit'
						className='w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow'
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditProduct;
