import React from 'react';
import {
    Button,
    View,
    Heading,
    Message,
    Flex,
    Collection,
    Card,
    Text,
} from '@aws-amplify/ui-react';

interface AlertComponentProps {
    Messages: any;
    onContinue: () => void;
}

interface Instruction {
    title: string;
    description: string;
}

const Instructions: React.FC<AlertComponentProps> = ({
    Messages,
    onContinue,
}) => {
    return (
        <div>
            <Heading level={3} style={{ textAlign: 'center', marginBottom: '1rem' }}>
                {Messages.instructionsPage.title}
            </Heading>

            <Flex
                direction="column"
                gap="large"
                width="100%"
                maxWidth="800px"
                margin="auto"
            >
                <Message
                    className="my-message"
                    colorTheme="info"
                    heading={Messages.instructionsPage.description}
                    variation="filled"
                    width="100%"
                    textAlign="center"
                    wrap="wrap"
                />

                <Collection
                    style={{ marginTop: 40 }}
                    type="list"
                    items={Messages.instructionsPage.instructions}
                    direction="row"
                    justifyContent="space-between"
                    wrap="wrap"
                >
                    {(item: Instruction) => (
                        <Card
                            key={item.title}
                            variation="outlined"
                            style={{
                                width: '100%',
                                maxWidth: '250px',
                                flexGrow: 1,
                                margin: '1px',
                            }}
                        >
                            <Heading
                                level={4}
                                style={{ fontSize: '1rem', textAlign: 'center', marginBottom: '0.5rem' }}
                            >
                                {item.title}
                            </Heading>
                            <Text
                                style={{ fontSize: '0.9rem', textAlign: 'center' }}
                            >
                                {item.description}
                            </Text>
                        </Card>
                    )}
                </Collection>

                <View style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <Button variation="primary" onClick={onContinue}>
                        {Messages.instructionsPage.accion}
                    </Button>
                </View>
            </Flex>
        </div>
    );
};

export default Instructions;
