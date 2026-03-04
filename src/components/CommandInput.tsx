import { useState } from 'react';
import { Box, Text } from "ink";
import TextInput from 'ink-text-input';

interface Props {
    onSubmit: (command: string) => void
};

function CommandInput({ onSubmit }: Props) {
    const [userInput, setUserInput] = useState('');

    return <Box>
        <Text>$ git </Text> 
        <TextInput 
            value={userInput} 
            onChange={setUserInput} 
            onSubmit={onSubmit}
        />
    </Box>
};

export default CommandInput;