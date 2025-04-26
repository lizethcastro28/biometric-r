import Instructions from "../components/Instructions";

export const Messages = {
    title: 'Biometric App',
    icon: '/logo.svg',
    buttonColor: 'green',
    buttonBorderColor: 'green',
    header: {
        url: '/logoexampleblanco_480.png',
        location: 'left',
        bgColor: '#0C6069',
        content: ''
    },
    footerData: {
        "content": `
        <table style="margin: 10px auto; background-color: #0C6069;">
          <tbody>
            <tr>
              <td style="text-align: center;">
                <div style="font-weight: 300; font-size: 10px; color: #585858; font-family: Helvetica, serif;">
                  <div>
                    <a href="https://examplecompany.com" target="_blank" style="font-size: 17px; font-weight: 300; color: #fff; text-decoration: none; font-family: Helvetica, serif;">
                      www.examplecompany.comc
                    </a>
                  </div>
                  <div style="font-size: 11px; color: #fff;">
                    <p style="font-size: 12px; color: #fff;">
                      <a href="https://examplecompany.com/" style="color: #fff; text-decoration: none; font-family: Helvetica, serif;">
                        Políticas de privacidad
                      </a>
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      `,
        "location": "center",
        "bgColor": "#0C6069"
    },
    instructionsPage: {
        title: "Realizaremos una verificación facial para confirmar que estás presente ahora y no se trata de una grabación ¡Es rápido y sencillo!",
        description: "Sigue las Instrucciones para completar la verificación",
        accion : "Continuar",
        instructions: [
            { title: '1. Documento', description: 'Coloca tu documento de identidad frente a la cámara' },
            { title: '2. Prueba de vida', description: 'Coloca tu rostro frente a la cámara' },
            { title: '3. Prueba de vida y firma', description: 'Coloca tu rostro frente a la cámara y espera a que se procese la firma biométrica' },
        ]
    },
};