import {IconCheck, IconCopy} from '@tabler/icons-react';
import {Button, Tooltip} from '@mantine/core';
import {useClipboard} from '@mantine/hooks';
import React from 'react';

type CopyButtonProps = {
    shortenedValue: string,
    className?: string
}

const CopyButton: React.FC<CopyButtonProps> = ({shortenedValue, className}) => {
    const clipboard = useClipboard();
    return (
        <Tooltip
            label="Link copied!"
            offset={5}
            position="bottom"
            radius="xl"
            transitionProps={{duration: 100, transition: 'slide-down'}}
            opened={clipboard.copied}
        >
            <Button
                variant="light"
                rightSection={
                    clipboard.copied ? (
                        <IconCheck size={20} stroke={1.5}/>
                    ) : (
                        <IconCopy size={20} stroke={1.5}/>
                    )
                }
                radius="xl"
                size="md"
                pr={14}
                h={48}
                styles={{section: {marginLeft: 22}}}
                onClick={() => clipboard.copy(shortenedValue)}
                className={className}
            >
                Copy link
            </Button>
        </Tooltip>
    );
}

export default CopyButton