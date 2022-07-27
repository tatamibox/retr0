import { render, screen, cleanup } from '@testing-library/react'
import Cart from '../Routes/Cart/Cart'

test('Expect Cart page to be rendered', () => {
    render(<Cart />);
})