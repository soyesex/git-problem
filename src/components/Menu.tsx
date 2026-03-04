import { Box, Text, useInput } from "ink";
import { useState } from 'react'

function Menu() {
    const challenges = ['Branch & Merge', 'Rebase', 'Conflicts', 'Stash']

    const [selectedIndex, setSelectedIndex] = useState(0)

    useInput((input, key) => {
        if (key.downArrow && selectedIndex < challenges.length -1) {
            setSelectedIndex(selectedIndex +1)
        }

        if (key.upArrow && selectedIndex > 0) {
            setSelectedIndex(selectedIndex -1)
        }
    })
    return <Box flexDirection="column">  
        {challenges.map((name, index) => (
            <Text key={index} color={index === selectedIndex ? 'blue' : undefined}>{index === selectedIndex ? '> ' : '  '}{name}</Text>
        ))}
    </Box>
}

export default Menu