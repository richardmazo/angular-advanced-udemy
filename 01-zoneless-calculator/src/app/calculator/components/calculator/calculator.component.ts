import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButton } from '../calculator-button/calculator-button';
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButton],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calculator.component.css'],
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
  },
})
export class CalculatorComponent {
  private calculatorService = inject(CalculatorService);
  public calculatorButtons = viewChildren(CalculatorButton);

  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  /*get resultText() {
    return this.calculatorService.resultText;
  }*/

  handleClick(key: string) {
    console.log('Clicked key:', key);
    this.calculatorService.constructNumber(key);
  }

  //@HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyEquivalents: Record<string, string> = {
      Enter: '=',
      Escape: 'C',
      Clear: 'C',
      x: 'x',
      '*': 'x',
      '/': '÷',
    };

    const key = event.key;
    const keyValue = keyEquivalents[key] ?? key;

    this.handleClick(keyValue);
    this.calculatorButtons().forEach((button) => button.keyboardPressedStyle(keyValue));
  }
}
