import React, { useRef, useState, useEffect } from 'react';
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
    const canvasContainerRef = useRef<HTMLDivElement>(null);
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
            onComplete();
        }
    };

    useEffect(() => {
        const canvas = sigCanvas.current.getCanvas();
        const container = canvasContainerRef.current;

        const resizeCanvas = () => {
            if (container && canvas) {
                const width = container.offsetWidth;
                const height = 200;
                canvas.width = width;
                canvas.height = height;
                sigCanvas.current.clear();
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

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

            <div ref={canvasContainerRef} style={{ width: '100%', overflow: 'hidden' }}>
                <SignatureCanvas
                    penColor="black"
                    canvasProps={{
                        style: {
                            width: '100%',
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
