import { APIGatewayProxyResult } from 'aws-lambda';

// Definir los encabezados comunes
const DEFAULT_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
};

export const createSuccessResponse = (statusCode: number, body: any): APIGatewayProxyResult => ({
    statusCode,
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(body),
});

export const createErrorResponse = (statusCode: number, message: string): APIGatewayProxyResult => ({
    statusCode,
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ error: message }),
});
