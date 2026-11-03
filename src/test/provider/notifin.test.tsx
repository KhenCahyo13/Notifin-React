import {
    act,
    cleanup,
    fireEvent,
    render,
    screen,
} from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
    cleanup();
    vi.useRealTimers();
});

async function loadModules() {
    vi.resetModules();

    const [{ notifin }, { notifinStore }, { Notifin }] = await Promise.all([
        import('../../core/notifin'),
        import('../../core/store'),
        import('../../provider/notifin'),
    ]);

    return {
        notifin,
        Notifin,
        notifinStore,
    };
}

describe('<Notifin />', () => {
    it('renders nothing when there is no active notification', async () => {
        const { Notifin, notifinStore } = await loadModules();
        const unregisterHost = notifinStore.registerHost();
        render(<Notifin />);

        expect(screen.queryByRole('alertdialog')).toBeNull();
        unregisterHost();
    });

    it('shows the active notification with its title and description', async () => {
        const { Notifin, notifin, notifinStore } = await loadModules();
        const unregisterHost = notifinStore.registerHost();
        render(<Notifin />);

        act(() => {
            notifin.success('Saved draft', { description: 'All set.' });
        });

        expect(screen.getByRole('alertdialog')).not.toBeNull();
        expect(screen.getByText('Saved draft')).not.toBeNull();
        expect(screen.getByText('All set.')).not.toBeNull();
        unregisterHost();
    });

    it('shows a default OK button and dismisses on click', async () => {
        const { Notifin, notifin, notifinStore } = await loadModules();
        const unregisterHost = notifinStore.registerHost();
        render(<Notifin />);

        act(() => {
            notifin('Plain notice');
        });

        const okButton = screen.getByRole('button', { name: 'OK' });

        act(() => {
            fireEvent.click(okButton);
            vi.useFakeTimers();
            vi.runAllTimers();
            vi.useRealTimers();
        });

        expect(screen.queryByRole('alertdialog')).toBeNull();
        unregisterHost();
    });

    it('runs the action and cancel callbacks before dismissing', async () => {
        const { Notifin, notifin, notifinStore } = await loadModules();
        const unregisterHost = notifinStore.registerHost();
        render(<Notifin />);

        const onAction = vi.fn();
        const onCancel = vi.fn();

        act(() => {
            notifin('Delete file?', {
                action: { label: 'Delete', onClick: onAction },
                cancel: { label: 'Keep', onClick: onCancel },
            });
        });

        fireEvent.click(screen.getByRole('button', { name: 'Keep' }));

        expect(onCancel).toHaveBeenCalledTimes(1);
        expect(onAction).not.toHaveBeenCalled();
        unregisterHost();
    });

    it('shows the pending count once a second notification is queued', async () => {
        const { Notifin, notifin, notifinStore } = await loadModules();
        const unregisterHost = notifinStore.registerHost();
        render(<Notifin />);

        act(() => {
            notifin('First');
            notifin('Second');
        });

        expect(screen.getByText('1 pending')).not.toBeNull();
        unregisterHost();
    });

    it('does not close on Escape by default', async () => {
        const { Notifin, notifin, notifinStore } = await loadModules();
        const unregisterHost = notifinStore.registerHost();
        render(<Notifin />);

        act(() => {
            notifin('Stay put');
        });

        fireEvent.keyDown(screen.getByRole('alertdialog'), {
            key: 'Escape',
        });

        expect(screen.getByRole('alertdialog')).not.toBeNull();
        unregisterHost();
    });

    it('closes on Escape when allowEscapeClose is set', async () => {
        const { Notifin, notifin, notifinStore } = await loadModules();
        const unregisterHost = notifinStore.registerHost();
        render(<Notifin />);

        act(() => {
            notifin('Dismiss me', { allowEscapeClose: true });
        });

        fireEvent.keyDown(screen.getByRole('alertdialog'), {
            key: 'Escape',
        });

        expect(screen.queryByRole('alertdialog')).toBeNull();
        unregisterHost();
    });
});
