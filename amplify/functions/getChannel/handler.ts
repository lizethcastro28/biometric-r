import { APIGatewayProxyHandler } from 'aws-lambda';
import { createSuccessResponse, createErrorResponse } from '../../utils/responses';

const getChannelUrl = (circuit: string, dana?: string) => {
  // Definir la URL base con un marcador de posición para el circuito
  const baseUrl = process.env.API_BASE_URL || "https://biometric.integrationlayer.com/api/v1/biometric/internal/get_channel/{circuit}";
  
  // Reemplazar el marcador de posición {circuit} con el valor real
  const url = baseUrl.replace("{circuit}", circuit);
  console.log(`URL construida para el canal: ${url}`);

  // Si 'dana' es proporcionado, agregarlo como parámetro de consulta
  if (dana) {
    const separator = url.includes('?') ? '&' : '?';  // Determinar si ya hay parámetros de consulta
    console.log(`Parámetro 'dana' encontrado. Agregando a la URL: ${dana}`);
    return `${url}${separator}dana=${dana}`;
  }

  return url;
};

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    // Obtener parámetros del evento
    const circuit = event?.queryStringParameters?.circuit;
    const dana = event?.queryStringParameters?.dana;

    console.log(`Parámetro 'circuit' recibido: ${circuit}`);
    console.log(`Parámetro 'dana' recibido: ${dana}`);

    // Validar que el parámetro 'circuit' esté presente
    if (!circuit) {
      console.error('Error: El parámetro "circuit" es obligatorio.');
      return createErrorResponse(400, 'El parámetro "circuit" es obligatorio.');
    }

    // Construir la URL con los parámetros
    const apiUrl = getChannelUrl(circuit, dana);
    console.log(`URL construida: ${apiUrl}`);

    // Obtener el token de autenticación (esto se debe manejar adecuadamente en producción)
    const bearerToken = "eyJraWQiOiJkYW5ha2V5IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI0ZWU4cjl1aG9qYzlram1mbW5uaTlxcGVwbyIsImF1ZCI6IjRlZThyOXVob2pjOWtqbWZtbm5pOXFwZXBvIiwibmJmIjoxNzQ1ODkyNTQ0LCJpc3MiOiJodHRwczovL2F1dGguZGFuYWNvbm5lY3QtcWEuY29tIiwiZXhwIjoxNzQ1ODk0MzQ0LCJpYXQiOjE3NDU4OTI1NDQsImp0aSI6IjM3YzE4NWIxLTFlOGEtNGI5My1hOTlhLTg3YWIwZWZjZTZkNCIsImRhbmEiOnsiaWR1c2VyIjoiODMiLCJpZGNvbXBhbnkiOiJ2ZW50dXJlc3RhcnMiLCJpZGNsaWVudGUiOiIxIiwidXNlciI6ImdhdGV3YXkifX0.sHMIaUCJPhdKTK_gMlcAz6qk9OQsJpWFF5pXH3gVSwuDJh-swfhmcWlVTTXJEKKtWvP8hPHVrXvPoipycC2UDKIlUrkfeImyH6P9eDt-_54GdaR0QdTr7hKDF2JVIkTsdIoxN_dBfVJGnk_dVdA9uMiT2XXshNWe16juOl7WMQwHJxp6hXoNyu1LJzZZzB5jnfrSdjAhPfYeI3Mdw3un5Ho3utTszNvnjvwpGRC_IhWwnazayJg340yaXaEZqUemJFgEuotD6fS4Jo3pO1o0jBMAncSfU2nTungKDjbT2CcbEX6pUyvaj_vW_AUblMgkwRvFZIGaypdCVpkYe-ar9Q";
    if (!bearerToken) {
      console.error('Error: No se ha configurado el token de autenticación.');
      return createErrorResponse(500, 'No se ha configurado el token de autenticación.');
    }

    // Realizar la solicitud (fetch a API externa) con token Bearer
    console.log('Realizando solicitud GET a la API externa...');
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      }
    });

    // Comprobar la respuesta
    if (!response.ok) {
      console.error(`Error al obtener los datos del canal. Código de respuesta: ${response.status}`);
      return createErrorResponse(response.status, 'Error al obtener los datos del canal.');
    }

    // Procesar la respuesta
    const data = await response.json();
    console.log('Datos obtenidos de la API:', data);

    // Devolver respuesta exitosa
    return createSuccessResponse(200, data);
  } catch (error) {
    // Manejo de errores
    console.error('Error en Lambda:', error);
    return createErrorResponse(500, 'Error interno del servidor.');
  }
};
