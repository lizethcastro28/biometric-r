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
    const bearerToken = "eyJraWQiOiJkYW5ha2V5IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI0ZWU4cjl1aG9qYzlram1mbW5uaTlxcGVwbyIsImF1ZCI6IjRlZThyOXVob2pjOWtqbWZtbm5pOXFwZXBvIiwibmJmIjoxNzQ1ODg5ODkwLCJpc3MiOiJodHRwczovL2F1dGguZGFuYWNvbm5lY3QtcWEuY29tIiwiZXhwIjoxNzQ1ODkxNjkwLCJpYXQiOjE3NDU4ODk4OTAsImp0aSI6ImQ4NWIzMTU1LTAyOGQtNDEyNi05YzZkLWI4NDMyMzgwMDM1OCIsImRhbmEiOnsiaWR1c2VyIjoiODMiLCJpZGNvbXBhbnkiOiJ2ZW50dXJlc3RhcnMiLCJpZGNsaWVudGUiOiIxIiwidXNlciI6ImdhdGV3YXkifX0.Z__gtTdWlWUcd3sMse-tq70FZwlq_ODxbuEk7ygLNAolezPFEt0LQLO7cabYUMFP6dd6nh5W8DiYL8umDQLqhZ6FtZIjwMHcr6kEi0nvFU3ZzJN7eAMBgxKXp_CfNLFiuW1fCqB1sFjzfU7d__lHhsllb6_W6l4-NEn3TYMtDc2S7Fq3CK2tRMZ96llEkDCJgvhqHDPjbMo3DIzG8PIETd006tbJDirriyetbXOd1SrNmcDsURvVzXoVC6RFwQOaazD9gp3IQHPVLv7IvsvUsHxxujTScV3OFnG3XPBWfqw7dpOld3w5fk5laFzvU1l-gDmOmU0gOzrw6mwhugLKuQ";

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
