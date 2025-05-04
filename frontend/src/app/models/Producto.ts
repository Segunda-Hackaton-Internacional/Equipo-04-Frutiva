import { Usuario } from "./Usuario";

export class Producto {
    constructor(
      public id?: number | null,
      public sku?: string | null,
      public nombre?: string | null,
      public marca?: string | null,
      public modelo?: string | null,
      public categoria?: string | null,
      public vendedor?: Usuario | null,
      public stock?: number | null,
      public descripcion?: string | null,
      public pesoNeto?: number | null,
      public pesoBruto?: number | null,
      public largo?: number | null,
      public ancho?: number | null,
      public alto?: number | null,
      public color?: string | null,
      public material?: string | null,
      public fechaFabricacion?: Date | null, 
      public fechaCaducidad?: Date | null,
      public origen?: string | null,
      public proveedor?: string | null,
      public garantia?: number | null,
      public precioUnitario?: number | null,
      public cantidadMinima?: number | null,
      public precioPorMayor?: number | null,
      public unidadesPorPaquete?: number | null,
      public tipoEmpaque?: string | null,
      public numeroLote?: string | null,
      public descuentoPorcentaje?: number | null
    ) {}
  }
  