import { useState } from 'react';

import type {
    NotifinColorScheme,
    NotifinMotionPreset,
} from '../src/core/types';
import { Notifin, notifin } from '../src/index';

const motionOptions: NotifinMotionPreset[] = [
    'subtle',
    'slide',
    'scale',
    'bounce',
    'none',
];

export function App() {
    const [colorScheme, setColorScheme] =
        useState<NotifinColorScheme>('system');
    const [motion, setMotion] = useState<NotifinMotionPreset>('subtle');

    return (
        <div style={{ padding: 24 }}>
            <h1>notifin playground</h1>

            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <label>
                    Color scheme:{' '}
                    <select
                        onChange={(event) =>
                            setColorScheme(
                                event.target.value as NotifinColorScheme
                            )
                        }
                        value={colorScheme}
                    >
                        <option value="system">system</option>
                        <option value="light">light</option>
                        <option value="dark">dark</option>
                    </select>
                </label>

                <label>
                    Motion:{' '}
                    <select
                        onChange={(event) =>
                            setMotion(event.target.value as NotifinMotionPreset)
                        }
                        value={motion}
                    >
                        {motionOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <button onClick={() => notifin('Plain notice')}>Default</button>
                <button
                    onClick={() =>
                        notifin.success('Saved draft', {
                            description: 'All changes saved successfully.',
                        })
                    }
                >
                    Success
                </button>
                <button
                    onClick={() =>
                        notifin.error('Upload failed', {
                            description: 'Please retry in a few seconds.',
                        })
                    }
                >
                    Error
                </button>
                <button
                    onClick={() =>
                        notifin.info('Heads up', {
                            description: 'Some informational text here.',
                        })
                    }
                >
                    Info
                </button>
                <button onClick={() => notifin.warning('Low storage')}>
                    Warning
                </button>
                <button
                    onClick={() =>
                        notifin('Auto-dismiss in 4s', {
                            description: 'Watch the progress bar.',
                            duration: 4000,
                        })
                    }
                >
                    Duration 4s
                </button>
                <button onClick={() => notifin.loading('Uploading file...')}>
                    Loading
                </button>
                <button
                    onClick={() =>
                        notifin('Delete item?', {
                            action: { label: 'Delete' },
                            cancel: { label: 'Cancel' },
                            description: 'This action cannot be undone.',
                        })
                    }
                >
                    With actions
                </button>
                <button
                    onClick={() => {
                        notifin('Queued 1');
                        notifin('Queued 2');
                        notifin('Queued 3');
                    }}
                >
                    Queue 3
                </button>
                <button
                    onClick={() =>
                        notifin(
                            'Very long title that should wrap across multiple lines to test layout behavior',
                            {
                                description:
                                    'And here is a fairly long description as well, to see how the dialog handles larger amounts of text content without breaking the layout or looking awkward.',
                            }
                        )
                    }
                >
                    Long content
                </button>
                <button
                    onClick={() =>
                        notifin.promise(
                            new Promise((resolve) => setTimeout(resolve, 1500)),
                            {
                                error: 'Something went wrong',
                                loading: 'Processing...',
                                success: 'Done!',
                            }
                        )
                    }
                >
                    Promise flow
                </button>
            </div>

            <Notifin colorScheme={colorScheme} motion={motion} />
        </div>
    );
}
