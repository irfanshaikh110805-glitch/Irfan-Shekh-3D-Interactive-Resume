# Contributing to Irfan Shaikh Portfolio

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the project
- Show empathy towards other contributors

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment details (OS, browser, Node version)

### Suggesting Enhancements

1. Check if the enhancement has been suggested
2. Create an issue with:
   - Clear description of the enhancement
   - Use cases and benefits
   - Potential implementation approach

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm run lint`)
5. Commit with clear messages (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Setup

```bash
# Clone the repository
git clone https://github.com/irfan-shekh/portfolio.git

# Install dependencies
npm install

# Start development server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build
```

## Coding Standards

### TypeScript
- Use TypeScript for all new files
- Define proper interfaces and types
- Avoid `any` type unless absolutely necessary
- Use meaningful variable and function names

### React
- Use functional components with hooks
- Follow React best practices
- Keep components small and focused
- Use proper prop types

### Styling
- Use Tailwind CSS utility classes
- Follow existing color scheme
- Ensure responsive design (mobile-first)
- Test on multiple screen sizes

### Accessibility
- Include proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers
- Maintain good color contrast
- Support reduced motion preferences

### Performance
- Lazy load images and components
- Minimize bundle size
- Optimize animations
- Use proper React memoization

## Commit Message Guidelines

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example: `feat: add dark mode toggle`

## Testing

Before submitting a PR:

1. Test on multiple browsers (Chrome, Firefox, Safari)
2. Test on mobile devices
3. Run `npm run lint` and fix any issues
4. Run `npm run build` to ensure it builds successfully
5. Test accessibility with keyboard navigation
6. Check console for errors

## Documentation

- Update README.md if adding new features
- Add JSDoc comments for functions
- Update relevant documentation files
- Include code examples where helpful

## Questions?

Feel free to:
- Open an issue for questions
- Email: irfanshaikh110805@gmail.com
- Connect on [LinkedIn](https://www.linkedin.com/in/irfan-shaikh-380461392)

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

Thank you for contributing! 🎉
