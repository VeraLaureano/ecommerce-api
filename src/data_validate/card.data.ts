import { ObjectId } from 'mongodb';
import { body, param } from 'express-validator';

// router.post('/cards', validateCardData, handleValidationErrors, createCard);

export const validateCardId = [
  param('id')
    .custom((value) => ObjectId.isValid(value))
    .withMessage('Invalid card ID format'), 
];

export const validateCardData = [
  body('name')
    .isString().withMessage('Name must be a string')
    .notEmpty().withMessage('Name is required')
    .trim(),
  body('description')
    .isString().withMessage('Description must be a string')
    .notEmpty().withMessage('Description is required')
    .trim(),
  body('price')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number')
    .notEmpty().withMessage('Price is required'),
  body('imageUrl')
    .isURL().withMessage('Image URL must be a valid URL')
    .notEmpty().withMessage('Image URL is required'),
  body('available')
    .isBoolean().withMessage('Available must be a boolean')
    .notEmpty().withMessage('Availability status is required'),
];