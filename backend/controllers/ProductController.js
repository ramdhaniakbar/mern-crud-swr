import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProducts = async (req, res) => {
	try {
		const response = await prisma.product.findMany({});
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getProductById = async (req, res) => {
	const id = Number(req.params.id);
	try {
		const response = await prisma.product.findUnique({
			where: { id },
		});
		res.status(200).json(response);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createProduct = async (req, res) => {
	const { name, price } = req.body;
	try {
		const product = await prisma.product.create({ data: { name, price } });
		res.status(201).json(product);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const updateProduct = async (req, res) => {
	const id = Number(req.params.id);
	const { name, price } = req.body;
	try {
		const product = await prisma.product.update({
			where: { id },
			data: { name, price },
		});
		res.status(200).json(product);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const deleteProduct = async (req, res) => {
	const id = Number(req.params.id);
	try {
		const product = await prisma.product.delete({
			where: { id },
		});
		res.status(200).json({
			message: `Product has been deleted with id ${product.id}`,
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
