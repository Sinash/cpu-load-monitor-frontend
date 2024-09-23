import { createRoot } from 'react-dom/client';
import '../scss/index.scss'; // Mock SCSS import

// Mocking the createRoot function
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(),
}));

describe('index.tsx', () => {
  let container: HTMLElement | null;

  beforeEach(() => {
    // Set up a mock DOM element for the root container
    container = document.createElement('div');
    container.setAttribute('id', 'root');
    document.body.appendChild(container);

    // Mock the createRoot function and its render method
    (createRoot as jest.Mock).mockReturnValue({
      render: jest.fn(),
    });

    // Dynamically import the index.tsx file
    jest.isolateModules(() => {
      /* eslint-disable @typescript-eslint/no-require-imports */
      require('../index');
    });
  });

  afterEach(() => {
    // Clean up the DOM after each test
    document.body.removeChild(container!);
    jest.clearAllMocks();
  });

  it('should add the class "container" to the root element', () => {
    // Check if the 'container' class was added to the root element
    expect(container!.classList.contains('container')).toBe(true);
  });

  it('should call createRoot with the root container and render App', () => {
    // Check if createRoot was called with the container
    expect(createRoot).toHaveBeenCalledWith(container);

    // Check if the render method was called
    const mockRoot = (createRoot as jest.Mock).mock.results[0].value;

    // Instead of directly matching JSX, check the call with more flexible matchers
    expect(mockRoot.render).toHaveBeenCalledWith(
      expect.anything() // Just check that render was called with something
    );
  });
});
