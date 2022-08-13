import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { formatAmountInCurrency } from './../../utils/formatAmountInCurrency';

  describe('Component ResultBox', () => {
    it('should render without crashing', () => {
      render(<ResultBox from="PLN" to="USD" amount={100} />);
    });

    const testCasesMoreThanZero = [123, 333, 525, 100]
    const testCasesLessThanZero = [-100, -50, -222, -142]
    const testCasesInvalid = ['9', undefined]

    it('should return proper output value for PLN to USD conversion', () => {
      for(const testAmount of testCasesMoreThanZero){
        render(<ResultBox from="PLN" to="USD" amount={testAmount} />);
        const resultField = screen.getByTestId('result');
        expect(resultField).toHaveTextContent(`${formatAmountInCurrency(testAmount, 'PLN')} = ${formatAmountInCurrency(testAmount/3.5, 'USD')}`)
        cleanup()
      }
    })

    it('should return proper output value for USD to PLN conversion', () => {
      for(const testAmount of testCasesMoreThanZero){
        render(<ResultBox from="USD" to="PLN" amount={testAmount} />);
        const resultField = screen.getByTestId('result');
        expect(resultField).toHaveTextContent(`${formatAmountInCurrency(testAmount, 'USD')} = ${formatAmountInCurrency(testAmount*3.5, 'PLN')}`)
        cleanup()
      }
    })

    it('should return proper output value for USD to USD conversion', () => {
      for(const testAmount of testCasesMoreThanZero){
        render(<ResultBox from="USD" to="USD" amount={testAmount} />);
        const resultField = screen.getByTestId('result');
        expect(resultField).toHaveTextContent(`${formatAmountInCurrency(testAmount, 'USD')} = ${formatAmountInCurrency(testAmount, 'USD')}`)
        cleanup()
      }
    })

    it('should return proper output value for PLN to PLN conversion', () => {
      for(const testAmount of testCasesMoreThanZero){
        render(<ResultBox from="PLN" to="PLN" amount={testAmount} />);
        const resultField = screen.getByTestId('result');
        expect(resultField).toHaveTextContent(`${formatAmountInCurrency(testAmount, 'PLN')} = ${formatAmountInCurrency(testAmount, 'PLN')}`)
        cleanup()
      }
    })

    it('should return proper info if value is less than zero', () => {
      for(const testAmount of testCasesLessThanZero){
        render(<ResultBox from="USD" to="PLN" amount={testAmount} />);
        const resultField = screen.getByTestId('result');
        expect(resultField).toHaveTextContent('Wrong value')
        cleanup()
      }
    })

    it('should return "enter proper value" if value is invalid', () => {
      for(const testAmount of testCasesInvalid){
        render(<ResultBox from="USD" to="PLN" amount={testAmount} />);
        const resultField = screen.getByTestId('result');
        expect(resultField).toHaveTextContent('Wrong value')
        cleanup()
      }
    })
  });
