function TrianguloRectangulo(a, b) {
    this.a = a;
    this.b = b;
}

// Método para calcular la hipotenusa
TrianguloRectangulo.prototype.calcularHipotenusa = function() {
    return Math.sqrt(this.a**2 + this.b**2);
};

// Método para calcular un lado
TrianguloRectangulo.prototype.calcularLado = function(hipotenusa) {
    // Suponiendo que 'a' es el lado desconocido y 'b' es conocido
    return Math.sqrt(hipotenusa**2 - this.b**2);
};

// Método para mostrar resultados
TrianguloRectangulo.prototype.mostrarResultados = function() {
    const hipotenusa = this.calcularHipotenusa();
    document.write(`<p>Dados los lados 'a' = ${this.a} y 'b' = ${this.b}, la hipotenusa 'c' es: ${hipotenusa.toFixed(2)}</p>`);
    
    const ladoCalculado = this.calcularLado(hipotenusa);
    document.write(`<p>Dada la hipotenusa 'c' = ${hipotenusa.toFixed(2)} y el lado 'b' = ${this.b}, el otro lado 'a' es: ${ladoCalculado.toFixed(2)}</p>`);
};

// Crear un objeto y usarlo
const triangulo = new TrianguloRectangulo(3, 4); // Lados 'a' y 'b' conocidos
triangulo.mostrarResultados(); // Calcular la hipotenusa y mostrar resultados

