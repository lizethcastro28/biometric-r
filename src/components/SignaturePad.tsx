import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button, Heading, Flex, Message } from '@aws-amplify/ui-react';
import { trimCanvas } from '../utils/trimCanvas';

interface SignaturePadProps {
    Messages: any;
    onComplete: () => void;
}

interface SignatureCanvasExtended extends SignatureCanvas {
    getTrimmedCanvas: () => HTMLCanvasElement;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ Messages, onComplete }) => {
    const sigCanvas = useRef<SignatureCanvasExtended>(null!);
    const [trimmedDataURL, setTrimmedDataURL] = useState<string | null>(null);
    const [message, setMessage] = useState<string>(Messages.signaturePadPage.description);
    const [messageType, setMessageType] = useState<'info' | 'error'>('info');

    const clear = (): void => {
        sigCanvas.current.clear();
        setTrimmedDataURL(null);
        setMessage(Messages.signaturePadPage.description);
        setMessageType('info');
    };

    const save = (): void => {
        if (sigCanvas.current?.isEmpty()) {
            setMessage(Messages.signaturePadPage.messages.error);
            setMessageType('error');
            return;
        }

        const trimmedCanvas = trimCanvas(sigCanvas.current.getCanvas());
        const trimmed = trimmedCanvas.toDataURL('image/png');

        if (trimmed) {
            setTrimmedDataURL(trimmed);
            console.log('Trimmed Data URL:', trimmedDataURL);
            setMessage(Messages.signaturePadPage.messages.success);
            setMessageType('info');
            // downloadSignature(trimmed);
            onComplete();
        }
    };

    /* 
    const downloadSignature = (base64: string): void => {
        const link = document.createElement('a');
        link.href = base64;
        link.download = `firma-${new Date().toISOString()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    */

    return (
        <Flex direction="column" gap="large" width="100%" maxWidth="800px" margin="auto">
            <Heading level={2} textAlign="center" marginBottom="1rem">
                {Messages.signaturePadPage.title}
            </Heading>

            <Message
                colorTheme={messageType}
                heading={message}
                variation="filled"
                width="100%"
                textAlign="center"
                wrap="wrap"
            />

            <div style={{ width: '100%', overflow: 'hidden' }}>
                <SignatureCanvas
                    penColor="black"
                    canvasProps={{
                        width: 800, // Ajuste de ancho razonable
                        height: 200,
                        style: {
                            width: '100%', // Se adapta al contenedor
                            height: '200px',
                            border: '2px dashed #cbd5e0',
                            borderRadius: '12px',
                            backgroundColor: '#fff',
                        },
                    }}
                    ref={sigCanvas}
                />
            </div>

            <Flex direction="row" gap="1rem" marginTop="1rem" justifyContent="center">
                <Button variation="destructive" onClick={clear}>
                    {Messages.signaturePadPage.buttons.clear}
                </Button>
                <Button backgroundColor={Messages.buttonColor} variation="primary" onClick={save}>
                    {Messages.signaturePadPage.buttons.accept}
                </Button>
            </Flex>
        </Flex>
    );
};

export default SignaturePad;
