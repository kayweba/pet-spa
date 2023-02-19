import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { render, screen } from '@testing-library/react';

describe('Button', () => {
    test('with only first param', () => {
        render(<Button>TEST</Button>);
        expect(screen.getByText('TEST')).toBeInTheDocument();
    });
    test('with contained "clear" className', () => {
        render(<Button theme={ButtonTheme.CLEAR}>TEST</Button>);
        expect(screen.getByText('TEST')).toHaveClass('clear');
    });
});
