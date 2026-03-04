import { Text, Box } from 'ink';
import { useState } from 'react';
import Menu from "./components/Menu";
import CommandInput from './components/CommandInput';

function App() {

    const [lastCommand, setLastCommand] = useState('');

    return <Box flexDirection="column">
        <Text color="green">  gitproblem</Text>
        <Menu />
        <CommandInput onSubmit={(command) => setLastCommand(command)} />
        {lastCommand && <Text>Ejecutaste: {lastCommand}</Text>}
    </Box>
}

export default App