
import React, { useTransition } from 'react';

function TransitionComponent() {
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(() => {
            // non urgent update
            setState(newState);
        });
    };

    return (
        <button onClick={handleClick}>
            {isPending ? 'Loading...' : 'Click me'}
        </button>
    )
}

export default TransitionComponent;