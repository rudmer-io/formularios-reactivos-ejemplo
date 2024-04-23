import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideSensitiveInfo',
  standalone: true,
})
export class HideSensitiveInfoPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return ''; // Manejar el caso de valor nulo o indefinido

    let visiblePart = '';
    let maskedPart = '';

    // Identificar el tipo de información sensible (correo electrónico o número de tarjeta de crédito)
    if (value.includes('@')) {
      // Si contiene el carácter "@" es un correo electrónico
      const atIndex = value.indexOf('@');
      const username = value.slice(0, atIndex);
      visiblePart = `${username.charAt(0)}${'*'.repeat(
        username.length - 1
      )}@${value.slice(atIndex + 1)}`;
    } else {
      // De lo contrario, se asume que es un número de tarjeta de crédito
      visiblePart = value.slice(-4);
      maskedPart = this.maskCharacters(value.slice(0, -4));
    }

    return maskedPart + visiblePart;
  }

  private maskCharacters(input: string): string {
    const maskChar = '*';
    return maskChar.repeat(input.length);
  }
}
