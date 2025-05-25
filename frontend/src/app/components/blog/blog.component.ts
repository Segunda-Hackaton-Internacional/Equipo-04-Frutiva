import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  
  blogPosts = [
    {
      id: 1,
      title: 'Pitahaya: El Superalimento Sostenible que Apoya a Nuestros Productores Locales',
      excerpt: 'Descubre cómo la pitahaya no solo nutre tu cuerpo, sino también fortalece las comunidades rurales a través de prácticas agrícolas responsables.',
      content: `La pitahaya, conocida como la fruta del dragón, representa mucho más que un superalimento exótico. En nuestro compromiso con la sostenibilidad, trabajamos directamente con productores locales que cultivan esta extraordinaria fruta usando métodos orgánicos y regenerativos.

      **Beneficios Nutricionales:**
      - Rica en antioxidantes y vitamina C
      - Baja en calorías, alta en fibra
      - Propiedades antiinflamatorias naturales
      
      **Impacto Social:**
      Cada frasco de mermelada de pitahaya apoya a familias campesinas que han perfeccionado técnicas de cultivo sostenible durante generaciones. Nuestro modelo de comercio justo garantiza precios estables y relaciones a largo plazo.
      
      **Sostenibilidad Ambiental:**
      Los cultivos de pitahaya requieren menos agua que otras frutas tropicales y ayudan a prevenir la erosión del suelo en terrenos montañosos. Además, su cultivo biodiverso proporciona hábitat para especies nativas.`,
      author: 'Equipo Sostenible',
      date: '2024-05-20',
      category: 'Superalimentos',
      image: 'pitahaya-fruta.jpg',
      readTime: '5 min',
      color: '#e65a79'
    },
    {
      id: 2,
      title: 'Consumo Consciente: Cómo Elegir Productos que Transforman Comunidades',
      excerpt: 'Aprende a identificar productos verdaderamente sostenibles y descubre el poder de tus decisiones de compra para generar impacto positivo.',
      content: `El consumo consciente va más allá de leer etiquetas: es una filosofía que transforma vidas. Cuando eliges nuestras mermeladas de granadilla, gulupa o maracuyá, estás participando en una cadena de valor que prioriza el bienestar humano y ambiental.

      **Principios del Consumo Consciente:**
      
      **1. Origen Transparente:** Conoce de dónde vienen tus alimentos. Nuestras frutas provienen de fincas familiares en los Andes colombianos, donde cada productor tiene nombre y historia.
      
      **2. Procesos Artesanales:** Nuestras mermeladas se elaboran en pequeños lotes, preservando los sabores naturales y evitando aditivos artificiales.
      
      **3. Impacto Medible:** Cada compra contribuye a:
      - Educación de niños rurales
      - Mejoramiento de infraestructura comunitaria
      - Conservación de semillas nativas
      
      **Cómo Identificar Productos Sostenibles:**
      - Certificaciones ambientales verificables
      - Historias reales de productores
      - Transparencia en precios y márgenes
      - Compromiso con la comunidad local`,
      author: 'María Rodríguez',
      date: '2024-05-18',
      category: 'Consumo Consciente',
      image: 'maracuya-fruta.jpg',
      readTime: '7 min',
      color: '#8cc8a1'
    },
    {
      id: 3,
      title: 'La Magia de la Uchuva: Tradición Ancestral y Innovación Sostenible',
      excerpt: 'Explora cómo esta pequeña fruta dorada conecta saberes ancestrales con técnicas modernas de conservación y comercialización responsable.',
      content: `La uchuva, conocida ancestralmente como "capulí" por nuestros pueblos originarios, es un tesoro que hemos redescubierto y valorado en su justa dimensión. Esta pequeña fruta dorada encapsula siglos de sabiduría agrícola y representa la perfecta armonía entre tradición e innovación.

      **Historia y Tradición:**
      Los muiscas ya cultivaban uchuva hace más de 3000 años, reconociendo sus propiedades medicinales y nutricionales. Hoy, honramos este legado trabajando con comunidades que mantienen vivos estos conocimientos.
      
      **Innovación Sostenible:**
      - **Técnicas de cultivo regenerativo** que mejoran la salud del suelo
      - **Sistemas de riego eficiente** que conservan recursos hídricos
      - **Procesamiento solar** para reducir huella de carbono
      
      **Propiedades Excepcionales:**
      - Alto contenido de vitaminas A y C
      - Propiedades antiinflamatorias comprobadas
      - Antioxidantes únicos que protegen la salud cardiovascular
      
      **Nuestro Compromiso:**
      Cada frasco de mermelada de uchuva mantiene el 87% de sus propiedades nutricionales originales gracias a nuestros procesos de cocción a baja temperatura. Además, destinamos el 15% de nuestras ganancias a programas de recuperación de semillas nativas.`,
      author: 'Carlos Mendoza',
      date: '2024-05-15',
      category: 'Tradición e Innovación',
      image: 'uchuva-fruta.jpg',
      readTime: '6 min',
      color: '#f7b32b'
    },
    {
      id: 4,
      title: 'Mango y Sostenibilidad: Rescatando Variedades Criollas para el Futuro',
      excerpt: 'Conoce nuestro proyecto de conservación de mangos criollos y cómo cada mermelada contribuye a preservar la biodiversidad colombiana.',
      content: `Colombia es hogar de más de 40 variedades de mango, muchas de ellas criollas y en riesgo de desaparecer. Nuestro proyecto de mermeladas de mango va más allá del sabor: es una misión de conservación de biodiversidad.

      **El Problema:**
      La agricultura industrial ha favorecido pocas variedades comerciales, amenazando la riqueza genética de nuestros mangos ancestrales. Variedades como el mango de azúcar, hilacha y corazón están desapareciendo silenciosamente.
      
      **Nuestra Solución:**
      
      **Banco de Germoplasma:** Colaboramos con agricultores para mantener jardines madre con variedades criollas, preservando material genético único.
      
      **Comercialización Justa:** Ofrecemos precios premium por mangos criollos, incentivando su cultivo frente a variedades comerciales.
      
      **Educación Comunitaria:** Capacitamos a nuevas generaciones en técnicas de injerto y conservación de semillas.
      
      **Beneficios Únicos de Variedades Criollas:**
      - Mayor resistencia a plagas y enfermedades
      - Adaptación perfecta al clima local
      - Sabores complejos imposibles de replicar
      - Menor necesidad de insumos externos
      
      **Tu Impacto:**
      Al elegir nuestra mermelada de mango, participas activamente en:
      - Conservación de 12 variedades criollas
      - Apoyo a 35 familias productoras
      - Restauración de 50 hectáreas de ecosistemas frutales`,
      author: 'Ana Patricia Lozano',
      date: '2024-05-12',
      category: 'Biodiversidad',
      image: 'mango-fruta.jpg',
      readTime: '8 min',
      color: '#ff9a56'
    },
    {
      id: 5,
      title: 'Granadilla: El Dulce Secreto de los Andes Colombianos',
      excerpt: 'Descubre los beneficios únicos de la granadilla y cómo su cultivo tradicional sostiene familias en las montañas de Colombia.',
      content: `La granadilla, joya de los Andes colombianos, combina un sabor dulce incomparable con propiedades nutricionales excepcionales. Esta fruta de la pasión ha sido cultivada por generaciones en las laderas montañosas, donde las condiciones climáticas perfectas le otorgan su característico aroma y dulzura.

      **Perfil Nutricional Único:**
      - Alta concentración de vitaminas A y C
      - Minerales esenciales como potasio y fósforo
      - Antioxidantes naturales que protegen contra el envejecimiento
      - Fibra dietética que mejora la digestión
      
      **Tradición de Cultivo:**
      En las montañas de Cundinamarca y Boyacá, familias enteras se dedican al cultivo artesanal de granadilla. Cada planta requiere cuidado personal, desde la siembra hasta la cosecha, manteniendo técnicas transmitidas de abuelos a nietos.
      
      **Sostenibilidad en Acción:**
      - Cultivo sin pesticidas químicos
      - Conservación de variedades locales
      - Apoyo a la economía campesina
      - Protección de ecosistemas de montaña`,
      author: 'Elena Vargas',
      date: '2024-05-10',
      category: 'Tradición e Innovación',
      image: 'granadilla-fruta.jpg',
      readTime: '5 min',
      color: '#9b59b6'
    },
    {
      id: 6,
      title: 'Gulupa: La Fruta de la Pasión que Revoluciona la Nutrición',
      excerpt: 'Conoce la gulupa, prima de la maracuyá, y su extraordinario contenido nutricional que la convierte en un verdadero superalimento.',
      content: `La gulupa, también conocida como maracuyá morado, es una de las frutas más nutritivas de Colombia. Con su característico color púrpura y sabor agridulce intenso, esta fruta ha conquistado paladares exigentes mientras ofrece beneficios nutricionales incomparables.

      **Superalimento Natural:**
      - Altísimo contenido de vitamina C (más que la naranja)
      - Compuestos bioactivos únicos
      - Propiedades relajantes naturales
      - Antioxidantes poderosos contra radicales libres
      
      **Proceso de Cultivo Especial:**
      La gulupa requiere condiciones climáticas muy específicas. Solo en ciertas regiones de Colombia, entre 1.800 y 2.200 metros sobre el nivel del mar, puede desarrollar su perfil de sabor característico.
      
      **Innovación en Procesamiento:**
      Nuestra técnica de extracción en frío preserva el 95% de los nutrientes originales, manteniendo intactas las propiedades que hacen de la gulupa un verdadero tesoro nutricional.
      
      **Impacto Comunitario:**
      Trabajamos con 25 familias cultivadoras que han encontrado en la gulupa una alternativa sostenible y rentable para sus fincas, mejorando significativamente su calidad de vida.`,
      author: 'Dr. Ricardo Molina',
      date: '2024-05-08',
      category: 'Superalimentos',
      image: 'gulupa-fruta.jpg',
      readTime: '6 min',
      color: '#7b68ee'
    }
  ];

  categories = [
    { name: 'Todas', icon: '🌟', color: '#e65a79' },
    { name: 'Superalimentos', icon: '💪', color: '#e65a79' }, 
    { name: 'Consumo Consciente', icon: '🌱', color: '#8cc8a1' }, 
    { name: 'Tradición e Innovación', icon: '🏛️', color: '#f7b32b' },
    { name: 'Biodiversidad', icon: '🌿', color: '#ff9a56' }
  ];

  selectedCategory = 'Todas';
  selectedPost: any = null;

  get filteredPosts() {
    if (this.selectedCategory === 'Todas') {
      return this.blogPosts;
    }
    return this.blogPosts.filter(post => post.category === this.selectedCategory);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.selectedPost = null;
  }

  selectPost(post: any) {
    this.selectedPost = post;
  }

  goBack() {
    this.selectedPost = null;
  }

  formatContent(content: string): string {
    return content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                 .replace(/\n\n/g, '</p><p>')
                 .replace(/\n/g, '<br>');
  }

  getCategoryData(categoryName: string) {
    return this.categories.find(cat => cat.name === categoryName) || this.categories[0];
  }
}