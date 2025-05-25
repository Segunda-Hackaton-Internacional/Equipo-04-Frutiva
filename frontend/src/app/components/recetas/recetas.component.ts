import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Usuario {
  nombre: string;
  avatar: string;
  verificado: boolean;
}

interface Receta {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  ingredientes: string[];
  pasos: string[];
  tiempoPrep: number;
  porciones: number;
  dificultad: 'Fácil' | 'Intermedio' | 'Difícil';
  sabor: string;
  usuario: Usuario;
  likes: number;
  comentarios: number;
  fechaPublicacion: Date;
}

interface Opinion {
  id: number;
  usuario: Usuario;
  sabor: string;
  calificacion: number;
  comentario: string;
  fecha: Date;
  likes: number;
  imagenes?: string[];
}

@Component({
  selector: 'app-recetas',
  imports: [CommonModule],
  templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.css'
})
export class RecetasComponent {
  saboresDisponibles = [
    { nombre: 'Pitahaya', color: '#ff6b9d', emoji: '🐲' },
    { nombre: 'Granadilla', color: '#ff8c42', emoji: '🟠' },
    { nombre: 'Gulupa', color: '#6a1b9a', emoji: '🍇' },
    { nombre: 'Maracuyá', color: '#ffb74d', emoji: '🟡' },
    { nombre: 'Mango', color: '#ffc107', emoji: '🥭' },
    { nombre: 'Uchuva', color: '#ff9800', emoji: '🧡' }
  ];

  recetas: Receta[] = [
    {
      id: 1,
      titulo: 'Tarta de Uchuva con Chocolate Blanco',
      descripcion: 'Una deliciosa tarta que combina la acidez de la uchuva con la suavidad del chocolate blanco',
      imagen: 'assets/uchuva-fruta.jpg',
      ingredientes: [
        '200g de mermelada de uchuva',
        '300g de chocolate blanco',
        '200ml de crema de leche',
        'Base de galleta maría',
        'Uchuvas frescas para decorar'
      ],
      pasos: [
        'Derrite el chocolate blanco con la crema de leche',
        'Mezcla con la mermelada de uchuva',
        'Vierte sobre la base de galleta',
        'Refrigera por 4 horas',
        'Decora con uchuvas frescas'
      ],
      tiempoPrep: 30,
      porciones: 8,
      dificultad: 'Intermedio',
      sabor: 'Uchuva',
      usuario: {
        nombre: 'María González',
        avatar: '👩‍🍳',
        verificado: true
      },
      likes: 127,
      comentarios: 23,
      fechaPublicacion: new Date('2024-03-15')
    },
    {
      id: 2,
      titulo: 'Smoothie Bowl de Pitahaya',
      descripcion: 'Un desayuno saludable y colorido con nuestra mermelada de pitahaya',
      imagen: 'assets/pitahaya-fruta.jpg',
      ingredientes: [
        '150g de mermelada de pitahaya',
        '1 plátano congelado',
        '200ml de leche de coco',
        'Granola casera',
        'Coco rallado'
      ],
      pasos: [
        'Licúa el plátano con leche de coco',
        'Añade la mermelada de pitahaya',
        'Sirve en un bowl',
        'Decora con granola y coco',
        'Disfruta inmediatamente'
      ],
      tiempoPrep: 10,
      porciones: 2,
      dificultad: 'Fácil',
      sabor: 'Pitahaya',
      usuario: {
        nombre: 'Carlos Medina',
        avatar: '👨‍🍳',
        verificado: false
      },
      likes: 89,
      comentarios: 15,
      fechaPublicacion: new Date('2024-03-10')
    },
    {
      id: 3,
      titulo: 'Cheesecake de Maracuyá sin Horno',
      descripcion: 'Un postre cremoso y refrescante perfecto para cualquier ocasión',
      imagen: 'assets/maracuya-fruta.jpg',
      ingredientes: [
        '250g de mermelada de maracuyá',
        '500g de queso crema',
        '200ml de crema de leche batida',
        'Base de galletas digestivas',
        'Gelatina sin sabor'
      ],
      pasos: [
        'Prepara la base con galletas trituradas',
        'Mezcla el queso crema con la mermelada',
        'Incorpora la crema batida',
        'Añade la gelatina hidratada',
        'Refrigera toda la noche'
      ],
      tiempoPrep: 45,
      porciones: 10,
      dificultad: 'Intermedio',
      sabor: 'Maracuyá',
      usuario: {
        nombre: 'Ana Jiménez',
        avatar: '👩‍🍳',
        verificado: true
      },
      likes: 156,
      comentarios: 31,
      fechaPublicacion: new Date('2024-03-08')
    }
  ];

  opiniones: Opinion[] = [
    {
      id: 1,
      usuario: {
        nombre: 'Pedro Ramírez',
        avatar: '👨',
        verificado: false
      },
      sabor: 'Gulupa',
      calificacion: 5,
      comentario: '¡Increíble! La mermelada de gulupa tiene un sabor único y auténtico. La textura es perfecta y se nota la calidad de la fruta. Definitivamente volveré a comprar.',
      fecha: new Date('2024-03-20'),
      likes: 12,
      imagenes: ['assets/gulupa-fruta.jpg']
    },
    {
      id: 2,
      usuario: {
        nombre: 'Laura Sánchez',
        avatar: '👩',
        verificado: true
      },
      sabor: 'Mango',
      calificacion: 5,
      comentario: 'La mermelada de mango es espectacular. Tiene trozos de fruta real y el dulce está en su punto justo. Perfecta para desayunos y postres.',
      fecha: new Date('2024-03-18'),
      likes: 8
    },
    {
      id: 3,
      usuario: {
        nombre: 'Diego Torres',
        avatar: '👨',
        verificado: false
      },
      sabor: 'Granadilla',
      calificacion: 4,
      comentario: 'Muy buena calidad, aunque me gustaría que tuviera un poco más de pulpa. El sabor es auténtico y natural.',
      fecha: new Date('2024-03-16'),
      likes: 5
    },
    {
      id: 4,
      usuario: {
        nombre: 'Carmen López',
        avatar: '👩',
        verificado: true
      },
      sabor: 'Uchuva',
      calificacion: 5,
      comentario: 'La uchuva es mi favorita. Tiene ese toque ácido perfecto que equilibra muy bien la dulzura. Ideal para acompañar quesos.',
      fecha: new Date('2024-03-14'),
      likes: 15
    }
  ];

  filtroActivo = 'todos';
  recetasFiltradas = this.recetas;
  opinionesFiltradas = this.opiniones;

  filtrarPorSabor(sabor: string) {
    this.filtroActivo = sabor;
    if (sabor === 'todos') {
      this.recetasFiltradas = this.recetas;
      this.opinionesFiltradas = this.opiniones;
    } else {
      this.recetasFiltradas = this.recetas.filter(r => r.sabor === sabor);
      this.opinionesFiltradas = this.opiniones.filter(o => o.sabor === sabor);
    }
  }

  darLike(tipo: 'receta' | 'opinion', id: number) {
    if (tipo === 'receta') {
      const receta = this.recetas.find(r => r.id === id);
      if (receta) receta.likes++;
    } else {
      const opinion = this.opiniones.find(o => o.id === id);
      if (opinion) opinion.likes++;
    }
  }

  obtenerColorSabor(sabor: string): string {
    const saborObj = this.saboresDisponibles.find(s => s.nombre === sabor);
    return saborObj ? saborObj.color : '#e65a79';
  }

  obtenerEmojiSabor(sabor: string): string {
    const saborObj = this.saboresDisponibles.find(s => s.nombre === sabor);
    return saborObj ? saborObj.emoji : '🍯';
  }

  generarEstrellas(calificacion: number): string[] {
    return Array(5).fill('').map((_, i) => i < calificacion ? '★' : '☆');
  }

  formatearFecha(fecha: Date): string {
    const ahora = new Date();
    const diff = ahora.getTime() - fecha.getTime();
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (dias === 0) return 'Hoy';
    if (dias === 1) return 'Ayer';
    if (dias < 7) return `Hace ${dias} días`;
    return fecha.toLocaleDateString();
  }
}