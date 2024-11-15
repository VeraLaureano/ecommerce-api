import { Response } from "express"; // Importing Response type from express for type definition
import { AuthenticatedRequest } from "../interfaces/AuthRequest.interface"; // Custom interface for authenticated requests
import { asyncWrapper } from "../utils/asyncWrapper"; // Utility to handle asynchronous functions with try-catch
import { CREATED, EVERYTHING_OK, INTERNAL_SERVER_ERROR, NOT_FOUND } from "../config/statusCode"; // HTTP status codes from a config file
import { findAllCards, findOneCard, createCard, findAndUpdateCard, findAndDeleteCard } from "../services/card.service"; // Service functions for card operations
import { cleanXSS } from "../utils/sanitize"; // Function to clean XSS vulnerabilities in text inputs
import { ICard } from "../interfaces/Card.interface"; // Interface for card object
import { logError } from "../utils/loggers"; // Function for logging errors

// Handler for fetching all cards
export const getAllCards = asyncWrapper(async (_req: AuthenticatedRequest, res: Response) => {
  // Fetching all cards from the database
  const cards = await findAllCards();
  // Sending the response with status 200 (Everything OK) and the data
  return res.status(EVERYTHING_OK).json(cards);
})

// Handler for fetching a single card by ID
export const getOneCard = asyncWrapper(async ({ params: { id } }: AuthenticatedRequest, res: Response) => {
  // Sanitize the ID to prevent XSS injections
  const sanitizedId: string = cleanXSS(id);

  // Fetching the card by sanitized ID
  const card = await findOneCard(sanitizedId);

  // If the card is not found, return a 404 response
  if (!card)
    return res.status(NOT_FOUND).json('NOT_FOUND_CARD_WITH_THIS_ID')

  // If the card is found, return the card data with status 200
  return res.status(EVERYTHING_OK).json(card);
})

// Handler for creating a new card
export const postCard = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Extracting data from the request body (card details)
    const { name, description, price, imageUrl, available } = req.body;

    // Sanitizing the input data to prevent XSS attacks
    const sanitizedName = cleanXSS(name);
    const sanitizedDescription = cleanXSS(description);
    const sanitizedImageUrl = cleanXSS(imageUrl);

    // Creating a new card object with sanitized data
    const newCard: ICard = {
      name: sanitizedName,
      description: sanitizedDescription,
      price,
      imageUrl: sanitizedImageUrl,
      available,
    };

    // Calling the service function to save the new card in the database
    const createdCard = await createCard(newCard);

    // Returning a response with status 201 (Created) and the created card data
    return res.status(CREATED).json({ message: 'Card created successfully', card: createdCard });
  } catch (error) {
    // Catching any errors, logging them, and returning a 500 response (Internal Server Error)
    logError(error);
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

// Handler for updating an existing card
export const patchCard = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Extracting the card ID from the request parameters
    const { params: { id } } = req;
    
    // Sanitizing the ID to prevent XSS attacks
    const sanitizedId: string = cleanXSS(id);

    // Finding the card by ID to ensure it exists before updating
    const card = await findOneCard(sanitizedId);
    if (!card) {
      // If the card does not exist, return a 404 response
      return res.status(NOT_FOUND).json({ message: 'Card not found' });
    }

    // Extracting the updated card data from the request body
    const { name, description, price, imageUrl, available }: ICard = req.body;

    // Sanitizing the updated fields to prevent XSS attacks
    const sanitizedName: string = cleanXSS(name);
    const sanitizedDescription: string = cleanXSS(description);
    const sanitizedImageUrl: string = cleanXSS(imageUrl);

    // Creating an updated card object
    const updatedData: ICard = {
      name: sanitizedName,
      description: sanitizedDescription,
      price,
      imageUrl: sanitizedImageUrl,
      available,
    };

    // Calling the service function to update the card in the database
    const updatedCard = await findAndUpdateCard(id, updatedData);

    // Returning a response with status 200 (Everything OK) and the updated card data
    return res.status(EVERYTHING_OK).json({ message: 'Card updated successfully', card: updatedCard });
  } catch (error) {
    // Catching any errors, logging them, and returning a 500 response (Internal Server Error)
    logError(error);
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

// Handler for deleting a card
export const deleteCard = async ({ params: { id } }: AuthenticatedRequest, res: Response) => {
  try {
    // Sanitizing the card ID to prevent XSS attacks
    const sanitizedId: string = cleanXSS(id);

    // Checking if the card exists
    const card = await findOneCard(sanitizedId);
    
    if (!card)
      // If the card does not exist, return a 404 response
      return res.status(NOT_FOUND).json({ message: 'Card not found' });

    // Calling the service function to delete the card from the database
    await findAndDeleteCard(sanitizedId);

    // Returning a response with status 200 (Everything OK) and a success message
    return res.status(EVERYTHING_OK).json({ message: 'Card deleted successfully' });
  } catch (error) {
    // Catching any errors, logging them, and returning a 500 response (Internal Server Error)
    logError(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
