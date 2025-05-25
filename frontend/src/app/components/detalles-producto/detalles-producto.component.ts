import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductoService } from '../../services/producto/producto.service'; 
import { Producto } from '../../models/Producto'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Comentario {
  id: number;
  autor: string;
  fecha: Date;
  calificacion: number;
  texto: string;
  avatar?: string;
}

@Component({
  selector: 'app-detalles-producto',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.css']
})
export class DetallesProductoComponent implements OnInit {
  producto!: Producto;
  mensaje: string = '';
  
  // Propiedades para comentarios
  comentarios: Comentario[] = [
    {
      id: 1,
      autor: "María González",
      fecha: new Date('2024-11-15'),
      calificacion: 5,
      texto: "Excelente calidad de uchuva, llegó muy fresca y con un sabor increíble. Definitivamente volveré a comprar.",
      avatar: "MG"
    },
    {
      id: 2,
      autor: "Carlos Rodríguez",
      fecha: new Date('2024-11-10'),
      calificacion: 4,
      texto: "Muy buen producto, empaque cuidadoso y llegó en perfectas condiciones. El sabor es auténtico costarricense.",
      avatar: "CR"
    },
    {
      id: 3,
      autor: "Ana López",
      fecha: new Date('2024-11-08'),
      calificacion: 5,
      texto: "Me encanta que sea orgánica y certificada. Se nota la diferencia en calidad comparado con otras marcas.",
      avatar: "AL"
    }
  ];
  
  nuevoComentario = {
    autor: '',
    calificacion: 5,
    texto: ''
  };

  // Historia de la uchuva (hardcoded)
  historiaUchuva = {
    titulo: "La Uchuva: Tesoro Dorado de Costa Rica",
    parrafos: [
      "La uchuva, conocida científicamente como Physalis peruviana, encontró en Costa Rica el clima perfecto para desarrollar todo su potencial. Aunque sus orígenes se remontan a los Andes sudamericanos, fue en los valles costarricenses donde esta pequeña fruta dorada comenzó a escribir una historia de éxito que la convertiría en uno de los productos agrícolas más apreciados del país.",
      "En Costa Rica, el cultivo de uchuva comenzó en la década de 1980, cuando agricultores visionarios reconocieron el potencial de esta fruta en el clima tropical de altura. Las condiciones únicas de temperatura, humedad y altitud de regiones como Cartago y San José crearon el ambiente perfecto para que la uchuva desarrollara su característico sabor agridulce y su excepcional valor nutricional.",
      "Hoy en día, Costa Rica es reconocida internacionalmente por producir algunas de las uchuvas de mayor calidad del mundo. Los métodos de cultivo orgánico y sostenible han permitido que este 'oro amarillo' mantenga todas sus propiedades naturales, convirtiéndose en un símbolo de la agricultura responsable costarricense.",
      "La uchuva costarricense no solo es apreciada por su sabor único, sino también por sus propiedades antioxidantes, su alto contenido de vitamina C y sus beneficios para la salud. Cada fruta representa el compromiso de Costa Rica con la excelencia agrícola y el respeto por el medio ambiente."
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.obtenerdetallesproducto(Number(id));
    }
  }

  obtenerdetallesproducto(id: number): void {
    this.productoService.getProductoPorSuId(id).subscribe({
      next: (producto) => {
        this.producto = producto;
      },
      error: (err) => {
        console.error('Error al obtener los detalles del producto', err);
        this.mensaje = `Error al cargar los detalles: ${err.message || err.toString()}`;
      }
    });
  }

  agregarAlCarrito(): void {
    console.log('Agregado al carrito:', this.producto);
    // Aquí puedes agregar la lógica real para agregar al carrito
  }

  descargarCertificado(): void {
    // Simular descarga de certificado
    const link = document.createElement('a');
    link.href = '/assets/certificado-organico.pdf'; // Ruta al certificado
    link.download = 'certificado-organico-uchuva.pdf';
    link.click();
    console.log('Descargando certificado orgánico...');
  }

  agregarComentario(): void {
    if (this.nuevoComentario.autor && this.nuevoComentario.texto) {
      const comentario: Comentario = {
        id: this.comentarios.length + 1,
        autor: this.nuevoComentario.autor,
        fecha: new Date(),
        calificacion: this.nuevoComentario.calificacion,
        texto: this.nuevoComentario.texto,
        avatar: this.nuevoComentario.autor.split(' ').map(n => n[0]).join('').toUpperCase()
      };
      
      this.comentarios.unshift(comentario);
      
      // Limpiar formulario
      this.nuevoComentario = {
        autor: '',
        calificacion: 5,
        texto: ''
      };
    }
  }

  getEstrellas(calificacion: number): string[] {
    const estrellas = [];
    for (let i = 1; i <= 5; i++) {
      estrellas.push(i <= calificacion ? '★' : '☆');
    }
    return estrellas;
  }
  get tieneDescuento(): boolean {
  return !!this.producto?.descuentoPorcentaje && this.producto.descuentoPorcentaje > 0;
}

}