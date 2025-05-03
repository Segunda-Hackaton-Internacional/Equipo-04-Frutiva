// dto/ProductoDTO.java
package com.frutiva.backend.dtos.producto;

import java.time.LocalDate;

import com.frutiva.backend.dtos.usuario.UsuarioAuxDTO;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoDTO {

    private Long id;
    @NotBlank
    private String sku;
    @NotBlank
    private String nombre;
    private String marca;
    private String modelo;
    private String categoria;
    @NotNull
    private UsuarioAuxDTO vendedor;
    @Min(0)
    private Long stock;
    private String descripcion;
    @PositiveOrZero
    private double pesoNeto;
    @PositiveOrZero
    private double pesoBruto;
    @PositiveOrZero
    private double largo;
    @PositiveOrZero
    private double ancho;
    @PositiveOrZero
    private double alto;
    private String color;
    private String material;
    private LocalDate fechaFabricacion;
    private LocalDate fechaCaducidad;
    private String origen;
    private String proveedor;
    @Min(0)
    private Integer garantia;
    @PositiveOrZero
    private double precioUnitario;
    @Min(0)
    private int cantidadMinima;
    @PositiveOrZero
    private double precioPorMayor;
    @Min(1)
    private Integer unidadesPorPaquete;
    private String tipoEmpaque;
    private String numeroLote;
    @Min(0)
    @Max(100)
    private Integer descuentoPorcentaje;
}
